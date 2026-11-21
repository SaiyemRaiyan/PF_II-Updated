// "Latent Constellation" — the single persistent WebGL scene behind the page.
//
// One particle cloud holds FOUR shapes at once (as vertex attributes) and the
// GPU morphs between them as you scroll:
//   0  neural sphere   (hero)          — a brain-like shell with a glowing core
//   1  double helix    (experience / research)
//   2  layered network (projects / skills) — neural-net layers with edge particles
//   3  torus knot      (education → contact)
// Everything animates in the vertex shader, so the CPU cost per frame is ~zero.
import * as THREE from 'three';

const PALETTE = ['#5ef1ff', '#8b7bff', '#ffb35c'];

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function buildShapes(count) {
  const r = rng(7);
  const sphere = new Float32Array(count * 3);
  const helix = new Float32Array(count * 3);
  const net = new Float32Array(count * 3);
  const knot = new Float32Array(count * 3);
  const rand = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));

  // network layer layout (x positions + radius of each layer)
  const layers = [
    { x: -3.0, r: 0.9, n: 6 }, { x: -1.5, r: 1.7, n: 10 }, { x: 0, r: 2.1, n: 12 },
    { x: 1.5, r: 1.7, n: 10 }, { x: 3.0, r: 0.9, n: 6 },
  ];
  const nodes = layers.map((L) =>
    Array.from({ length: L.n }, (_, k) => {
      const a = (k / L.n) * Math.PI * 2;
      return [L.x, Math.cos(a) * L.r * 0.9, Math.sin(a) * L.r * 0.55];
    }),
  );

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // ── sphere: fibonacci shell + some inner volume
    const y = 1 - (i / (count - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    const inner = r() < 0.18;
    const R = inner ? 0.4 + r() * 1.3 : 2 + (r() - 0.5) * 0.12;
    sphere[i3] = Math.cos(th) * rad * R;
    sphere[i3 + 1] = y * R;
    sphere[i3 + 2] = Math.sin(th) * rad * R;

    // ── helix: two strands + rungs, vertical
    const t = r();
    const ang = t * Math.PI * 7;
    const hy = (t - 0.5) * 6.4;
    const strandR = 1.15;
    if (r() < 0.82) {
      const off = r() < 0.5 ? 0 : Math.PI;
      const j = 0.07;
      helix[i3] = Math.cos(ang + off) * strandR + (r() - 0.5) * j;
      helix[i3 + 1] = hy + (r() - 0.5) * j;
      helix[i3 + 2] = Math.sin(ang + off) * strandR + (r() - 0.5) * j;
    } else {
      const q = Math.round(t * 34) / 34; // rungs sit at discrete heights
      const a2 = q * Math.PI * 7;
      const s = r() * 2 - 1;
      helix[i3] = Math.cos(a2) * strandR * s;
      helix[i3 + 1] = (q - 0.5) * 6.4;
      helix[i3 + 2] = Math.sin(a2) * strandR * s;
    }

    // ── layered network: 55% around nodes, 45% along edges between layers
    if (r() < 0.55) {
      const L = Math.floor(r() * layers.length);
      const nd = nodes[L][Math.floor(r() * nodes[L].length)];
      const g = 0.11 * Math.cbrt(r());
      const u = r() * Math.PI * 2, v = Math.acos(2 * r() - 1);
      net[i3] = nd[0] + g * Math.sin(v) * Math.cos(u);
      net[i3 + 1] = nd[1] + g * Math.sin(v) * Math.sin(u);
      net[i3 + 2] = nd[2] + g * Math.cos(v);
    } else {
      const L = Math.floor(r() * (layers.length - 1));
      const a = nodes[L][Math.floor(r() * nodes[L].length)];
      const b = nodes[L + 1][Math.floor(r() * nodes[L + 1].length)];
      const k = r();
      net[i3] = a[0] + (b[0] - a[0]) * k;
      net[i3 + 1] = a[1] + (b[1] - a[1]) * k;
      net[i3 + 2] = a[2] + (b[2] - a[2]) * k;
    }

    // ── torus knot (p=2, q=3) with a fuzzy tube
    const kt = r() * Math.PI * 2;
    const p = 2, qq = 3;
    const cr = Math.cos(qq * kt) + 2.2;
    const cx = cr * Math.cos(p * kt) * 0.75;
    const cy = cr * Math.sin(p * kt) * 0.75;
    const cz = -Math.sin(qq * kt) * 0.75;
    const tube = 0.28 * Math.sqrt(r());
    const ta = r() * Math.PI * 2;
    knot[i3] = cx + Math.cos(ta) * tube;
    knot[i3 + 1] = cy + Math.sin(ta) * tube;
    knot[i3 + 2] = cz + Math.cos(ta * 1.7) * tube;

    rand[i3] = r();
    rand[i3 + 1] = r();
    rand[i3 + 2] = r();
  }
  return { sphere, helix, net, knot, rand };
}

const vertex = /* glsl */ `
  attribute vec3 aHelix;
  attribute vec3 aNet;
  attribute vec3 aKnot;
  attribute vec3 aRand;
  uniform float uTime;
  uniform float uMorph;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uPointer;
  uniform vec3 uC0;
  uniform vec3 uC1;
  uniform vec3 uC2;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // each particle starts its morph slightly later than the last -> a "wave"
    float m = clamp(uMorph * 1.18 - aRand.y * 0.54, 0.0, 3.0);
    vec3 p = mix(position, aHelix, smoothstep(0.0, 1.0, clamp(m, 0.0, 1.0)));
    p = mix(p, aNet, smoothstep(0.0, 1.0, clamp(m - 1.0, 0.0, 1.0)));
    p = mix(p, aKnot, smoothstep(0.0, 1.0, clamp(m - 2.0, 0.0, 1.0)));

    // gentle living drift
    float ph = aRand.z * 6.2831;
    p += 0.045 * vec3(sin(uTime * 0.7 + ph + p.y * 2.0),
                      cos(uTime * 0.6 + ph + p.x * 2.0),
                      sin(uTime * 0.5 + ph + p.z * 2.0));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // pointer repulsion in view space (uPointer is pre-scaled by tan(fov/2))
    vec2 target = uPointer * -mv.z;
    vec2 d = mv.xy - target;
    float dist = length(d);
    mv.xy += normalize(d + 1e-5) * exp(-dist * dist * 3.0) * 0.45;

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.45 + aRand.x * 0.9) * uPixelRatio / -mv.z;

    vec3 c = aRand.z < 0.55 ? uC0 : (aRand.z < 0.86 ? uC1 : uC2);
    float pulse = pow(0.5 + 0.5 * sin(uTime * 1.6 + aRand.y * 40.0), 10.0);
    vColor = c * (0.75 + pulse * 1.6);
    vAlpha = 0.55 + 0.45 * aRand.x;
  }
`;

const fragment = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a = a * a;
    gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
  }
`;

export function createLatentScene(canvas, opts = {}) {
  const small = window.innerWidth < 760;
  const reduced = opts.reducedMotion;
  const count = small ? 4500 : 11000;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(0, 0, 7.2);

  const { sphere, helix, net, knot, rand } = buildShapes(count);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(sphere, 3));
  geo.setAttribute('aHelix', new THREE.BufferAttribute(helix, 3));
  geo.setAttribute('aNet', new THREE.BufferAttribute(net, 3));
  geo.setAttribute('aKnot', new THREE.BufferAttribute(knot, 3));
  geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 3));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 6);

  const uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uSize: { value: small ? 34 : 30 },
    uPixelRatio: { value: dpr },
    uPointer: { value: new THREE.Vector2(9, 9) },
    uOpacity: { value: 1 },
    uC0: { value: new THREE.Color(PALETTE[0]) },
    uC1: { value: new THREE.Color(PALETTE[1]) },
    uC2: { value: new THREE.Color(PALETTE[2]) },
  };
  const mat = new THREE.ShaderMaterial({
    vertexShader: vertex, fragmentShader: fragment, uniforms,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, mat);

  // wireframe "core" inside the sphere — fades out once we leave the hero
  const core = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.85, 1)),
    new THREE.LineBasicMaterial({ color: PALETTE[0], transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.55, 0.006, 6, 160),
    new THREE.MeshBasicMaterial({ color: PALETTE[1], transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  ring.rotation.x = Math.PI / 2.3;

  const group = new THREE.Group();
  group.add(points, core, ring);
  scene.add(group);

  // ── state (targets are set from outside, current values ease toward them)
  const st = {
    morph: 0, morphT: 0, x: 0, xT: 0, y: 0, yT: 0, op: 1, opT: 1,
    scroll: 0, px: 0, py: 0, pxT: 0, pyT: 0, w: 1, h: 1,
  };

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    st.w = w; st.h = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the whole figure in frame on tall phones
    camera.position.z = w / h < 0.8 ? 10.5 : 7.2;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  function setPointer(nx, ny) {
    st.pxT = nx; st.pyT = ny;
    uniforms.uPointer.value.set(nx * tanHalf * camera.aspect, ny * tanHalf);
  }

  let raf = 0, running = false, last = performance.now(), t = 0;
  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!reduced) t += dt;
    const k = reduced ? 1 : 1 - Math.pow(0.0025, dt); // frame-rate independent easing
    st.morph += (st.morphT - st.morph) * k;
    st.x += (st.xT - st.x) * k;
    st.y += (st.yT - st.y) * k;
    st.op += (st.opT - st.op) * k;
    st.px += (st.pxT - st.px) * k * 0.6;
    st.py += (st.pyT - st.py) * k * 0.6;

    uniforms.uTime.value = t;
    uniforms.uMorph.value = st.morph;
    uniforms.uOpacity.value = st.op;
    const heroness = Math.max(0, 1 - st.morph);
    core.material.opacity = 0.35 * heroness * st.op;
    ring.material.opacity = 0.45 * st.op;
    core.rotation.set(t * 0.25, t * 0.32, 0);
    ring.rotation.z = t * 0.08;

    group.position.set(st.x, st.y, 0);
    group.rotation.y = t * 0.06 + st.scroll * 2.2 + st.px * 0.25;
    group.rotation.x = -st.py * 0.18 + Math.sin(t * 0.2) * 0.05;
    renderer.render(scene, camera);
    if (running) raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }
  const onVis = () => (document.hidden ? stop() : !reduced && start());
  document.addEventListener('visibilitychange', onVis);

  if (reduced) frame(performance.now());
  else start();

  return {
    // shape: 0..3, layout: 'hero' | 'center'
    setState({ shape, layout, scroll }) {
      st.morphT = shape;
      st.scroll = scroll;
      const wide = st.w >= 960;
      if (layout === 'hero') {
        st.xT = wide ? 2.15 : 0;
        st.yT = wide ? 0 : 1.2;
        st.opT = wide ? 1 : 0.75;
      } else {
        st.xT = wide ? 1.4 : 0;
        st.yT = 0;
        st.opT = wide ? 0.55 : 0.4;
      }
      if (reduced) frame(performance.now());
    },
    setPointer,
    dispose() {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      geo.dispose(); mat.dispose(); renderer.dispose();
    },
  };
}

export function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

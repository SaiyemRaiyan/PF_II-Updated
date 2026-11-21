import { useEffect, useRef } from 'react';

// A draggable 3D word-sphere built from plain DOM + CSS transforms (no WebGL).
export default function TagSphere({ words }) {
  const box = useRef(null);
  useEffect(() => {
    const el = box.current;
    const nodes = [...el.querySelectorAll('.ts-w')];
    const n = nodes.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts = nodes.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      return [Math.cos(golden * i) * r, y, Math.sin(golden * i) * r];
    });
    let ax = 0.0016, ay = 0.0032, drag = false, lx = 0, ly = 0, raf, visible = true;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const render = () => {
      const R = el.clientWidth * 0.4;
      const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
      for (let i = 0; i < n; i++) {
        let [x, y, z] = pts[i];
        // rotate around X then Y
        const y1 = y * cx - z * sx; const z1 = y * sx + z * cx;
        const x2 = x * cy + z1 * sy; const z2 = -x * sy + z1 * cy;
        pts[i] = [x2, y1, z2];
        const s = (z2 + 2) / 3;
        nodes[i].style.transform = `translate(-50%, -50%) translate3d(${x2 * R}px, ${y1 * R}px, 0) scale(${s})`;
        nodes[i].style.opacity = String(0.25 + 0.75 * ((z2 + 1) / 2));
        nodes[i].style.zIndex = String(Math.round(z2 * 100) + 100);
      }
    };
    const loop = () => {
      if (!drag) { ax += (0.0016 - ax) * 0.02; ay += (0.0032 - ay) * 0.02; }
      if (visible) render();
      raf = requestAnimationFrame(loop);
    };
    // rotation angles here are per-frame deltas
    const down = (e) => { drag = true; lx = e.clientX; ly = e.clientY; el.setPointerCapture(e.pointerId); };
    const move = (e) => {
      if (!drag) return;
      ay = (e.clientX - lx) * 0.004; ax = -(e.clientY - ly) * 0.004;
      lx = e.clientX; ly = e.clientY;
    };
    const up = () => { drag = false; };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);
    if (reduced) { ax = 0.3; ay = 0.4; render(); ax = 0; ay = 0; render(); } else raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [words]);
  return (
    <div className="tsphere" ref={box} data-hot aria-label="AI skills sphere — drag to rotate" role="img">
      {words.map((w, i) => <span className={`ts-w c${i % 3}`} key={w}>{w}</span>)}
    </div>
  );
}

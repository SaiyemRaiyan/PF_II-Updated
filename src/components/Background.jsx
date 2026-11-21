import { useEffect, useRef, useState } from 'react';

// Which morph shape each section shows (see scene/LatentScene.js).
const SHAPE = {
  home: 0, about: 0, experience: 1, research: 1, projects: 2, skills: 2,
  education: 3, leadership: 3, certificates: 3, contact: 3,
};

export default function Background({ active }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let disposed = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Load three.js only after first paint so text is readable immediately.
    const boot = () => import('../scene/LatentScene.js').then(({ createLatentScene, webglAvailable }) => {
      if (disposed) return;
      if (!webglAvailable()) return setFallback(true);
      try {
        sceneRef.current = createLatentScene(canvasRef.current, { reducedMotion: reduced });
        sceneRef.current.setState({ shape: 0, layout: 'hero', scroll: 0 });
        canvasRef.current.classList.add('ready');
      } catch {
        setFallback(true);
      }
    });
    const id = 'requestIdleCallback' in window ? requestIdleCallback(boot, { timeout: 600 }) : setTimeout(boot, 120);

    const onMove = (e) => sceneRef.current?.setPointer((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    const onLeave = () => sceneRef.current?.setPointer(9, 9);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      disposed = true;
      'cancelIdleCallback' in window ? cancelIdleCallback(id) : clearTimeout(id);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      sceneRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      sceneRef.current?.setState({
        shape: SHAPE[active] ?? 0,
        layout: active === 'home' ? 'hero' : 'center',
        scroll: max > 0 ? scrollY / max : 0,
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [active]);

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-aurora" />
      {!fallback && <canvas ref={canvasRef} className="bg-canvas" />}
      <div className="bg-grid" />
      <div className="bg-vignette" />
    </div>
  );
}

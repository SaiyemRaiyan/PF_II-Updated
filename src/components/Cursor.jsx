import { useEffect, useRef } from 'react';

// Soft trailing ring on mouse devices; grows over links/buttons.
export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('has-cursor');
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf, moved = false;
    const move = (e) => {
      if (e.pointerType !== 'mouse') return;
      if (!moved) { moved = true; rx = e.clientX; ry = e.clientY; document.documentElement.classList.add('cursor-moved'); }
      x = e.clientX; y = e.clientY;
      dot.current.style.transform = `translate(${x}px, ${y}px)`;
      const hot = e.target.closest?.('a, button, [data-hot], input, textarea');
      ring.current.classList.toggle('hot', !!hot);
    };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    const down = () => ring.current.classList.add('press');
    const up = () => ring.current.classList.remove('press');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.classList.remove('has-cursor', 'cursor-moved');
    };
  }, []);
  return (
    <>
      <div ref={ring} className="cur-ring" aria-hidden="true" />
      <div ref={dot} className="cur-dot" aria-hidden="true" />
    </>
  );
}

import { useEffect, useState } from 'react';
import Monogram from './Monogram.jsx';

const LINES = ['initialising latent space', 'loading weights · 5 papers', 'tokenising বাংলা + English', 'aligning attention heads', 'ready'];

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = reduced ? 300 : 1300;
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / total);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => { setGone(true); onDone?.(); }, 180);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  const line = LINES[Math.min(LINES.length - 1, Math.floor(pct / 21))];
  return (
    <div className={`loader ${gone ? 'out' : ''}`} role="status" aria-label="Loading portfolio">
      <div className="loader-inner">
        <Monogram size={72} draw />
        <div className="loader-count">{String(pct).padStart(3, '0')}</div>
        <div className="loader-bar"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
        <div className="loader-line mono">&gt; {line}<span className="caret" /></div>
      </div>
    </div>
  );
}

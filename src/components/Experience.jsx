import { useEffect, useRef } from 'react';
import { experience } from '../data/profile.js';
import SectionHead from './SectionHead.jsx';
import { useTilt } from '../hooks/useTilt.js';

function Item({ x, i }) {
  const t = useTilt(6);
  return (
    <li className={`tl-item ${i % 2 ? 'r' : 'l'}`} data-reveal>
      <span className="tl-node" aria-hidden="true">{x.emoji}</span>
      <article className="tl-card glass tilt" ref={t}>
        <div className="tl-top">
          <span className="tl-period mono">{x.period}</span>
          {x.current && <span className="badge badge-live"><span className="pulse" /> Current</span>}
          <span className="badge">{x.type}</span>
        </div>
        <h3 className="tl-role">{x.role}</h3>
        <div className="tl-org">{x.org} <span>· {x.place}</span></div>
        <ul className="tl-pts">{x.points.map((p, k) => <li key={k}>{p}</li>)}</ul>
        <div className="tags">{x.tags.map((g) => <span key={g}>{g}</span>)}</div>
        <div className="glare" />
      </article>
    </li>
  );
}

export default function Experience() {
  const line = useRef(null);
  useEffect(() => {
    // the timeline spine "fills" as you scroll through it
    const el = line.current;
    const on = () => {
      const r = el.parentElement.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
      el.style.transform = `scaleY(${p})`;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHead id="experience" kicker="Experience" title="Where I’ve built and researched."
          sub="Research labs, healthcare software, EdTech, industry ML and years of teaching." />
        <ol className="tl">
          <span className="tl-spine" aria-hidden="true"><span ref={line} /></span>
          {experience.map((x, i) => <Item key={x.role + x.org} x={x} i={i} />)}
        </ol>
      </div>
    </section>
  );
}

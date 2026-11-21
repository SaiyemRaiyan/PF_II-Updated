import { experience } from '../data/profile.js';
import SectionHead from './SectionHead.jsx';
import { useTilt } from '../hooks/useTilt.js';

function Item({ x, i }) {
  const t = useTilt(6);
  return (
    <li className="xp glass tilt" ref={t} data-reveal style={{ '--d': `${(i % 2) * 80}ms` }}>
      <span className="xp-n mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
      <div className="xp-head">
        <span className="xp-emoji" aria-hidden="true">{x.emoji}</span>
        <div className="xp-meta">
          <span className="tl-period mono">{x.period}</span>
          <div className="xp-badges">
            {x.current && <span className="badge badge-live"><span className="pulse" /> Current</span>}
            <span className="badge">{x.type}</span>
          </div>
        </div>
      </div>
      <h3 className="tl-role">{x.role}</h3>
      <div className="tl-org">{x.org} <span>· {x.place}</span></div>
      <ul className="tl-pts">{x.points.map((p, k) => <li key={k}>{p}</li>)}</ul>
      <div className="tags">{x.tags.slice(0, 10).map((g) => <span key={g}>{g}</span>)}</div>
      <div className="glare" />
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHead id="experience" kicker="Experience" title="Where I’ve built and researched."
          sub="Research labs, healthcare software, EdTech, industry ML and years of teaching." />
        <ol className="xps">{experience.map((x, i) => <Item key={x.role + x.org} x={x} i={i} />)}</ol>
      </div>
    </section>
  );
}

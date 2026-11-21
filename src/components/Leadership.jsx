import { activities } from '../data/profile.js';
import SectionHead from './SectionHead.jsx';
import { useTilt } from '../hooks/useTilt.js';

function Act({ a, i }) {
  const t = useTilt(8);
  return (
    <article className="act glass tilt" ref={t} data-reveal style={{ '--d': `${(i % 3) * 80}ms` }}>
      <div className="act-head">
        <span className="act-e" aria-hidden="true">{a.emoji}</span>
        <span className="act-p mono">{a.period}</span>
      </div>
      <h3 className="act-o">{a.org}</h3>
      <p className="act-r">{a.role}</p>
      <p className="act-d">{a.desc}</p>
      {a.wins.length > 0 && <ul className="act-w">{a.wins.map((w) => <li key={w}>🏅 {w}</li>)}</ul>}
      <div className="glare" />
    </article>
  );
}

export default function Leadership() {
  return (
    <section id="leadership" className="section">
      <div className="wrap">
        <SectionHead id="leadership" kicker="Co-curricular" title="Leadership & community."
          sub="ACM, IEEE, UNICEF and science clubs — organising, volunteering and leading teams since school." />
        <div className="acts">{activities.map((a, i) => <Act key={a.org} a={a} i={i} />)}</div>
      </div>
    </section>
  );
}

import { sections } from '../data/profile.js';

export default function SectionHead({ id, kicker, title, sub }) {
  const i = sections.findIndex((s) => s.id === id);
  const s = sections[i];
  return (
    <div className="shead" data-reveal>
      <div className="shead-k mono">
        <span className="shead-n">{String(i + 1).padStart(2, '0')}</span>
        <span className="shead-line" />
        <span>{s.emoji} {kicker}</span>
      </div>
      <h2 className="shead-t">
        {title.split(' ').map((w, k) => (
          <span className="w" key={k}><span style={{ '--d': `${k * 70}ms` }}>{w}</span></span>
        ))}
      </h2>
      {sub && <p className="shead-s">{sub}</p>}
    </div>
  );
}

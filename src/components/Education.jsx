import { useState } from 'react';
import { education, awards } from '../data/profile.js';
import SectionHead from './SectionHead.jsx';
import { useTilt } from '../hooks/useTilt.js';

function Edu({ e, i }) {
  const t = useTilt(7);
  const [open, setOpen] = useState(false);
  return (
    <article className={`edu glass tilt ${i === 0 ? 'main' : ''}`} ref={t} data-reveal style={{ '--d': `${i * 90}ms` }}>
      <div className="edu-e" aria-hidden="true">{e.emoji}</div>
      <span className="edu-p mono">{e.period}</span>
      <h3 className="edu-d">{e.degree}</h3>
      <p className="edu-s">{e.school}</p>
      <span className="edu-score">{e.score}</span>
      {e.coursework && (
        <>
          <button className="edu-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
            📚 Coursework ({e.coursework.length}) <span aria-hidden="true">{open ? '−' : '+'}</span>
          </button>
          <div className={`edu-cw ${open ? 'open' : ''}`}>
            <div className="chips">{e.coursework.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
          </div>
        </>
      )}
      <div className="glare" />
    </article>
  );
}

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="wrap">
        <SectionHead id="education" kicker="Education & awards" title="Academic foundation."
          sub="Computer Science & Engineering at North South University, with perfect GPAs at HSC and SSC." />
        <div className="edus">
          {education.map((e, i) => <Edu key={e.degree} e={e} i={i} />)}
        </div>
        <h3 className="sub-h" data-reveal>🏆 Academic awards</h3>
        <div className="awards">
          {awards.map((a, i) => (
            <div className="award glass" key={a.title + a.detail} data-reveal style={{ '--d': `${i * 80}ms` }}>
              <span className="award-e" aria-hidden="true">{a.emoji}</span>
              <div><b>{a.title}</b><span>{a.detail}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

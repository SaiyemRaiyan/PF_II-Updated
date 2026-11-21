import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile.js';
import SectionHead from './SectionHead.jsx';
import { useTilt } from '../hooks/useTilt.js';

const STATS = [
  { value: 5, suffix: '+', label: 'Publications', emoji: '📄' },
  { value: 15, suffix: '+', label: 'Projects', emoji: '🚀' },
  { value: 7, suffix: '+', label: 'Years teaching & mentoring', emoji: '🎓' },
];

function Counter({ to, suffix }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / 1100);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Stat({ s, i }) {
  const t = useTilt(12);
  return (
    <div className="stat tilt" ref={t} data-reveal style={{ '--d': `${i * 90}ms` }}>
      <span className="stat-e" aria-hidden="true">{s.emoji}</span>
      <span className="stat-v"><Counter to={s.value} suffix={s.suffix} /></span>
      <span className="stat-l">{s.label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <SectionHead id="about" kicker="About me" title="Research-minded engineer, built for impact."
          sub="Career objective, research interests and what I bring to a team." />
        <div className="about-grid">
          <div className="about-text glass" data-reveal>
            {profile.objective.map((p, i) => <p key={i}>{p}</p>)}
            <blockquote className="motto">{profile.motto}</blockquote>
          </div>
          <div className="about-side">
            <div className="stats">{STATS.map((s, i) => <Stat key={s.label} s={s} i={i} />)}</div>
            <div className="glass mini" data-reveal>
              <h3 className="mini-t">🔬 Research interests</h3>
              <div className="chips">{profile.researchInterests.map((r) => <span className="chip" key={r}>{r}</span>)}</div>
            </div>
            <div className="glass mini" data-reveal>
              <h3 className="mini-t">🗣️ Languages</h3>
              {profile.languages.map((l) => (
                <div className="lang" key={l.name}><span>{l.name}</span><span className="mono lang-lv">{l.level}</span></div>
              ))}
            </div>
            <div className="glass mini" data-reveal>
              <h3 className="mini-t">✨ Interests</h3>
              <div className="chips">{profile.interests.map((r) => <span className="chip" key={r.label}>{r.emoji} {r.label}</span>)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

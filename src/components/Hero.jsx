import { useEffect, useState } from 'react';
import { profile, publications } from '../data/profile.js';
import { useTilt, useMagnet } from '../hooks/useTilt.js';
import Icon from './Icon.jsx';

const ORBIT = [
  { e: '🧠', t: 'LLMs' }, { e: '🩻', t: 'Medical VLMs' }, { e: '🇧🇩', t: 'Bangla NLP' },
  { e: '🤖', t: 'Agentic AI' }, { e: '📚', t: 'RAG' }, { e: '🔍', t: 'XAI' },
];

function RoleCube() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % profile.roles.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="cube" aria-live="polite">
      <span className="cube-in" style={{ transform: `translateZ(-0.6em) rotateX(${i * -90}deg)` }}>
        {profile.roles.map((r, k) => (
          <span key={r} className={`cube-face ${k === i ? 'on' : ''}`} style={{ transform: `rotateX(${k * 90}deg) translateZ(0.6em)` }} aria-hidden={k !== i}>{r}</span>
        ))}
      </span>
    </span>
  );
}

export default function Hero({ ready }) {
  const tilt = useTilt(14);
  const m1 = useMagnet(0.25);
  const m2 = useMagnet(0.25);
  const published = publications.filter((p) => p.status === 'Published').length;
  return (
    <section id="home" className={`hero ${ready ? 'go' : ''}`}>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="pulse" /> Open to research roles, ML positions & graduate study
          </div>
          <h1 className="hero-name" aria-label={profile.name}>
            <span className="hn-small">Md</span>
            {[profile.first, profile.last].map((w, wi) => (
              <span className="hn-word" key={w}>
                {w.split('').map((ch, ci) => (
                  <span className="ch" key={ci} style={{ '--d': `${(wi * 6 + ci) * 45 + 200}ms` }}>{ch}</span>
                ))}
              </span>
            ))}
          </h1>
          <div className="hero-role">
            <RoleCube />
          </div>
          <p className="hero-tag">{profile.tagline}</p>
          <div className="hero-meta mono">
            <span>📍 Dhaka, Bangladesh</span>
            <span>🎓 B.Sc. CSE, North South University</span>
            <span>🏛️ {published}× IEEE ICCIT</span>
          </div>
          <div className="hero-cta">
            <a ref={m1} href="#research" className="btn btn-primary">📄 View research</a>
            <a ref={m2} href="#contact" className="btn btn-ghost">✉️ Get in touch</a>
            <a href={profile.cv} download className="btn btn-link">⬇ Download CV</a>
          </div>
          <div className="hero-social">
            {profile.socials.slice(0, 3).map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}><Icon name={s.icon} size={18} /></a>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="portrait" ref={tilt}>
            <div className="portrait-card">
              <img src={profile.portrait} alt="Portrait of Md Saiyem Raiyan" width="900" height="1306" fetchpriority="high" />
              <div className="portrait-glare" />
              <div className="portrait-tag mono">
                <span className="dot" /> SR · AI/ML · {new Date().getFullYear()}
              </div>
            </div>
            <div className="orbit" aria-hidden="true">
              {ORBIT.map((o, i) => (
                <span key={o.t} className="orbit-chip" style={{ '--a': `${(360 / ORBIT.length) * i}deg` }}>
                  <span className="orbit-inner"><b>{o.e}</b>{o.t}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <span className="mouse"><span /></span>
        <span className="mono">scroll</span>
      </a>
    </section>
  );
}

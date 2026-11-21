import { useEffect, useState } from 'react';
import Monogram from './Monogram.jsx';
import { sections, profile } from '../data/profile.js';

const DESKTOP = ['about', 'experience', 'research', 'projects', 'skills', 'education', 'contact'];

export default function Nav({ active, onPalette }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const on = () => {
      setScrolled(scrollY > 24);
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? scrollY / max : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="nav-brand" aria-label="Md Saiyem Raiyan — home">
          <Monogram size={34} />
          <span className="nav-name">Saiyem<b>Raiyan</b></span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {DESKTOP.map((id) => {
            const s = sections.find((x) => x.id === id);
            return (
              <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined}>
                {s.label}
              </a>
            );
          })}
        </nav>
        <div className="nav-actions">
          <button className="kbd-btn" onClick={onPalette} aria-label="Open command palette">
            <span aria-hidden="true">⌘</span><span className="kbd-k">K</span>
          </button>
          <a className="btn btn-sm btn-primary nav-cv" href={profile.cv} download>📄 CV</a>
          <button className={`burger ${open ? 'x' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Menu">
            <span /><span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`mmenu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} style={{ '--i': i }} tabIndex={open ? 0 : -1}
              className={active === s.id ? 'on' : ''} onClick={() => setOpen(false)}>
              <span className="mm-num mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="mm-emoji" aria-hidden="true">{s.emoji}</span>
              <span className="mm-label">{s.label}</span>
            </a>
          ))}
        </nav>
        <div className="mm-foot" style={{ '--i': sections.length }}>
          <a href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1}>{profile.email}</a>
          <a className="btn btn-primary" href={profile.cv} download tabIndex={open ? 0 : -1}>📄 Download CV</a>
        </div>
      </div>
    </>
  );
}

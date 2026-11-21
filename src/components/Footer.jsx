import Monogram from './Monogram.jsx';
import Icon from './Icon.jsx';
import { profile, sections } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="footer ft">
      <div className="ft-floor" aria-hidden="true" />
      <div className="wrap">
        <div className="ft-cta">
          <span className="ft-live mono"><span className="pulse" /> Available for research & ML roles</span>
          <a className="ft-mail" href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden="true">↗</span></a>
        </div>
        <div className="ft-word" aria-hidden="true">SAIYEM RAIYAN</div>
        <div className="ft-cols">
          <div className="ft-brand">
            <div className="ft-logo"><Monogram size={44} /><div><b>{profile.name}</b><span>AI Researcher · ML Engineer · Developer</span></div></div>
            <div className="ft-soc">
              {profile.socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}><Icon name={s.icon} size={18} /></a>
              ))}
            </div>
          </div>
          <nav className="ft-nav" aria-label="Footer">
            <h4 className="mono">Navigate</h4>
            <div>{sections.map((s) => <a key={s.id} href={`#${s.id}`}><span aria-hidden="true">{s.emoji}</span> {s.label}</a>)}</div>
          </nav>
          <div className="ft-reach">
            <h4 className="mono">Reach me</h4>
            <a href={`mailto:${profile.email}`}>✉️ {profile.email}</a>
            <a href={`tel:${profile.phone}`}>📞 {profile.phone}</a>
            <span>📍 Dhaka, Bangladesh</span>
            <a href={profile.cv} download>📄 Curriculum Vitae</a>
          </div>
        </div>
        <div className="footer-meta mono ft-bar">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <a href="#home" className="ft-top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}

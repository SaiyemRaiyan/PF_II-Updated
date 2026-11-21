import Monogram from './Monogram.jsx';
import { profile, sections } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <div className="footer-brand">
          <Monogram size={40} />
          <div><b>{profile.name}</b><span>AI Researcher · ML Engineer · Developer</span></div>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {sections.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
        </nav>
        <div className="footer-meta mono">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

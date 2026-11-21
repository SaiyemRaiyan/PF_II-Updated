import { sections } from '../data/profile.js';

// Vertical "table of contents" rail on wide screens.
export default function SideIndex({ active }) {
  const idx = sections.findIndex((s) => s.id === active);
  return (
    <nav className="sidx" aria-label="Section index">
      <span className="sidx-count mono">{String(idx + 1).padStart(2, '0')}<i>/{String(sections.length).padStart(2, '0')}</i></span>
      <ol>
        {sections.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className={i === idx ? 'on' : i < idx ? 'past' : ''} aria-label={s.label}>
              <span className="sidx-tip">{s.emoji} {s.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

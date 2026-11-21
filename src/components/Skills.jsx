import { skills } from '../data/profile.js';
import SectionHead from './SectionHead.jsx';
import TagSphere from './TagSphere.jsx';
import Icon, { hasIcon } from './Icon.jsx';
import { useTilt } from '../hooks/useTilt.js';

const norm = (it) => (typeof it === 'string' ? { n: it } : it);

function Panel({ g, i }) {
  const t = useTilt(6);
  return (
    <div className={`skill glass tilt acc-${g.accent} ${i === 0 ? 'wide' : ''}`} ref={t} data-reveal style={{ '--d': `${(i % 3) * 80}ms` }}>
      <h3 className="skill-t"><span aria-hidden="true">{g.emoji}</span> {g.title} <i className="mono">{g.items.length}</i></h3>
      <ul className="skill-list">
        {g.items.map(norm).map((it) => (
          <li key={it.n}>{it.icon && hasIcon(it.icon) ? <Icon name={it.icon} size={15} /> : <span className="sk-dot" aria-hidden="true" />}{it.n}</li>
        ))}
      </ul>
      <div className="glare" />
    </div>
  );
}

export default function Skills() {
  const ai = skills[0].items.map((x) => norm(x).n);
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <SectionHead id="skills" kicker="Technical skills" title="The toolkit."
          sub="Drag the sphere — it holds my AI stack. Everything else is grouped below." />
        <div className="skills-top">
          <div data-reveal className="tsphere-wrap"><TagSphere words={ai} /></div>
          <div className="skills-grid">
            {skills.map((g, i) => <Panel key={g.title} g={g} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

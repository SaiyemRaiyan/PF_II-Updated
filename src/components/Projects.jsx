import { useMemo, useState } from 'react';
import { projects, projectFilters } from '../data/profile.js';
import SectionHead from './SectionHead.jsx';
import GenCover from './GenCover.jsx';
import { useTilt } from '../hooks/useTilt.js';
import { useReveal } from '../hooks/useReveal.js';
import Icon from './Icon.jsx';

function Card({ p, i }) {
  const t = useTilt(9);
  return (
    <article className={`proj glass tilt ${p.featured ? 'feat' : ''}`} ref={t} data-reveal style={{ '--d': `${(i % 3) * 80}ms` }}>
      <div className="proj-media">
        {p.img ? <img src={p.img} alt={p.title} loading="lazy" decoding="async" /> : <GenCover kind={p.gen} label={p.title} />}
        <span className="proj-emoji" aria-hidden="true">{p.emoji}</span>
        {p.featured && <span className="proj-flag mono">★ Featured research</span>}
      </div>
      <div className="proj-body">
        <span className="proj-period mono">{p.period}</span>
        <h3 className="proj-t">{p.title}</h3>
        <p className="proj-sub">{p.subtitle}</p>
        <p className="proj-d">{p.desc}</p>
        <div className="tags">{p.tags.map((g) => <span key={g}>{g}</span>)}</div>
        {p.link && (
          <a className="proj-link" href={p.link} target="_blank" rel="noopener noreferrer">
            {p.link.includes('github.com') ? <><Icon name="github" size={14} /> View code</> : <>📄 {p.linkLabel || 'Open'}</>} <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
      <div className="glare" />
    </article>
  );
}

export default function Projects() {
  const [f, setF] = useState('all');
  const list = useMemo(() => (f === 'all' ? projects : projects.filter((p) => p.category === f)), [f]);
  useReveal(f);
  const count = (k) => (k === 'all' ? projects.length : projects.filter((p) => p.category === k).length);
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <SectionHead id="projects" kicker="Projects" title="Things I’ve designed, trained and shipped."
          sub="From LLM benchmarks and medical VLM stress-tests to web platforms, embedded systems and classic CS." />
        <div className="filters" role="tablist" aria-label="Filter projects" data-reveal>
          {projectFilters.map((x) => (
            <button key={x.key} role="tab" aria-selected={f === x.key} className={f === x.key ? 'on' : ''} onClick={() => setF(x.key)}>
              <span aria-hidden="true">{x.emoji}</span> {x.label} <i className="mono">{count(x.key)}</i>
            </button>
          ))}
        </div>
        <div className="projs" key={f}>
          {list.map((p, i) => <Card key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

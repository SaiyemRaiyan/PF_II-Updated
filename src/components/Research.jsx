import { publications } from '../data/profile.js';
import SectionHead from './SectionHead.jsx';
import { useTilt } from '../hooks/useTilt.js';
import Icon from './Icon.jsx';

const STATUS = { Published: 'ok', Submitted: 'warn', 'Under Review': 'info' };

function Paper({ p, i }) {
  const t = useTilt(7);
  const Tag = p.url ? 'a' : 'div';
  return (
    <Tag className={`paper glass tilt ${p.url ? 'linked' : ''}`} ref={t} data-reveal style={{ '--d': `${i * 80}ms` }}
      {...(p.url ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <span className="paper-n mono" aria-hidden="true">P{String(i + 1).padStart(2, '0')}</span>
      <div className="paper-top">
        <span className={`badge badge-${STATUS[p.status]}`}>{p.status === 'Published' ? '✅' : p.status === 'Submitted' ? '📨' : '⏳'} {p.status}</span>
        {p.publisher && <span className="badge"><Icon name="ieee" size={12} /> {p.publisher}</span>}
      </div>
      <h3 className="paper-t">{p.title}</h3>
      {p.venue && <p className="paper-v">🏛️ {p.venue}</p>}
      {p.url && <span className="paper-go mono">Read on IEEE Xplore ↗</span>}
      <div className="glare" />
    </Tag>
  );
}

export default function Research() {
  return (
    <section id="research" className="section">
      <div className="wrap">
        <SectionHead id="research" kicker="Publications" title="Research & publications."
          sub="Low-resource Bangla NLP, LLM evaluation, retrieval-augmented generation and trustworthy medical vision-language models." />
        <div className="papers">
          {publications.map((p, i) => <Paper key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

import { certificates } from '../data/profile.js';
import SectionHead from './SectionHead.jsx';
import Icon from './Icon.jsx';
import { useTilt } from '../hooks/useTilt.js';

function Cert({ c, i }) {
  const t = useTilt(10);
  return (
    <a className="cert glass tilt" ref={t} href={c.url} target="_blank" rel="noopener noreferrer" data-reveal style={{ '--d': `${(i % 3) * 70}ms` }}>
      <span className="cert-logo">
        {c.logoImg ? <img src={c.logoImg} alt="" width="40" height="40" loading="lazy" />
          : c.icon ? <Icon name={c.icon} size={24} /> : <b className="mono">{c.txt}</b>}
      </span>
      <span className="cert-i mono">{c.issuer}</span>
      <h3 className="cert-t">{c.title}</h3>
      <span className="cert-go">📜 Show credential <span aria-hidden="true">↗</span></span>
      <div className="glare" />
    </a>
  );
}

export default function Certificates() {
  return (
    <section id="certificates" className="section">
      <div className="wrap">
        <SectionHead id="certificates" kicker="Certificates" title="Verified learning."
          sub="Professional certifications in Generative AI, LLMs, transformers, agentic AI and data analytics." />
        <div className="certs">{certificates.map((c, i) => <Cert key={c.title} c={c} i={i} />)}</div>
      </div>
    </section>
  );
}

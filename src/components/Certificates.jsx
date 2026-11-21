import { certificates } from '../data/profile.js';
import SectionHead from './SectionHead.jsx';
import Icon from './Icon.jsx';

// Two counter-scrolling rows of credential badges.
const ROWS = [certificates.slice(0, 5), certificates.slice(5)];

function Badge({ c, n, dup }) {
  return (
    <a className="cc" href={c.url} target="_blank" rel="noopener noreferrer" aria-hidden={dup || undefined} tabIndex={dup ? -1 : undefined}>
      <span className="cc-no mono">№ {String(n).padStart(2, '0')}</span>
      <span className="cc-logo">
        {c.logoImg ? <img src={c.logoImg} alt="" width="36" height="36" loading="lazy" />
          : c.icon ? <Icon name={c.icon} size={22} /> : <b className="mono">{c.txt}</b>}
      </span>
      <span className="cc-i mono">{c.issuer}</span>
      <h3 className="cc-t">{c.title}</h3>
      <span className="cc-go">📜 Show credential <span aria-hidden="true">↗</span></span>
    </a>
  );
}

export default function Certificates() {
  let n = 0;
  return (
    <section id="certificates" className="section tex-band">
      <div className="wrap">
        <SectionHead id="certificates" kicker="Certificates" title="Verified learning."
          sub="Professional certifications in Generative AI, LLMs, transformers, agentic AI and data analytics." />
      </div>
      <div className="crows" data-reveal>
        {ROWS.map((r, ri) => {
          const base = n; n += r.length;
          return (
            <div className={`crow ${ri ? 'rev' : ''}`} key={ri}>
              <div className="crow-track">
                {[0, 1, 2, 3].flatMap((rep) => r.map((c, k) => <Badge key={rep + '-' + k} c={c} n={base + k + 1} dup={rep > 0} />))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { profile } from '../data/profile.js';
import SectionHead from './SectionHead.jsx';
import Icon from './Icon.jsx';

const encode = (d) => Object.keys(d).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(d[k])}`).join('&');

export default function Contact() {
  const [state, setState] = useState('idle');
  const [copied, setCopied] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.target));
    if (fd['bot-field']) return;
    setState('sending');
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode({ 'form-name': 'contact', ...fd }) });
      if (!res.ok) throw new Error(String(res.status));
      setState('sent');
      e.target.reset();
    } catch {
      const body = `${fd.message}\n\n— ${fd.name} (${fd.email})`;
      location.href = `mailto:${profile.email}?subject=${encodeURIComponent(fd.subject || 'Hello from your portfolio')}&body=${encodeURIComponent(body)}`;
      setState('mail');
    }
  };

  const copy = () => {
    navigator.clipboard?.writeText(profile.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };

  return (
    <section id="contact" className="section ct">
      <div className="ct-rings" aria-hidden="true"><span /><span /><span /></div>
      <div className="wrap rel">
        <SectionHead id="contact" kicker="Contact" title="Let’s build something meaningful."
          sub="Open to research collaborations, ML/AI engineering roles and graduate study opportunities." />
        <div className="contact-grid">
          <div className="contact-info">
            <button className="cinfo glass" onClick={copy} data-reveal>
              <span className="cinfo-e" aria-hidden="true">✉️</span>
              <span><b>Email</b><span>{profile.email}</span></span>
              <span className="cinfo-a mono">{copied ? 'copied ✓' : 'copy'}</span>
            </button>
            <a className="cinfo glass" href={`tel:${profile.phone}`} data-reveal>
              <span className="cinfo-e" aria-hidden="true">📞</span>
              <span><b>Phone</b><span>{profile.phone}</span></span>
              <span className="cinfo-a mono">call</span>
            </a>
            <div className="cinfo glass" data-reveal>
              <span className="cinfo-e" aria-hidden="true">📍</span>
              <span><b>Location</b><span>{profile.location}</span></span>
            </div>
            <div className="socials" data-reveal>
              {profile.socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social">
                  <Icon name={s.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          <form className="cform glass" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} data-reveal>
            <input type="hidden" name="form-name" value="contact" />
            <p hidden><label>Don’t fill this out: <input name="bot-field" /></label></p>
            <div className="field"><input id="f-name" name="name" required placeholder=" " autoComplete="name" /><label htmlFor="f-name">Your name</label></div>
            <div className="field"><input id="f-email" name="email" type="email" required placeholder=" " autoComplete="email" /><label htmlFor="f-email">Your email</label></div>
            <div className="field"><input id="f-subj" name="subject" placeholder=" " /><label htmlFor="f-subj">Subject</label></div>
            <div className="field"><textarea id="f-msg" name="message" rows="5" required placeholder=" " /><label htmlFor="f-msg">Message</label></div>
            <button className="btn btn-primary" type="submit" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : '🚀 Send message'}
            </button>
            <p className="cform-status" role="status">
              {state === 'sent' && '✅ Thanks! Your message was sent — I’ll reply soon.'}
              {state === 'mail' && '✉️ Opening your email app to send the message…'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

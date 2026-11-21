import { useEffect, useMemo, useRef, useState } from 'react';
import { sections, projects, publications, profile, certificates } from '../data/profile.js';

// ⌘K / Ctrl+K quick navigator: jump to any section, project, paper or link.
export default function CommandPalette({ open, setOpen }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const input = useRef(null);
  const [toast, setToast] = useState('');

  const items = useMemo(() => [
    ...sections.map((s) => ({ g: 'Go to', label: s.label, emoji: s.emoji, run: () => go(`#${s.id}`) })),
    { g: 'Actions', label: 'Download CV (PDF)', emoji: '📄', run: () => { const a = document.createElement('a'); a.href = profile.cv; a.download = ''; a.click(); } },
    { g: 'Actions', label: 'Copy email address', emoji: '📋', run: () => { navigator.clipboard?.writeText(profile.email); setToast('Email copied'); } },
    { g: 'Actions', label: 'Send an email', emoji: '✉️', run: () => { location.href = `mailto:${profile.email}`; } },
    ...profile.socials.map((s) => ({ g: 'Links', label: s.label, emoji: '🔗', run: () => window.open(s.url, '_blank', 'noopener') })),
    ...publications.map((p) => ({ g: 'Papers', label: p.title.split(':')[0], hint: p.status, emoji: '📄', run: () => (p.url ? window.open(p.url, '_blank', 'noopener') : go('#research')) })),
    ...projects.map((p) => ({ g: 'Projects', label: p.title, emoji: p.emoji, run: () => (p.link ? window.open(p.link, '_blank', 'noopener') : go('#projects')) })),
    ...certificates.map((c) => ({ g: 'Certificates', label: c.title, hint: c.issuer, emoji: '📜', run: () => window.open(c.url, '_blank', 'noopener') })),
  ], []);

  function go(hash) {
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', hash);
  }

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? items.filter((i) => (i.label + ' ' + (i.hint || '') + ' ' + i.g).toLowerCase().includes(s)) : items;
  }, [q, items]);

  useEffect(() => {
    const key = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [setOpen]);

  useEffect(() => {
    if (open) { setQ(''); setSel(0); setTimeout(() => input.current?.focus(), 30); }
  }, [open]);
  useEffect(() => setSel(0), [q]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(''), 1600); return () => clearTimeout(t); } }, [toast]);

  const run = (it) => { setOpen(false); setTimeout(it.run, 60); };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(list.length - 1, s + 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
    if (e.key === 'Enter' && list[sel]) run(list[sel]);
  };

  let lastG = '';
  return (
    <>
      <div className={`cmdk ${open ? 'open' : ''}`} onClick={() => setOpen(false)} aria-hidden={!open}>
        <div className="cmdk-box" role="dialog" aria-modal="true" aria-label="Command palette" onClick={(e) => e.stopPropagation()}>
          <div className="cmdk-in">
            <span aria-hidden="true">🔎</span>
            <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey}
              placeholder="Search sections, papers, projects, links…" aria-label="Search" tabIndex={open ? 0 : -1} />
            <kbd>esc</kbd>
          </div>
          <ul className="cmdk-list" role="listbox">
            {list.length === 0 && <li className="cmdk-empty">No results for “{q}”</li>}
            {list.map((it, i) => {
              const head = it.g !== lastG ? (lastG = it.g) : null;
              return (
                <li key={it.g + it.label + i}>
                  {head && <div className="cmdk-g mono">{head}</div>}
                  <button role="option" aria-selected={i === sel} className={i === sel ? 'sel' : ''}
                    onMouseEnter={() => setSel(i)} onClick={() => run(it)} tabIndex={-1}>
                    <span className="cmdk-e" aria-hidden="true">{it.emoji}</span>
                    <span className="cmdk-l">{it.label}</span>
                    {it.hint && <span className="cmdk-h">{it.hint}</span>}
                    <span className="cmdk-ret" aria-hidden="true">↵</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="cmdk-foot mono"><span>↑↓ navigate</span><span>↵ open</span><span>⌘K / Ctrl K toggle</span></div>
        </div>
      </div>
      <div className={`toast ${toast ? 'show' : ''}`} role="status">{toast}</div>
    </>
  );
}

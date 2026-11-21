# Md Saiyem Raiyan — Portfolio (v2)

## Run

```bash
npm install
npm run dev        
npm run build      # outputs dist/
npm run preview
```

Requires Node 18+.

## Edit content

All text, links, projects, papers and skills live in **`src/data/profile.js`**. 

## Features

- Loader, floating glass navbar with scroll progress, full-screen 3D mobile menu, section index rail
- `⌘K` / `Ctrl+K` command palette (jump to sections, papers, projects, certificates, links)
- Project filters (AI Research / ML & Vision / Web / Systems), generated SVG covers for research projects
- Respects `prefers-reduced-motion`; falls back gracefully when WebGL is unavailable
- 3D code loads after first paint; canvas pauses when the tab is hidden; reduced particles and pixel ratio on phones
- All fonts, brand icons and images are bundled locally (no CDN hotlinks)

## Deploy (Netlify)

Connect the repo, or drag the `dist/` folder. `netlify.toml` already sets the build command.
The contact form uses Netlify Forms (registered by the hidden form in `index.html`) and falls back to
the visitor's mail app elsewhere. Enable form notifications in the Netlify dashboard to receive them at your email.

## Images

`scripts/optimize-images.mjs` is the one-off script that converted the original photos to WebP and
stripped EXIF/GPS data. The processed files are already in `public/img/`.

## Notes

- Serve the site from the **domain root** (e.g. `https://sraiyan.netlify.app/`), not a sub-path, because assets use absolute `/` URLs.
- Two links to double-check in `src/data/profile.js`: the Meta "Introduction to Data Analytics" certificate currently shares the
  Vanderbilt credential URL (it did in the old site), and SummaryScribe / LLMs-in-Summarizing share one GitHub repo link.

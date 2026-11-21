// Brand logos are bundled locally from `simple-icons` (named imports are
// tree-shaken, so only these ~35 paths end up in the build).
import {
  siPytorch, siLangchain, siGooglecloud, siC, siCplusplus, siPython, siOpenjdk, siHtml5,
  siCss3, siBootstrap, siJavascript, siVuedotjs, siPhp, siLaravel, siMysql, siGooglesheets,
  siOverleaf, siGit, siCodeblocks, siIntellijidea, siEclipseide, siApachenetbeanside, siPycharm,
  siAnaconda, siAutocad, siGooglecolab, siKaggle, siMeta, siLinkedin, siGithub, siX, siFacebook,
  siInstagram, siIeee, siGmail,
} from 'simple-icons';

const ICONS = {
  pytorch: siPytorch, langchain: siLangchain, googlecloud: siGooglecloud, c: siC, cplusplus: siCplusplus,
  python: siPython, openjdk: siOpenjdk, html5: siHtml5, css3: siCss3, bootstrap: siBootstrap,
  javascript: siJavascript, vuedotjs: siVuedotjs, php: siPhp, laravel: siLaravel, mysql: siMysql,
  googlesheets: siGooglesheets, overleaf: siOverleaf, git: siGit, codeblocks: siCodeblocks,
  intellijidea: siIntellijidea, eclipseide: siEclipseide, apachenetbeanside: siApachenetbeanside,
  pycharm: siPycharm, anaconda: siAnaconda, autocad: siAutocad, googlecolab: siGooglecolab, kaggle: siKaggle,
  meta: siMeta, linkedin: siLinkedin, github: siGithub, x: siX, facebook: siFacebook, instagram: siInstagram,
  ieee: siIeee, gmail: siGmail,
};

// Very dark brand colours vanish on the dark UI, so lift them.
function visible(hex) {
  const n = parseInt(hex, 16);
  const l = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return l < 70 ? '#e8ecff' : `#${hex}`;
}

export default function Icon({ name, size = 18, mono = false, title }) {
  const ic = ICONS[name];
  if (!ic) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined} fill={mono ? 'currentColor' : visible(ic.hex)}>
      {title && <title>{title}</title>}
      <path d={ic.path} />
    </svg>
  );
}

export const hasIcon = (n) => !!ICONS[n];

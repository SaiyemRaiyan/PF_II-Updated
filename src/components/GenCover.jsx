// Procedural SVG covers for research projects that have no photo.
// Each `kind` draws a small visual metaphor of the work itself.
const C = ['#5ef1ff', '#8b7bff', '#ffb35c', '#ff6fae'];

function seeded(seed) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

export default function GenCover({ kind, label }) {
  const r = seeded(kind.length * 97 + kind.charCodeAt(0));
  let body = null;
  if (kind === 'mix') {
    // two scripts interleaving: Bangla + Latin tokens flowing into a classifier
    const toks = ['আমি', 'love', 'এই', 'movie', 'টা', 'so', 'much', 'ভালো', 'bro', 'না'];
    body = toks.map((t, i) => (
      <text key={i} x={30 + (i % 5) * 72} y={60 + Math.floor(i / 5) * 50} fill={i % 2 ? C[0] : C[2]}
        fontSize="20" fontFamily="JetBrains Mono, monospace" opacity={0.9}>{t}</text>
    ));
    body.push(<path key="p" d="M30 150 C 140 150, 200 200, 380 175" stroke={C[1]} strokeWidth="2" fill="none" strokeDasharray="6 6" />);
    ['POS', 'NEG', 'NEU', 'MIX'].forEach((l, i) => body.push(
      <g key={l}><rect x={60 + i * 82} y={190} width="64" height="24" rx="12" fill="none" stroke={C[i]} />
        <text x={92 + i * 82} y={207} fill={C[i]} fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono, monospace">{l}</text></g>));
  } else if (kind === 'vlm') {
    // an x-ray-ish frame with an attention heatmap and a counterfactual mask
    body = [
      <rect key="f" x="40" y="30" width="170" height="180" rx="14" fill="#0b1124" stroke={C[0]} strokeOpacity=".5" />,
      <ellipse key="l1" cx="95" cy="120" rx="34" ry="62" fill="none" stroke="#9fb3ff" strokeOpacity=".5" />,
      <ellipse key="l2" cx="155" cy="120" rx="34" ry="62" fill="none" stroke="#9fb3ff" strokeOpacity=".5" />,
      <circle key="h" cx="150" cy="100" r="30" fill={`url(#${kind}-heat)`} />,
      <rect key="m" x="70" y="140" width="46" height="34" fill={C[2]} opacity=".25" stroke={C[2]} strokeDasharray="4 4" />,
      <text key="q" x="240" y="70" fill="#e8ecff" fontSize="13" fontFamily="JetBrains Mono, monospace">Q: abnormality?</text>,
      <text key="a" x="240" y="100" fill={C[0]} fontSize="13" fontFamily="JetBrains Mono, monospace">A: model answer</text>,
      <text key="c" x="240" y="130" fill={C[2]} fontSize="13" fontFamily="JetBrains Mono, monospace">masked image → ?</text>,
      ...[0, 1, 2, 3, 4, 5].map((i) => <rect key={'b' + i} x={240 + i * 22} y={190 - (i + 1) * 9} width="14" height={(i + 1) * 9} fill={C[1]} opacity={0.4 + i * 0.1} />),
    ];
  } else if (kind === 'detect') {
    // human vs AI text — two columns of "lines" with a verdict meter
    body = [];
    for (let i = 0; i < 7; i++) {
      body.push(<rect key={'h' + i} x="40" y={40 + i * 22} width={80 + r() * 90} height="8" rx="4" fill={C[0]} opacity=".7" />);
      body.push(<rect key={'a' + i} x="240" y={40 + i * 22} width={150} height="8" rx="4" fill={C[3]} opacity=".55" />);
    }
    body.push(<text key="t1" x="40" y="215" fill={C[0]} fontSize="13" fontFamily="JetBrains Mono, monospace">✍ human</text>);
    body.push(<text key="t2" x="240" y="215" fill={C[3]} fontSize="13" fontFamily="JetBrains Mono, monospace">🤖 machine</text>);
  } else if (kind === 'rag') {
    // retrieval: documents → vector store → LLM
    body = [
      ...[0, 1, 2].map((i) => <rect key={'d' + i} x={40 + i * 8} y={60 + i * 8} width="70" height="90" rx="8" fill="#0b1124" stroke={C[0]} strokeOpacity=".7" />),
      <path key="a1" d="M130 120 H180" stroke={C[1]} strokeWidth="2" markerEnd={`url(#${kind}-arr)`} />,
      ...Array.from({ length: 12 }, (_, i) => <circle key={'v' + i} cx={200 + (i % 4) * 22} cy={90 + Math.floor(i / 4) * 26} r="6" fill={i === 5 || i === 6 ? C[2] : C[1]} opacity=".85" />),
      <path key="a2" d="M290 120 H330" stroke={C[1]} strokeWidth="2" markerEnd={`url(#${kind}-arr)`} />,
      <rect key="llm" x="335" y="88" width="62" height="64" rx="14" fill="none" stroke={C[2]} strokeWidth="2" />,
      <text key="lt" x="366" y="125" fill={C[2]} fontSize="14" textAnchor="middle" fontFamily="JetBrains Mono, monospace">LLM</text>,
      <text key="bq" x="40" y="205" fill="#e8ecff" fontSize="13" fontFamily="JetBrains Mono, monospace">14,889 QA · 3,000 passages · 6 LLMs</text>,
    ];
  } else {
    // cells — soft cluster of nuclei with classification rings
    body = Array.from({ length: 26 }, (_, i) => {
      const x = 40 + r() * 340, y = 30 + r() * 180, rad = 8 + r() * 16;
      const bad = r() < 0.25;
      return (
        <g key={i}>
          <circle cx={x} cy={y} r={rad} fill={bad ? C[3] : C[1]} opacity=".22" />
          <circle cx={x} cy={y} r={rad * 0.35} fill={bad ? C[3] : C[0]} opacity=".8" />
          {bad && <circle cx={x} cy={y} r={rad + 5} fill="none" stroke={C[2]} strokeDasharray="3 3" />}
        </g>
      );
    });
  }
  return (
    <svg className="gen-cover" viewBox="0 0 420 240" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      <defs>
        <radialGradient id={`${kind}-heat`}><stop offset="0" stopColor="#ff6fae" stopOpacity=".9" /><stop offset=".6" stopColor="#ffb35c" stopOpacity=".35" /><stop offset="1" stopColor="#ffb35c" stopOpacity="0" /></radialGradient>
        <linearGradient id={`${kind}-bgc`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0d1430" /><stop offset="1" stopColor="#140f2e" /></linearGradient>
        <pattern id={`${kind}-grid`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#ffffff" strokeOpacity=".04" /></pattern>
        <marker id={`${kind}-arr`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#8b7bff" /></marker>
      </defs>
      <rect width="420" height="240" fill={`url(#${kind}-bgc)`} />
      <rect width="420" height="240" fill={`url(#${kind}-grid)`} />
      {body}
    </svg>
  );
}

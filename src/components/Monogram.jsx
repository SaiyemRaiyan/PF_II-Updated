// Personal "SR" monogram, drawn as a single SVG stroke so it can animate in.
export default function Monogram({ size = 36, draw = false }) {
  return (
    <svg className={`monogram ${draw ? 'draw' : ''}`} viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5ef1ff" />
          <stop offset=".55" stopColor="#8b7bff" />
          <stop offset="1" stopColor="#ffb35c" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="none" stroke="url(#mg)" strokeOpacity=".35" strokeWidth="1.5" />
      <path pathLength="1" d="M14 44c4 3 9 4 13 2 5-2 5-8 0-10s-12-4-12-10 7-9 13-6M36 46V18h8c5 0 8 3 8 8s-3 8-8 8h-8m8 0 8 12"
        fill="none" stroke="url(#mg)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Animated North American conventional (long-hood) semi — SVG + CSS.
// Rolling wheels, drifting road lines, exhaust puffs, and motion streaks.
// No image assets; fully static-export friendly.

export default function HeroTruck() {
  return (
    <div className="hero-truck" aria-hidden="true">
      <svg
        className="hero-truck-svg"
        viewBox="0 0 900 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <defs>
          <linearGradient id="cabGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3f66ff" />
            <stop offset="1" stopColor="#1a34a0" />
          </linearGradient>
          <linearGradient id="trailerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e9edfb" />
          </linearGradient>
          <linearGradient id="roadGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0b1020" stopOpacity="0" />
            <stop offset="0.5" stopColor="#0b1020" stopOpacity="0.85" />
            <stop offset="1" stopColor="#0b1020" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* motion streaks behind the rig */}
        <g className="ht-streaks">
          <rect x="20" y="120" width="120" height="5" rx="2.5" fill="#5b82ff" opacity="0.5" />
          <rect x="0" y="150" width="90" height="5" rx="2.5" fill="#5b82ff" opacity="0.35" />
          <rect x="40" y="182" width="140" height="5" rx="2.5" fill="#5b82ff" opacity="0.45" />
        </g>

        {/* whole rig bobs very slightly */}
        <g className="ht-rig">
          {/* ---- TRAILER (dry van) ---- */}
          <g>
            <rect x="360" y="70" width="360" height="150" rx="8" fill="url(#trailerGrad)" stroke="#d3daf0" strokeWidth="2" />
            {/* trailer ribs */}
            <g stroke="#d3daf0" strokeWidth="2">
              <line x1="410" y1="76" x2="410" y2="214" />
              <line x1="460" y1="76" x2="460" y2="214" />
              <line x1="510" y1="76" x2="510" y2="214" />
              <line x1="560" y1="76" x2="560" y2="214" />
              <line x1="610" y1="76" x2="610" y2="214" />
              <line x1="660" y1="76" x2="660" y2="214" />
            </g>
            {/* wolf-blue brand band + wordmark on the trailer */}
            <rect x="360" y="150" width="360" height="30" fill="#2f5bff" opacity="0.14" />
            <text x="540" y="132" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="34" fill="#1a34a0" letterSpacing="2">
              BAIRAVA
            </text>
            <text x="540" y="162" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="15" fill="#2f5bff" letterSpacing="6">
              TRANSPORT INC
            </text>
          </g>

          {/* trailer underride guard / skirt */}
          <rect x="372" y="220" width="336" height="10" rx="3" fill="#c3cadd" />

          {/* ---- TRACTOR (conventional long hood) ---- */}
          <g>
            {/* sleeper + cab body */}
            <path
              d="M210 96 h150 v124 h-150 a10 10 0 0 1 -10 -10 v-104 a10 10 0 0 1 10 -10 z"
              fill="url(#cabGrad)"
            />
            {/* long hood */}
            <path d="M120 150 q6 -34 40 -38 l50 -4 v92 h-92 q-4 -26 2 -50 z" fill="url(#cabGrad)" />
            {/* windshield + door glass */}
            <path d="M224 108 h84 v46 h-96 q2 -30 12 -46 z" fill="#bcd0ff" opacity="0.9" />
            <line x1="270" y1="108" x2="270" y2="154" stroke="#1a34a0" strokeWidth="3" />
            {/* grille */}
            <rect x="120" y="150" width="20" height="46" rx="3" fill="#0e1c5c" />
            <g stroke="#3f66ff" strokeWidth="2">
              <line x1="124" y1="156" x2="136" y2="156" />
              <line x1="124" y1="164" x2="136" y2="164" />
              <line x1="124" y1="172" x2="136" y2="172" />
              <line x1="124" y1="180" x2="136" y2="180" />
              <line x1="124" y1="188" x2="136" y2="188" />
            </g>
            {/* headlight */}
            <circle cx="150" cy="200" r="7" fill="#ffd34d" />
            {/* bumper */}
            <rect x="112" y="204" width="40" height="12" rx="3" fill="#c3cadd" />
            {/* exhaust stack */}
            <rect x="206" y="60" width="10" height="52" rx="3" fill="#9aa4c2" />
            {/* fuel tank */}
            <rect x="250" y="196" width="60" height="26" rx="10" fill="#9aa4c2" />
            {/* mirror */}
            <rect x="214" y="112" width="6" height="26" rx="2" fill="#0e1c5c" />
          </g>

          {/* exhaust puffs */}
          <g className="ht-smoke">
            <circle cx="211" cy="52" r="7" fill="#c3caddaa" />
            <circle cx="211" cy="52" r="7" fill="#c3caddaa" className="ht-smoke2" />
            <circle cx="211" cy="52" r="7" fill="#c3caddaa" className="ht-smoke3" />
          </g>

          {/* ---- WHEELS (rotate) ---- */}
          <g>
            {/* steer axle */}
            <Wheel cx={158} cy={236} />
            {/* drive axle (tandem) */}
            <Wheel cx={268} cy={236} />
            <Wheel cx={318} cy={236} />
            {/* trailer tandem */}
            <Wheel cx={600} cy={236} />
            <Wheel cx={660} cy={236} />
          </g>
        </g>

        {/* ---- ROAD ---- */}
        <rect x="0" y="250" width="900" height="4" fill="url(#roadGrad)" />
        <g className="ht-road">
          {Array.from({ length: 14 }).map((_, i) => (
            <rect
              key={i}
              x={i * 80}
              y="266"
              width="40"
              height="5"
              rx="2.5"
              fill="#2f5bff"
              opacity="0.55"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g className="ht-wheel" style={{ transformOrigin: `${cx}px ${cy}px` }}>
      <circle cx={cx} cy={cy} r="26" fill="#12162a" />
      <circle cx={cx} cy={cy} r="26" fill="none" stroke="#0b1020" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="12" fill="#c3cadd" />
      <circle cx={cx} cy={cy} r="3.5" fill="#7a8399" />
      {/* spokes to make rotation visible */}
      <g stroke="#7a8399" strokeWidth="3">
        <line x1={cx} y1={cy - 12} x2={cx} y2={cy + 12} />
        <line x1={cx - 12} y1={cy} x2={cx + 12} y2={cy} />
        <line x1={cx - 8.5} y1={cy - 8.5} x2={cx + 8.5} y2={cy + 8.5} />
        <line x1={cx - 8.5} y1={cy + 8.5} x2={cx + 8.5} y2={cy - 8.5} />
      </g>
    </g>
  );
}

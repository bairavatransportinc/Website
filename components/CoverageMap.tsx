// Stylized North America map with animated Canada→US lanes.
// Simplified continent silhouette (not geographically exact) + drawn routes.

export default function CoverageMap() {
  return (
    <div className="coverage-map" aria-hidden="true">
      <svg viewBox="0 0 620 460" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="laneGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2f5bff" />
            <stop offset="1" stopColor="#5b82ff" />
          </linearGradient>
        </defs>

        {/* Continent silhouette (stylized US + Canada) */}
        <g className="cm-land">
          {/* Canada (top) */}
          <path
            className="cm-canada"
            d="M70 150 L120 96 L200 84 L300 92 L410 86 L500 104 L560 130 L556 168 L470 176 L360 172 L250 176 L150 182 L90 186 Z"
          />
          {/* USA (middle) */}
          <path
            className="cm-usa"
            d="M96 190 L180 184 L280 180 L390 176 L470 180 L556 172 L544 250 L500 300 L470 336 L430 356 L380 360 L300 356 L220 348 L150 320 L110 270 L92 224 Z"
          />
        </g>

        {/* Grid dots overlay for texture */}
        <g className="cm-dots">
          {Array.from({ length: 9 }).map((_, r) =>
            Array.from({ length: 13 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={60 + c * 40}
                cy={110 + r * 32}
                r="1.6"
                fill="#2f5bff"
                opacity="0.16"
              />
            ))
          )}
        </g>

        {/* Animated lanes (Canada hub → US destinations) */}
        <g fill="none" stroke="url(#laneGrad)" strokeWidth="3" strokeLinecap="round">
          <path className="cm-lane" d="M250 150 C 280 200, 300 230, 330 268" />
          <path className="cm-lane cm-lane-2" d="M250 150 C 210 210, 190 250, 176 300" />
          <path className="cm-lane cm-lane-3" d="M250 150 C 330 190, 420 210, 456 250" />
          <path className="cm-lane cm-lane-4" d="M250 150 C 300 240, 320 300, 340 344" />
        </g>

        {/* Home hub (Brampton/Toronto) */}
        <g className="cm-hub">
          <circle cx="250" cy="150" r="18" className="cm-hub-ring" />
          <circle cx="250" cy="150" r="7" fill="#2f5bff" />
          <circle cx="250" cy="150" r="3" fill="#fff" />
        </g>

        {/* Destination pins */}
        <g>
          <circle cx="330" cy="268" r="6" className="cm-pin" />
          <circle cx="176" cy="300" r="6" className="cm-pin" />
          <circle cx="456" cy="250" r="6" className="cm-pin" />
          <circle cx="340" cy="344" r="6" className="cm-pin" />
        </g>
      </svg>
    </div>
  );
}

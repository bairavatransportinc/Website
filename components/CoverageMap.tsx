// North America coverage map with animated highway routes.
// Roads are drawn as dual-line "highways" with flowing dashes (traffic),
// connecting the Brampton hub to key US/Canada destination cities.

const cities = [
  { name: "Toronto", x: 356, y: 196, hub: true },
  { name: "Montreal", x: 408, y: 168, labelDx: 6, labelDy: -14 },
  { name: "Detroit", x: 316, y: 216, labelDx: -6, labelDy: -12 },
  { name: "Chicago", x: 280, y: 232, labelDx: -18, labelDy: 4 },
  { name: "New York", x: 424, y: 220, labelDx: 22, labelDy: 4 },
  { name: "Dallas", x: 248, y: 326, labelDx: 0, labelDy: 20 },
];

// Highway routes from the Toronto/Brampton hub outward.
const routes = [
  "M356 196 C 340 208, 328 212, 316 216", // → Detroit
  "M356 196 C 318 214, 296 226, 280 232", // → Chicago
  "M356 196 C 384 182, 400 174, 408 168", // → Montreal
  "M356 196 C 394 202, 414 214, 424 220", // → New York
  "M356 196 C 318 252, 278 294, 248 326", // → Dallas
];

export default function CoverageMap() {
  return (
    <div className="coverage-map" aria-hidden="true">
      <svg viewBox="0 0 560 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="roadGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5b82ff" />
            <stop offset="1" stopColor="#2f5bff" />
          </linearGradient>
          <radialGradient id="hubGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#2f5bff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#2f5bff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Stylized North America landmass (soft, low-contrast backdrop) */}
        <path
          className="cm-land"
          d="M70 150 C 110 120, 160 110, 210 108 C 280 105, 330 100, 400 104
             C 450 108, 500 118, 512 150 C 505 170, 470 172, 440 176
             L 430 196 C 452 206, 470 224, 476 252 C 480 292, 452 322, 420 350
             C 392 372, 356 372, 320 366 C 262 356, 210 344, 168 310
             C 128 278, 104 232, 92 196 C 82 176, 72 164, 70 150 Z"
        />

        {/* Dotted texture */}
        <g className="cm-dots">
          {Array.from({ length: 8 }).map((_, r) =>
            Array.from({ length: 11 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={90 + c * 38}
                cy={130 + r * 30}
                r="1.4"
                fill="#5b82ff"
                opacity="0.12"
              />
            ))
          )}
        </g>

        {/* Highways: a wide base "asphalt" line + animated flowing dashes */}
        {routes.map((d, i) => (
          <g key={i}>
            <path className="cm-road-base" d={d} />
            <path
              className="cm-road-flow"
              d={d}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          </g>
        ))}

        {/* Hub glow */}
        <circle cx="356" cy="196" r="46" fill="url(#hubGlow)" />

        {/* Cities */}
        {cities.map((c) => (
          <g key={c.name}>
            {c.hub ? (
              <>
                <circle cx={c.x} cy={c.y} r="18" className="cm-hub-ring" />
                <circle cx={c.x} cy={c.y} r="8" fill="#2f5bff" />
                <circle cx={c.x} cy={c.y} r="3.5" fill="#fff" />
              </>
            ) : (
              <circle cx={c.x} cy={c.y} r="5.5" className="cm-city" />
            )}
            <text
              x={c.x + (c.hub ? 0 : c.labelDx ?? 0)}
              y={c.hub ? c.y - 26 : c.y + (c.labelDy ?? -11)}
              textAnchor="middle"
              className={c.hub ? "cm-label cm-label-hub" : "cm-label"}
            >
              {c.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

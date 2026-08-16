// Stylized North America map with animated Canada→US lanes.
// Cleaner continent silhouette + drawn routes + pulsing hub.

export default function CoverageMap() {
  return (
    <div className="coverage-map" aria-hidden="true">
      <svg viewBox="0 0 640 480" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="laneGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2f5bff" />
            <stop offset="1" stopColor="#5b82ff" />
          </linearGradient>
          <linearGradient id="landGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b2a63" />
            <stop offset="1" stopColor="#111a3d" />
          </linearGradient>
        </defs>

        {/* Subtle dotted texture behind */}
        <g className="cm-dots">
          {Array.from({ length: 10 }).map((_, r) =>
            Array.from({ length: 14 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={40 + c * 42}
                cy={70 + r * 34}
                r="1.5"
                fill="#5b82ff"
                opacity="0.14"
              />
            ))
          )}
        </g>

        {/* North America silhouette (stylized but recognizable):
            Canada broad top, US mainland, Florida, Mexico taper, Great Lakes notch. */}
        <path
          className="cm-continent"
          d="M92 150
             C 120 120, 150 108, 190 104
             C 235 100, 250 118, 300 112
             C 360 104, 400 96, 452 108
             C 500 118, 540 116, 560 140
             C 566 160, 548 172, 520 176
             C 500 178, 486 172, 470 176
             L 452 196
             C 470 200, 486 206, 496 224
             C 508 250, 494 276, 470 300
             C 452 320, 458 344, 442 360
             C 430 372, 414 366, 404 380
             C 396 392, 402 410, 388 420
             C 378 428, 368 420, 366 406
             C 364 388, 372 372, 360 352
             C 348 332, 326 330, 300 330
             C 258 330, 220 340, 180 322
             C 146 306, 128 276, 112 250
             C 98 226, 84 200, 82 176
             C 81 164, 84 156, 92 150 Z"
        />

        {/* Great Lakes hint (dark cut near the hub) */}
        <path
          className="cm-lakes"
          d="M300 175 q22 -6 40 4 q6 12 -6 18 q-24 8 -40 -4 q-4 -12 6 -18 Z"
        />

        {/* Animated lanes (Canada hub → US destinations) */}
        <g fill="none" stroke="url(#laneGrad)" strokeWidth="3" strokeLinecap="round">
          <path className="cm-lane" d="M300 168 C 320 210, 330 240, 344 280" />
          <path className="cm-lane cm-lane-2" d="M300 168 C 250 210, 220 250, 196 300" />
          <path className="cm-lane cm-lane-3" d="M300 168 C 360 190, 430 210, 470 250" />
          <path className="cm-lane cm-lane-4" d="M300 168 C 320 250, 340 320, 360 372" />
        </g>

        {/* Home hub (Brampton / GTA) */}
        <g className="cm-hub">
          <circle cx="300" cy="168" r="20" className="cm-hub-ring" />
          <circle cx="300" cy="168" r="7" fill="#2f5bff" />
          <circle cx="300" cy="168" r="3" fill="#fff" />
        </g>

        {/* Destination pins */}
        <g>
          <circle cx="344" cy="280" r="6" className="cm-pin" />
          <circle cx="196" cy="300" r="6" className="cm-pin" />
          <circle cx="470" cy="250" r="6" className="cm-pin" />
          <circle cx="360" cy="372" r="6" className="cm-pin" />
        </g>
      </svg>
    </div>
  );
}

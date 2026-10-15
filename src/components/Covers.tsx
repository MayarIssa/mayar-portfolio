/**
 * Illustrated covers for projects that don't have a screenshot yet.
 * Each one sketches what the product actually does, in the project's colour.
 */

/** Deterministic maze via recursive backtracking, the same algorithm the game uses. */
function maze(w: number, h: number, seed = 7) {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const seen = new Set<string>();
  const open: [number, number, number, number][] = [];
  const stack: [number, number][] = [[0, 0]];
  seen.add("0,0");
  while (stack.length) {
    const [x, y] = stack[stack.length - 1];
    const next = ([[1, 0], [-1, 0], [0, 1], [0, -1]] as const)
      .map(([dx, dy]) => [x + dx, y + dy] as [number, number])
      .filter(([nx, ny]) => nx >= 0 && ny >= 0 && nx < w && ny < h && !seen.has(`${nx},${ny}`));
    if (!next.length) {
      stack.pop();
      continue;
    }
    const [nx, ny] = next[Math.floor(rand() * next.length)];
    seen.add(`${nx},${ny}`);
    open.push([x, y, nx, ny]);
    stack.push([nx, ny]);
  }
  return open;
}

export function MazeCover({ tint }: { tint: string }) {
  const W = 16, H = 9, c = 20;
  const paths = maze(W, H);
  return (
    <svg viewBox={`-10 -10 ${W * c + 20} ${H * c + 20}`} className="h-full w-full" aria-hidden="true">
      <rect x="-10" y="-10" width={W * c + 20} height={H * c + 20} fill="#0b0b1a" />
      {paths.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1 * c + c / 2} y1={y1 * c + c / 2} x2={x2 * c + c / 2} y2={y2 * c + c / 2} stroke="#2a3bff" strokeWidth="12" strokeLinecap="round" opacity="0.55" />
      ))}
      {paths.map(([, , x2, y2], i) =>
        i % 3 === 0 ? <circle key={`p${i}`} cx={x2 * c + c / 2} cy={y2 * c + c / 2} r="2.2" fill="#ffe9a8" /> : null,
      )}
      <circle cx={c / 2} cy={c / 2} r="7" fill={tint} />
      <g fill="#ff4d8d">
        <path d={`M${7 * c + 3} ${4 * c + 18} v-9 a7 7 0 0 1 14 0 v9 l-3.5 -3 -3.5 3 -3.5 -3z`} />
      </g>
      <g fill="#14ae5c">
        <path d={`M${12 * c + 3} ${6 * c + 18} v-9 a7 7 0 0 1 14 0 v9 l-3.5 -3 -3.5 3 -3.5 -3z`} />
      </g>
    </svg>
  );
}

export function CircuitCover({ tint }: { tint: string }) {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden="true">
      <rect width="320" height="200" fill="#0d1610" />
      <g stroke={tint} strokeWidth="2" fill="none" opacity="0.7">
        <path d="M20 40 H100 V80 H140" />
        <path d="M20 160 H80 V120 H140" />
        <path d="M180 80 H230 V40 H300" />
        <path d="M180 120 H240 V160 H300" />
        <path d="M160 20 V60" />
        <path d="M160 140 V180" />
      </g>
      <rect x="130" y="60" width="60" height="80" rx="6" fill="#16241a" stroke={tint} strokeWidth="2" />
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i} fill={tint}>
          <rect x="122" y={68 + i * 12} width="8" height="4" />
          <rect x="190" y={68 + i * 12} width="8" height="4" />
        </g>
      ))}
      <text x="160" y="104" textAnchor="middle" fontSize="9" fill="#d6ffe5" fontFamily="monospace">ATmega32</text>
      {[[20, 40], [20, 160], [300, 40], [300, 160], [160, 20], [160, 180]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#0d1610" stroke={tint} strokeWidth="2" />
      ))}
    </svg>
  );
}

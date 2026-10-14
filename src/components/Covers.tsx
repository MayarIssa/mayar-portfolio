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

export function DashboardCover({ tint, rtl = false, title }: { tint: string; rtl?: boolean; title: string }) {
  const bars = [62, 80, 45, 92, 70, 85, 58];
  return (
    <div dir={rtl ? "rtl" : "ltr"} className="flex h-full gap-3 bg-[#14141a] p-4 text-[10px] text-white/70">
      <div className="flex w-1/4 flex-col gap-2 rounded-lg bg-white/5 p-3">
        <div className="mb-2 h-3 w-3/4 rounded" style={{ background: tint }} />
        {["الموظفين", "الحضور", "الرواتب", "الطلبات", "التقييمات"].map((t, i) => (
          <div key={t} className={`truncate rounded px-2 py-1 ${i === 2 ? "bg-white/10 text-white" : ""}`}>{rtl ? t : ["Employees", "Attendance", "Payroll", "Requests", "Reviews"][i]}</div>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="font-display text-sm font-bold text-white">{title}</div>
        <div className="grid grid-cols-3 gap-2">
          {["128", "96%", "14"].map((n) => (
            <div key={n} className="rounded-lg bg-white/5 p-2">
              <div className="font-display text-base font-bold text-white">{n}</div>
              <div className="mt-1 h-1.5 w-2/3 rounded bg-white/15" />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-1.5 rounded-lg bg-white/5 p-3">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${b}%`, background: i === 3 ? tint : "rgb(255 255 255 / 0.18)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function StoreCover({ tint }: { tint: string }) {
  const hues = ["#ff7262", "#ffc700", "#14ae5c", "#0d99ff", "#9747ff", "#ff4d8d"];
  return (
    <div className="flex h-full items-center justify-center bg-[#1a1412] p-5">
      <div className="grid grid-cols-3 gap-3">
        {hues.map((h, i) => (
          <div
            key={h}
            className="size-14 rounded-xl border-4 border-white shadow-[0_8px_20px_rgb(0_0_0/0.45)] sm:size-16"
            style={{ background: `linear-gradient(135deg, ${h}, ${hues[(i + 2) % hues.length]})`, transform: `rotate(${[-6, 4, -2, 5, -4, 3][i]}deg)` }}
          />
        ))}
      </div>
      <div className="ml-5 hidden flex-col gap-2 sm:flex">
        <div className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: tint }}>Add to cart</div>
        <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">Coupon: MAGNET10</div>
      </div>
    </div>
  );
}

export function FinanceCover({ tint }: { tint: string }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const inc = [70, 82, 76, 90, 85, 94];
  const out = [40, 35, 52, 38, 44, 36];
  return (
    <div className="flex h-full flex-col bg-[#17150c] p-5 text-white">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-sm font-bold">Building 11</span>
        <span className="font-display text-xl font-extrabold" style={{ color: tint }}>EGP 24,500</span>
      </div>
      <div className="mt-1 text-[10px] text-white/50">Collected this month</div>
      <div className="mt-4 flex min-h-0 flex-1 items-stretch gap-3">
        {months.map((m, i) => (
          <div key={m} className="flex h-full flex-1 flex-col items-center gap-1">
            <div className="flex min-h-0 w-full flex-1 items-end gap-1">
              <div className="flex-1 rounded-t" style={{ height: `${inc[i]}%`, background: tint }} />
              <div className="flex-1 rounded-t bg-white/25" style={{ height: `${out[i]}%` }} />
            </div>
            <span className="text-[9px] text-white/50">{m}</span>
          </div>
        ))}
      </div>
    </div>
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

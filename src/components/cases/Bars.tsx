"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Horizontal bars that grow in when scrolled into view.
 * The axis starts at `min` so small but real differences stay visible; the scale is printed.
 */
export function Bars({ rows, min, max, unit = "%", caption }: { rows: { label: string; value: number; best?: boolean }[]; min: number; max: number; unit?: string; caption: string }) {
  const reduce = useReducedMotion();
  return (
    <figure className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
      <ul className="flex flex-col gap-4">
        {rows.map((r, i) => {
          const pct = ((r.value - min) / (max - min)) * 100;
          return (
            <li key={r.label}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                <span className={r.best ? "font-semibold" : "text-muted"}>{r.label}</span>
                <span className="font-mono tabular-nums" style={r.best ? { color: "var(--tint)" } : undefined}>
                  {r.value.toFixed(2)}
                  {unit}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-panel-2">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: r.best ? "var(--tint)" : "var(--faint)", ...(reduce ? { width: `${pct}%` } : {}) }}
                  initial={reduce ? undefined : { width: 0 }}
                  whileInView={reduce ? undefined : { width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <figcaption className="mt-4 text-xs text-faint">{caption}</figcaption>
    </figure>
  );
}

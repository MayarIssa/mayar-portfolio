"use client";

import type { ReactNode } from "react";

/** A design-tool multiplayer cursor: arrow plus name tag. */
export function CursorArrow({ color, label, className = "" }: { color: string; label: ReactNode; className?: string }) {
  return (
    <span className={`pointer-events-none inline-flex items-start ${className}`} aria-hidden="true">
      <svg width="22" height="24" viewBox="0 0 22 24" className="drop-shadow-[0_2px_4px_rgb(0_0_0/0.4)]">
        <path d="M2 2l17 8.2-7.4 2.1L8.4 20z" fill={color} stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <span
        className="-ml-1 mt-4 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold text-white shadow-lg"
        style={{ background: color }}
      >
        {label}
      </span>
    </span>
  );
}

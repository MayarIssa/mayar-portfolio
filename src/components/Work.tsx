"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useState, type MouseEvent } from "react";
import { categories, projects, type Category, type Project } from "@/content";
import { CircuitCover, DashboardCover, FinanceCover, MazeCover, StoreCover } from "./Covers";

function isReal(url?: string): url is string {
  return !!url && url.startsWith("http");
}

function hostOf(p: Project) {
  if (p.caseStudy && !isReal(p.live)) return `mayar-issa.vercel.app/work/${p.slug}`;
  const url = isReal(p.live) ? p.live : isReal(p.code) ? p.code : undefined;
  return url ? new URL(url).host + (isReal(p.live) ? "" : new URL(url).pathname) : p.slug;
}

function Cover({ project: p }: { project: Project }) {
  if (p.image)
    return (
      <Image
        src={p.image.src}
        alt={p.image.alt}
        fill
        sizes="(min-width: 1024px) 560px, 100vw"
        className={`${p.image.fit === "contain" ? "object-contain bg-white p-2" : "object-cover object-top"} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
      />
    );
  if (p.sample)
    return (
      <div className="grid h-full content-start gap-3 overflow-hidden bg-[#0d0d12] p-5 font-mono text-[11px] leading-relaxed sm:text-[12px]">
        <pre className="whitespace-pre-wrap text-[#67b7ff]">{p.sample.request}</pre>
        <pre className="whitespace-pre-wrap text-[#d6d6e0]">{p.sample.response}</pre>
      </div>
    );
  switch (p.slug) {
    case "nour-hr":
      return <DashboardCover tint={p.tint} rtl title="لوحة التحكم" />;
    case "magnetiq":
      return <StoreCover tint={p.tint} />;
    case "buildfin":
      return <FinanceCover tint={p.tint} />;
    case "pet-feeder":
      return <CircuitCover tint={p.tint} />;
    case "maze-chase":
      return <MazeCover tint={p.tint} />;
    default:
      return <div className="h-full" style={{ background: p.tint }} />;
  }
}

/** A project card that tilts gently towards the pointer. */
function ProjectCard({ project: p, large, span }: { project: Project; large: boolean; span: 2 | 3 | 6 }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...(reduce ? {} : { rotateX: rx, rotateY: ry, transformPerspective: 1000 }), ["--tint" as string]: p.tint }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-panel transition-colors hover:border-[color:var(--tint)] ${span === 6 ? "lg:col-span-6" : span === 3 ? "lg:col-span-3" : "lg:col-span-2"}`}
      aria-labelledby={`${p.slug}-name`}
    >
      <span aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40" style={{ background: p.tint }} />

      <div className="relative m-3 mb-0 overflow-hidden rounded-2xl border border-line bg-canvas">
        <div className="flex items-center gap-2 border-b border-line bg-panel-2 px-3 py-2">
          <span className="flex gap-1" aria-hidden="true">
            <span className="size-2 rounded-full bg-faint/40" />
            <span className="size-2 rounded-full bg-faint/40" />
            <span className="size-2 rounded-full bg-faint/40" />
          </span>
          <span className="truncate font-mono text-[11px] text-muted">{hostOf(p)}</span>
        </div>
        <div className={`relative ${span === 6 ? "aspect-[16/9] lg:aspect-[21/8]" : large ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
          <Cover project={p} />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full px-2 py-0.5 font-semibold text-[#111114]" style={{ background: p.tint }}>{p.kind}</span>
          <span className="text-muted">{p.year}</span>
          {p.team && <span className="text-muted">· {p.team}</span>}
        </div>
        <h3 id={`${p.slug}-name`} className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{p.name}</h3>
        <p className="leading-relaxed text-muted">{p.summary}</p>
        {large && (
          <ul className="mt-1 flex flex-col gap-1.5 text-[15px]">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-2.5 leading-relaxed text-text/85">
                <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full" style={{ background: p.tint }} />
                {pt}
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="Built with">
          {p.stack.map((s) => (
            <li key={s} className="rounded-md border border-line bg-panel-2 px-2 py-0.5 font-mono text-[11px] text-muted">{s}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 pt-1">
          {isReal(p.live) && (
            <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-text px-4 py-2 text-sm font-semibold text-canvas transition hover:bg-blue hover:text-white">
              Live site <span aria-hidden="true">↗</span>
            </a>
          )}
          {p.caseStudy && (
            <Link href={`/work/${p.slug}`} className="group/cs inline-flex items-center gap-1.5 rounded-full bg-text px-4 py-2 text-sm font-semibold text-canvas transition hover:bg-blue hover:text-white">
              {p.slug === "maze-chase" ? "Play it + case study" : p.slug === "pet-feeder" ? "Try the simulator" : "Case study"}
              <span aria-hidden="true" className="transition-transform group-hover/cs:translate-x-0.5">→</span>
            </Link>
          )}
          {isReal(p.code) && (
            <a href={p.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold transition hover:border-text">
              Code <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Column spans on the 6-column grid: large cards take half a row, small ones a third.
 * Leftover small cards are widened so no row ends with a gap.
 */
function layoutSpans(list: Project[], isLarge: (p: Project, i: number) => boolean): (2 | 3 | 6)[] {
  if (list.length === 1) return [6];
  const spans: (2 | 3 | 6)[] = list.map((p, i) => (isLarge(p, i) ? 3 : 2));
  const larges = spans.filter((x) => x === 3).length;
  if (larges % 2 === 1) {
    const lastLarge = spans.lastIndexOf(3);
    spans[lastLarge] = 6;
  }
  const smallIdx = spans.map((x, i) => (x === 2 ? i : -1)).filter((i) => i >= 0);
  const rem = smallIdx.length % 3;
  const widen = rem === 1 ? 4 : rem === 2 ? 2 : 0;
  smallIdx.slice(smallIdx.length - Math.min(widen, smallIdx.length)).forEach((i) => (spans[i] = 3));
  return spans;
}

export function Work() {
  const [filter, setFilter] = useState<Category>("All");
  const shown = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-sm text-blue">/work</p>
          <h2 className="mt-2 font-display text-5xl font-extrabold tracking-[-0.03em] sm:text-6xl">Selected work</h2>
        </div>
        <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-1 rounded-full border border-line bg-panel p-1">
          {categories.map((c) => {
            const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${filter === c ? "text-canvas" : "text-muted hover:text-text"}`}
              >
                {filter === c && <motion.span layoutId="work-filter" className="absolute inset-0 -z-0 rounded-full bg-text" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className="relative">{c} <span className="opacity-60">{count}</span></span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout className="mt-12 grid gap-5 lg:grid-cols-6">
        <AnimatePresence mode="popLayout">
          {(() => {
            const isLarge = (p: Project, i: number) => (filter === "All" ? !!p.featured : i < 2);
            const spans = layoutSpans(shown, isLarge);
            return shown.map((p, i) => <ProjectCard key={p.slug} project={p} large={spans[i] !== 2} span={spans[i]} />);
          })()}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

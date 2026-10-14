"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { profile, projects } from "@/content";
import { CursorArrow } from "./Cursor";

type Mode = "design" | "code";

/** The hero's code view, as coloured tokens: [text, colour]. */
const CODE: [string, string][][] = [
  [["export ", "#ff7ab2"], ["function ", "#ff7ab2"], ["Hero", "#67b7ff"], ["() {", "#d6d6e0"]],
  [["  return (", "#d6d6e0"]],
  [["    <", "#a1a1ae"], ["header ", "#ff7262"], ["className", "#c7f94b"], ["=", "#d6d6e0"], ['"hero"', "#ffc700"], [">", "#a1a1ae"]],
  [["      <", "#a1a1ae"], ["h1", "#ff7262"], [">", "#a1a1ae"], ["Mayar Issa", "#f2f2f5"], ["</", "#a1a1ae"], ["h1", "#ff7262"], [">", "#a1a1ae"]],
  [["      <", "#a1a1ae"], ["Role ", "#67b7ff"], ["design", "#c7f94b"], [" ", ""], ["code", "#c7f94b"], [" />", "#a1a1ae"]],
  [["    </", "#a1a1ae"], ["header", "#ff7262"], [">", "#a1a1ae"]],
  [["  );", "#d6d6e0"]],
  [["}", "#d6d6e0"]],
];
const CODE_LENGTH = CODE.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0) + 1, 0);

/** How much of each line is visible after `shown` characters, and which line the caret is on. */
function typedState(shown: number) {
  let remaining = shown;
  let caretLine = CODE.length - 1;
  let caretFound = false;
  const lines = CODE.map((line, i) => {
    const lineLength = line.reduce((n, [t]) => n + t.length, 0);
    const visible = Math.max(0, Math.min(remaining, lineLength));
    if (!caretFound && remaining <= lineLength && shown < CODE_LENGTH) {
      caretLine = i;
      caretFound = true;
    }
    remaining -= lineLength + 1;

    let left = visible;
    return line.map(([text, color], j) => {
      const part = text.slice(0, Math.max(0, left));
      left -= text.length;
      return part ? (
        <span key={j} style={{ color }}>
          {part}
        </span>
      ) : null;
    });
  });
  return { lines, caretLine };
}

function TypedCode({ playing }: { playing: boolean }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? CODE_LENGTH : 0);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = setInterval(() => setShown((s) => (s >= CODE_LENGTH ? s : s + 2)), 18);
    return () => clearInterval(id);
  }, [playing, reduce]);

  const { lines, caretLine } = typedState(shown);

  return (
    <pre className="font-mono text-[13px] leading-7 sm:text-[15px] sm:leading-8" aria-label="The hero section written as a React component">
      {lines.map((pieces, i) => (
        <div key={i} className="flex">
          <span className="mr-5 w-5 select-none text-right text-faint">{i + 1}</span>
          <span>{pieces}</span>
          {i === caretLine && <span className="caret ml-px inline-block h-5 w-[2px] translate-y-1.5 bg-blue" />}
        </div>
      ))}
    </pre>
  );
}

function DesignView() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex h-full flex-col justify-center">
      <div className="relative mx-auto w-fit">
        <motion.h1
          className="font-display text-[clamp(3.4rem,11vw,9rem)] font-extrabold leading-[0.88] tracking-[-0.045em]"
          initial={reduce ? false : { opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Mayar
          <br />
          <span className="bg-gradient-to-r from-blue via-purple to-pink bg-clip-text text-transparent">Issa</span>
        </motion.h1>

        {/* Selection box that draws itself, with corner handles. */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-4 -inset-y-3 border-[1.5px] border-blue"
          initial={reduce ? false : { clipPath: "inset(0 100% 100% 0)" }}
          animate={{ clipPath: "inset(0 0% 0% 0)" }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        />
        {["-left-[1.3rem] -top-[0.95rem]", "-right-[1.3rem] -top-[0.95rem]", "-bottom-[0.95rem] -left-[1.3rem]", "-bottom-[0.95rem] -right-[1.3rem]"].map((pos, i) => (
          <motion.span
            key={pos}
            aria-hidden="true"
            className={`absolute size-2.5 border-[1.5px] border-blue bg-white ${pos}`}
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.7 + i * 0.07, type: "spring", stiffness: 500, damping: 20 }}
          />
        ))}
        <motion.span
          aria-hidden="true"
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-blue px-1.5 py-0.5 font-mono text-[11px] font-medium text-white"
          initial={reduce ? false : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.05 }}
        >
          Hug × Hug
        </motion.span>

        <motion.div
          className="absolute -bottom-6 -right-10 sm:-right-16"
          initial={reduce ? false : { x: 260, y: 160, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <CursorArrow color="var(--color-pink)" label="Mayar · designing" />
        </motion.div>
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("design");
  const [userTookOver, setUserTookOver] = useState(false);

  // Flip between the design and its code on a slow loop, until the visitor uses the toggle.
  useEffect(() => {
    if (reduce || userTookOver) return;
    const id = setTimeout(() => setMode((m) => (m === "design" ? "code" : "design")), mode === "design" ? 5200 : 6500);
    return () => clearTimeout(id);
  }, [mode, reduce, userTookOver]);

  const choose = (m: Mode) => {
    setUserTookOver(true);
    setMode(m);
  };

  const liveCount = projects.filter((p) => p.live).length;

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(60%_50%_at_50%_0%,rgb(13_153_255/0.18),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          className="mb-6 flex flex-wrap items-center justify-between gap-4"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 text-sm text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-green" />
            </span>
            {profile.status}
          </p>
          <p className="text-sm text-muted">{profile.location}</p>
        </motion.div>

        {/* A design-tool window: the hero as a frame, flipping between design and code. */}
        <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_40px_120px_-40px_rgb(13_153_255/0.35)]">
          <div className="flex items-center justify-between gap-3 border-b border-line bg-panel-2 px-4 py-2.5">
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </span>
              <span className="hidden font-mono text-xs text-muted sm:inline">
                {mode === "design" ? "portfolio.fig — Frame: Hero" : "src/components/Hero.tsx"}
              </span>
            </div>
            <div role="tablist" aria-label="View the hero as" className="relative flex rounded-lg bg-canvas p-1 text-sm">
              {(["design", "code"] as const).map((m) => (
                <button
                  key={m}
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => choose(m)}
                  className={`relative z-10 rounded-md px-3 py-1 font-medium capitalize transition-colors ${mode === m ? "text-white" : "text-muted hover:text-text"}`}
                >
                  {mode === m && (
                    <motion.span layoutId="hero-tab" className="absolute inset-0 -z-10 rounded-md bg-blue" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  )}
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="dot-grid relative h-[23rem] px-6 py-8 sm:h-[27rem] sm:px-12">
            <AnimatePresence mode="wait" initial={false}>
              {mode === "design" ? (
                <motion.div
                  key="design"
                  className="h-full"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                >
                  <DesignView />
                </motion.div>
              ) : (
                <motion.div
                  key="code"
                  className="relative flex h-full items-center justify-center overflow-hidden"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="relative">
                    <TypedCode playing={mode === "code"} />
                    <div className="absolute -bottom-9 -right-6 hidden sm:block">
                      <CursorArrow color="var(--color-blue)" label="Mayar · coding" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <p className="sr-only">Mayar Issa, {profile.role}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{profile.role}</p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">{profile.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-text px-5 py-3 font-semibold text-canvas transition hover:bg-blue hover:text-white">
                See my work
                <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <a href={profile.github} className="rounded-full border border-line px-5 py-3 font-semibold transition hover:border-text">GitHub</a>
              <a href={profile.linkedin} className="rounded-full border border-line px-5 py-3 font-semibold transition hover:border-text">LinkedIn</a>
            </div>
          </motion.div>

          <motion.dl
            className="grid grid-cols-3 gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            {[
              [String(projects.length), "projects"],
              [String(liveCount), "live sites"],
              ["3.76", "GPA"],
            ].map(([n, label]) => (
              <div key={label} className="rounded-xl border border-line bg-panel p-4">
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-3xl font-bold tracking-tight">{n}</dd>
                <dd className="text-sm text-muted">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

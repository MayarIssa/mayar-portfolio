"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { certificates, education, experience, process, profile, skills, stack } from "@/content";
import { CursorArrow } from "./Cursor";
import { Reveal } from "./Reveal";
import { ThemeToggle } from "./ThemeToggle";
import { IconDownload, IconGitHub, IconLinkedIn, IconMail, IconWhatsApp } from "./Icons";

export function SiteHeader() {
  const links = [
    ["Work", "/#work"],
    ["About", "/#about"],
    ["Experience", "/#experience"],
    ["Certificates", "/#certificates"],
    ["Contact", "/#contact"],
  ];
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <header className="fixed inset-x-0 top-3 z-40 flex justify-center px-3">
      <nav aria-label="Main" className="relative flex w-full max-w-3xl items-center justify-between gap-3 overflow-hidden rounded-full border border-line bg-panel/80 py-1.5 pl-4 pr-1.5 backdrop-blur-xl">
        <Link href="/#top" className="font-display text-lg font-bold tracking-tight">
          {profile.name}
        </Link>
        <ul className="flex items-center gap-0.5 text-sm">
          {links.map(([label, href]) => (
            <li key={href} className="hidden md:block">
              <a href={href} className="rounded-full px-3 py-1.5 text-muted transition hover:bg-panel-2 hover:text-text">{label}</a>
            </li>
          ))}
          <li className="ml-1">
            <ThemeToggle />
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className="block rounded-full bg-blue px-4 py-2 font-semibold text-white transition hover:bg-text hover:text-canvas">Hire me</a>
          </li>
        </ul>
        <motion.span aria-hidden="true" className="absolute bottom-0 left-0 h-[2px] origin-left bg-gradient-to-r from-blue via-purple to-pink" style={{ scaleX: width, width: "100%" }} />
      </nav>
    </header>
  );
}

export function StackMarquee() {
  const items = [...stack, ...stack];
  return (
    <div className="marquee relative mt-20 overflow-hidden border-y border-line bg-panel/50 py-5" aria-label="Tools I use">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-canvas to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-canvas to-transparent" />
      <ul className="marquee-track flex w-max gap-10">
        {items.map((s, i) => (
          <li key={i} aria-hidden={i >= stack.length} className="flex items-center gap-10 font-display text-2xl font-bold tracking-tight text-faint">
            {s}
            <span className="size-1.5 rounded-full bg-line" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Process() {
  const colors = ["var(--color-pink)", "var(--color-purple)", "var(--color-blue)", "var(--color-green)"];
  return (
    <section id="process" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-8">
      <Reveal>
        <p className="font-mono text-sm text-pink">/process</p>
        <h2 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
          From the first sketch to the live URL, one person who sees it through.
        </h2>
      </Reveal>
      <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {process.map((p, i) => (
          <Reveal as="li" key={p.step} delay={i * 0.08} className="group relative h-full rounded-2xl border border-line bg-panel p-6 transition-colors hover:bg-panel-2">
              <span className="font-mono text-sm" style={{ color: colors[i] }}>0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight">{p.step}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.detail}</p>
              <span aria-hidden="true" className="absolute inset-x-6 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: colors[i] }} />
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="scroll-mt-24 border-y border-line bg-panel/40 py-28">
      <div className="mx-auto grid max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <Reveal>
            <p className="font-mono text-sm text-green">/experience</p>
            <h2 className="mt-2 font-display text-5xl font-extrabold tracking-[-0.03em] sm:text-6xl">Experience</h2>
          </Reveal>
          <ol ref={ref} className="relative mt-12 flex flex-col gap-10 pl-8">
            <span aria-hidden="true" className="absolute left-[5px] top-2 h-[calc(100%-0.5rem)] w-px bg-line" />
            <motion.span aria-hidden="true" className="absolute left-[5px] top-2 h-[calc(100%-0.5rem)] w-px origin-top bg-gradient-to-b from-blue via-purple to-pink" style={{ scaleY }} />
            {experience.map((e, i) => (
              <Reveal as="li" key={e.role + e.org} delay={i * 0.04} className="relative">
                  <span aria-hidden="true" className="absolute -left-8 top-1.5 size-[11px] rounded-full border-2 border-blue bg-canvas" />
                  <p className="font-mono text-xs text-muted">{e.when}</p>
                  <h3 className="mt-1 text-xl font-semibold">{e.role}</h3>
                  <p className="text-blue">{e.org}</p>
                  <p className="mt-2 max-w-lg leading-relaxed text-muted">{e.detail}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-4 lg:pt-28">
          <Reveal>
            <div className="rounded-2xl border border-line bg-panel p-6">
              <h3 className="font-display text-xl font-bold">Education</h3>
              <p className="mt-3 font-semibold">{education.degree}</p>
              <p className="text-muted">{education.school}, {education.when}</p>
              <p className="mt-2 font-mono text-sm text-green">{education.note}</p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-line bg-panel p-6">
              <h3 className="font-display text-xl font-bold">Skills</h3>
              <dl className="mt-4 flex flex-col gap-4">
                {skills.map((s) => (
                  <div key={s.group}>
                    <dt className="font-mono text-xs text-muted">{s.group}</dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {s.items.map((it) => (
                        <span key={it} className="rounded-full border border-line px-2.5 py-0.5 text-sm transition hover:border-blue hover:text-blue">{it}</span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#certificates" className="group block rounded-2xl border border-line bg-panel p-6 transition hover:border-yellow">
              <h3 className="flex items-center justify-between font-display text-xl font-bold">
                Certificates &amp; awards
                <span aria-hidden="true" className="text-muted transition group-hover:translate-y-0.5 group-hover:text-yellow">↓</span>
              </h3>
              <ul className="mt-3 flex flex-col gap-1 text-muted">
                {certificates.map((c) => (
                  <li key={c.id} className="flex justify-between gap-3">
                    <span>{c.title}</span>
                    <span className="shrink-0 font-mono text-xs leading-6 text-faint">{c.date}</span>
                  </li>
                ))}
              </ul>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-8">
      <Reveal>
        <div className="dot-grid relative overflow-hidden rounded-[2rem] border border-line bg-panel p-8 sm:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-purple/30 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-10 size-80 rounded-full bg-blue/25 blur-3xl" />
          <p className="relative font-mono text-sm text-yellow">/contact</p>
          <h2 className="relative mt-2 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.035em] sm:text-7xl">
            Let&rsquo;s design and build something people love using.
          </h2>
          <p className="relative mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I&rsquo;m looking for a UI/UX or frontend role on a team that ships. Email is the fastest way to reach me.
          </p>
          <div className="relative mt-9 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="rounded-full bg-text px-5 py-3 font-semibold text-canvas transition hover:bg-blue hover:text-white">Email me</a>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(profile.email).then(() => setCopied(true), () => {});
              }}
              className="rounded-full border border-line px-5 py-3 font-mono text-sm transition hover:border-text"
            >
              {copied ? "Copied ✓" : profile.email}
            </button>
            <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-semibold transition hover:border-green hover:text-green"><IconWhatsApp /> WhatsApp</a>
            <a href={profile.cv} download className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-semibold transition hover:border-text"><IconDownload /> Download CV</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-line px-5 py-3 font-semibold transition hover:border-text">LinkedIn ↗</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-full border border-line px-5 py-3 font-semibold transition hover:border-text">GitHub ↗</a>
          </div>
          <span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span>
        </div>
      </Reveal>
      <div className="mt-10 flex justify-center gap-2">
        {[
          { label: "LinkedIn", href: profile.linkedin, Icon: IconLinkedIn },
          { label: "Email", href: `mailto:${profile.email}`, Icon: IconMail },
          { label: "GitHub", href: profile.github, Icon: IconGitHub },
          { label: "WhatsApp", href: profile.whatsapp, Icon: IconWhatsApp },
        ].map(({ label, href, Icon }) => (
          <a key={label} href={href} aria-label={label} title={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-line text-muted transition hover:border-text hover:text-text">
            <Icon />
          </a>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-faint">© 2026 {profile.fullName}. Designed and built by me, with Next.js, Tailwind CSS and Motion.</p>
    </section>
  );
}

/** A small "you" multiplayer cursor that trails the visitor's pointer on desktop. */
export function VisitorCursor() {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onLeave = () => setPos(null);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);
  if (!pos) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
      animate={{ x: pos.x + 14, y: pos.y + 14 }}
      transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.4 }}
    >
      <span className="rounded-full bg-green px-2 py-0.5 text-xs font-semibold text-white shadow-lg">you</span>
    </motion.div>
  );
}

export { CursorArrow };

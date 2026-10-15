"use client";

import Image from "next/image";
import { about, profile } from "@/content";
import { CursorArrow } from "./Cursor";
import { IconDownload } from "./Icons";
import { Reveal } from "./Reveal";

/** Who I am, how I work, and the facts a recruiter looks for, laid out like a Figma properties panel. */
export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-8">
      <Reveal>
        <p className="font-mono text-sm text-purple">/about</p>
        <h2 className="mt-2 font-display text-5xl font-extrabold tracking-[-0.03em] sm:text-6xl">About me</h2>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="relative mx-auto max-w-sm lg:mx-0">
            <div className="overflow-hidden rounded-[2rem] border border-line bg-panel p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-white">
                <Image src="/me.webp" alt={`Portrait of ${profile.fullName}`} fill sizes="(min-width: 1024px) 380px, 90vw" className="object-cover object-top" />
              </div>
              <div className="flex items-center justify-between px-2 pb-1 pt-3">
                <div>
                  <p className="font-display text-xl font-bold">{profile.name}</p>
                  <p className="text-sm text-muted">{profile.role}</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-green/15 px-2.5 py-1 text-xs font-semibold text-green">
                  <span className="size-1.5 rounded-full bg-green" />
                  Available
                </span>
              </div>
            </div>
            <div className="absolute -right-4 top-10 hidden sm:block">
              <CursorArrow color="var(--color-purple)" label="That's me 👋" />
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="h-full rounded-2xl border border-line bg-panel p-6">
                <h3 className="font-display text-xl font-bold">Who I am</h3>
                <p className="mt-3 leading-relaxed text-muted">{about.who}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-line bg-panel p-6">
                <h3 className="font-display text-xl font-bold">My approach</h3>
                <p className="mt-3 leading-relaxed text-muted">{about.approach}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-line bg-panel">
              <div className="flex items-center justify-between border-b border-line bg-panel-2 px-5 py-3">
                <h3 className="font-display text-lg font-bold">Personal details</h3>
                <span className="font-mono text-xs text-faint">properties</span>
              </div>
              <dl className="grid gap-x-8 gap-y-5 p-6 sm:grid-cols-2">
                {about.details.map((d) => (
                  <div key={d.label} className="min-w-0">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">{d.label}</dt>
                    <dd className="mt-1 font-semibold">
                      {d.href ? (
                        <a href={d.href} target={d.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="break-words underline decoration-line underline-offset-4 transition hover:text-blue hover:decoration-blue">
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap items-center gap-3 border-t border-line px-6 py-4">
                <a href={profile.cv} download className="inline-flex items-center gap-2 rounded-full bg-text px-5 py-2.5 font-semibold text-canvas transition hover:bg-blue hover:text-white">
                  <IconDownload /> Download CV
                </a>
                <span className="text-sm text-faint">PDF · 2 pages</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

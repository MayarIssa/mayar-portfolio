import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { BreastCancer } from "@/components/cases/BreastCancer";
import { MazeChase } from "@/components/cases/MazeChase";
import { PetFeeder } from "@/components/cases/PetFeeder";
import { SmartSafe } from "@/components/cases/SmartSafe";
import { Reveal } from "@/components/Reveal";
import { Contact, SiteHeader } from "@/components/Sections";
import { profile, projects } from "@/content";

const pages: Record<string, ReactNode> = {
  "breast-cancer": <BreastCancer />,
  "smart-safe": <SmartSafe />,
  "pet-feeder": <PetFeeder />,
  "maze-chase": <MazeChase />,
};

const caseStudies = projects.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = caseStudies.find((c) => c.slug === slug);
  if (!p) return {};
  const title = `${p.name} — ${profile.name}`;
  return { title, description: p.summary, openGraph: { title, description: p.summary, type: "article" } };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  const p = caseStudies[index];
  if (!p || !pages[slug]) notFound();
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <SiteHeader />
      <main style={{ "--tint": p.tint } as CSSProperties}>
        <div className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] opacity-25 blur-3xl" style={{ background: `radial-gradient(50% 50% at 50% 0%, ${p.tint}, transparent 70%)` }} />
          <article className="relative mx-auto max-w-6xl px-5 pb-10 pt-32 sm:px-8 sm:pt-36">
            <Reveal>
              <Link href="/#work" className="group inline-flex items-center gap-2 text-sm text-muted transition hover:text-text">
                <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">←</span> All work
              </Link>
              <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-full px-2.5 py-0.5 font-semibold text-[#111114]" style={{ background: p.tint }}>{p.kind}</span>
                <span className="text-muted">{p.year}</span>
              </div>
              <h1 className="mt-4 font-display text-[clamp(2.8rem,8vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">{p.name}</h1>
              <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted">{p.summary}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Year", p.year],
                  ["Team", p.team ?? "Solo"],
                  ["My role", p.role],
                  ["Built with", p.stack.join(", ")],
                ].map(([k, v]) => (
                  <div key={k} className="bg-panel p-5">
                    <dt className="font-mono text-xs text-faint">{k}</dt>
                    <dd className="mt-1.5 font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {pages[slug]}

            <Reveal className="mt-28">
              <Link
                href={`/work/${next.slug}`}
                className="group flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-line bg-panel p-8 transition hover:border-[color:var(--next)] sm:p-10"
                style={{ "--next": next.tint } as CSSProperties}
              >
                <div>
                  <p className="font-mono text-sm text-muted">Next project</p>
                  <p className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{next.name}</p>
                  <p className="mt-2 max-w-xl text-muted">{next.summary}</p>
                </div>
                <span aria-hidden="true" className="grid size-14 place-items-center rounded-full text-2xl text-[#111114] transition-transform group-hover:translate-x-1" style={{ background: next.tint }}>
                  →
                </span>
              </Link>
            </Reveal>
          </article>
        </div>
        <Contact />
      </main>
    </>
  );
}

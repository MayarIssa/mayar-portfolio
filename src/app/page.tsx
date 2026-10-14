import Image from "next/image";
import {
  certifications,
  education,
  experience,
  process,
  profile,
  projects,
  skills,
  type Project,
} from "@/content";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <Process />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}

function SiteHeader() {
  const links = [
    ["Work", "#work"],
    ["Experience", "#experience"],
    ["Contact", "#contact"],
  ];
  return (
    <header className="fixed inset-x-0 top-4 z-30 flex justify-center px-4">
      <nav
        aria-label="Main"
        className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-white/40 bg-white/75 py-2 pl-5 pr-2 shadow-[0_8px_30px_rgb(20_22_28/0.12)] backdrop-blur-md"
      >
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          {profile.name}
        </a>
        <ul className="flex items-center gap-1 text-[15px]">
          {links.map(([label, href]) => (
            <li key={href} className="hidden sm:block">
              <a href={href} className="rounded-full px-3 py-1.5 text-muted hover:bg-canvas hover:text-ink">
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${profile.email}`} className="rounded-full bg-ink px-4 py-2 font-semibold text-white hover:bg-select">
              Hire me
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

/** Corner handle of the selection box. */
function Handle({ className, delay }: { className: string; delay: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ animationDelay: delay }}
      className={`select-handle absolute size-3 border-2 border-white bg-select ${className}`}
    />
  );
}

function Hero() {
  return (
    <section className="dot-grid-light relative overflow-hidden rounded-b-[2.5rem] bg-select text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1.35fr_1fr] lg:items-end">
        <div>
          <p className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm">
            <span className="size-2 rounded-full bg-[#7dffb2]" aria-hidden="true" />
            {profile.status}
          </p>

          {/* The name, selected like a layer by a collaborator's cursor. */}
          <div className="relative ml-3 inline-block sm:ml-0">
            <h1 className="font-display text-[clamp(3.6rem,13vw,10rem)] font-extrabold leading-[0.86] tracking-[-0.045em]">
              Mayar
              <br />
              Issa
            </h1>
            <span aria-hidden="true" className="select-box pointer-events-none absolute -inset-x-4 -inset-y-3 border-2 border-white" />
            <Handle className="-left-[1.35rem] -top-[1rem]" delay="1.8s" />
            <Handle className="-right-[1.35rem] -top-[1rem]" delay="1.88s" />
            <Handle className="-bottom-[1rem] -left-[1.35rem]" delay="1.96s" />
            <Handle className="-bottom-[1rem] -right-[1.35rem]" delay="2.04s" />

            <div aria-hidden="true" className="cursor-fly absolute -bottom-12 right-[-3.5rem] sm:-bottom-14 sm:right-[-5rem]">
              <svg width="26" height="28" viewBox="0 0 26 28">
                <path d="M2 2l20 9.5-8.6 2.4L9.6 23z" fill="var(--color-cursor)" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <span className="ml-5 inline-block rounded-md bg-cursor px-2 py-0.5 text-sm font-semibold text-white">Mayar</span>
            </div>
          </div>

          <p className="select-tag mt-14 inline-block rounded bg-white px-2.5 py-1 text-sm font-semibold text-select">
            Software engineer who designs what she builds
          </p>
        </div>

        <div className="flex flex-col gap-7 lg:pb-3">
          <p className="max-w-md text-lg leading-relaxed text-white/90 sm:text-xl">{profile.intro}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#work" className="rounded-full bg-white px-5 py-3 font-semibold text-select hover:bg-ink hover:text-white">
              See my work
            </a>
            <a href={profile.github} className="rounded-full border border-white/40 px-5 py-3 font-semibold hover:bg-white/10">
              GitHub
            </a>
            <a href={profile.linkedin} className="rounded-full border border-white/40 px-5 py-3 font-semibold hover:bg-white/10">
              LinkedIn
            </a>
          </div>
          <p className="text-white/70">{profile.location}</p>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-24 sm:px-8" aria-labelledby="process-title">
      <h2 id="process-title" className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        From the first Figma frame to the live URL, one person who sees it through.
      </h2>
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {process.map((p, i) => (
          <li key={p.step} className="relative rounded-2xl bg-frame p-6 shadow-[0_0_0_1px_var(--color-hair)]">
            <span className="font-display text-sm font-bold text-select">Step {i + 1}</span>
            <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">{p.step}</h3>
            <p className="mt-2 leading-relaxed text-ink/80">{p.detail}</p>
            {i < process.length - 1 && (
              <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden h-0.5 w-6 bg-redline md:block" />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-5xl font-extrabold tracking-[-0.03em] sm:text-6xl">Selected work</h2>
        <p className="max-w-sm text-muted">Live products and real code. Open any of them.</p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

function isReal(url?: string): url is string {
  return !!url && url.startsWith("http");
}

function hostOf(url?: string) {
  return isReal(url) ? new URL(url).host : null;
}

/** A browser window around the screenshot, so a project reads as a real site. */
function BrowserFrame({ project: p }: { project: Project }) {
  const host = hostOf(p.live) ?? hostOf(p.code) ?? p.slug;
  return (
    <div className="overflow-hidden rounded-xl bg-frame shadow-[0_18px_40px_-18px_rgb(20_22_28/0.45),0_0_0_1px_rgb(20_22_28/0.08)] transition-transform duration-300 group-hover:-translate-y-1">
      <div className="flex items-center gap-2 border-b border-hair bg-[#f6f7f9] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-2 truncate rounded bg-white px-2 py-0.5 text-xs text-muted">{host}</span>
      </div>
      {p.image ? (
        <Image
          src={p.image.src}
          alt={p.image.alt}
          width={1440}
          height={900}
          sizes="(min-width: 1024px) 540px, 100vw"
          className="h-auto w-full"
        />
      ) : p.sample ? (
        <div className="grid aspect-[16/10] content-start gap-2 overflow-hidden bg-ink p-5 font-mono text-[12.5px] leading-relaxed text-white/90">
          <pre className="whitespace-pre-wrap text-[#9fb8ff]">{p.sample.request}</pre>
          <pre className="whitespace-pre-wrap">{p.sample.response}</pre>
        </div>
      ) : (
        <div
          className="dot-grid-light flex aspect-[16/10] flex-col justify-between p-6 text-white"
          style={{ background: p.tint }}
        >
          <span className="text-sm text-white/75">{p.kind}</span>
          <span className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">{p.name}</span>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article
      aria-labelledby={`${p.slug}-name`}
      className={`group flex flex-col gap-6 rounded-3xl bg-frame p-5 shadow-[0_0_0_1px_var(--color-hair)] sm:p-7 ${p.featured ? "" : ""}`}
    >
      <div className="rounded-2xl bg-canvas p-4 sm:p-6" style={{ background: `color-mix(in srgb, ${p.tint} 14%, var(--color-canvas))` }}>
        <BrowserFrame project={p} />
      </div>
      <div className="flex flex-col gap-4 px-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 id={`${p.slug}-name`} className="font-display text-3xl font-bold tracking-tight">
            {p.name}
          </h3>
          <span className="text-sm text-muted">
            {p.kind}, {p.year}
          </span>
        </div>
        <p className="text-lg leading-snug">{p.summary}</p>
        <p className="text-sm text-muted">{p.role}</p>
        <ul className="flex flex-col gap-2">
          {p.points.map((pt) => (
            <li key={pt} className="relative pl-5 leading-relaxed text-ink/85">
              <span aria-hidden="true" className="absolute left-0 top-[0.72em] h-0.5 w-2.5 bg-redline" />
              {pt}
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
          {p.stack.map((s) => (
            <li key={s} className="rounded-full bg-select-tint px-2.5 py-0.5 text-sm text-select-deep">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-1 flex flex-wrap gap-2">
          {isReal(p.live) && (
            <a href={p.live} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-select">
              Visit live site
            </a>
          )}
          {isReal(p.code) && (
            <a href={p.code} className="rounded-full border border-hair px-4 py-2 text-sm font-semibold hover:border-ink">
              Read the code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function About() {
  return (
    <section id="experience" className="dot-grid scroll-mt-24 border-y border-hair py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="font-display text-5xl font-extrabold tracking-[-0.03em] sm:text-6xl">Experience</h2>
          <ol className="mt-10 flex flex-col gap-3">
            {experience.map((e) => (
              <li key={e.org + e.role} className="grid gap-1 rounded-2xl bg-frame p-5 shadow-[0_0_0_1px_var(--color-hair)] sm:grid-cols-[9rem_1fr] sm:gap-6 sm:p-6">
                <p className="text-sm font-medium text-select sm:pt-1">{e.when}</p>
                <div>
                  <h3 className="text-lg font-semibold">{e.role}</h3>
                  <p className="text-muted">{e.org}</p>
                  <p className="mt-2 leading-relaxed text-ink/85">{e.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-4 lg:pt-[6.5rem]">
          <div className="rounded-2xl bg-ink p-6 text-white">
            <h2 className="font-display text-2xl font-bold tracking-tight">Education</h2>
            <p className="mt-4 font-semibold">{education.degree}</p>
            <p className="text-white/70">
              {education.school}, {education.when}
            </p>
            <p className="mt-3 leading-relaxed text-white/85">{education.note}</p>
          </div>

          <div className="rounded-2xl bg-frame p-6 shadow-[0_0_0_1px_var(--color-hair)]">
            <h2 className="font-display text-2xl font-bold tracking-tight">Cisco certificates</h2>
            <ul className="mt-4 flex flex-col gap-1.5 leading-relaxed">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-muted">Cisco Networking Academy, 2025</p>
          </div>

          <div className="rounded-2xl bg-frame p-6 shadow-[0_0_0_1px_var(--color-hair)]">
            <h2 className="font-display text-2xl font-bold tracking-tight">Skills</h2>
            <dl className="mt-4 flex flex-col gap-4">
              {skills.map((s) => (
                <div key={s.group}>
                  <dt className="text-sm text-muted">{s.group}</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {s.items.map((i) => (
                      <span key={i} className="rounded-full border border-hair px-2.5 py-0.5 text-sm">
                        {i}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="dot-grid-light relative overflow-hidden rounded-[2rem] bg-select p-8 text-white sm:p-14">
        <h2 className="max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-7xl">
          Let&rsquo;s build something people use.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
          I&rsquo;m looking for a junior software engineering role where I can design and ship real features with a team.
          Email is the fastest way to reach me.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="rounded-full bg-white px-5 py-3 font-semibold text-select hover:bg-ink hover:text-white">
            {profile.email}
          </a>
          <a href={profile.linkedin} className="rounded-full border border-white/40 px-5 py-3 font-semibold hover:bg-white/10">
            LinkedIn
          </a>
          <a href={profile.github} className="rounded-full border border-white/40 px-5 py-3 font-semibold hover:bg-white/10">
            GitHub
          </a>
        </div>
      </div>
      <p className="mt-10 text-center text-sm text-muted">
        © 2026 {profile.fullName}. Built with Next.js and Tailwind CSS.
      </p>
    </section>
  );
}

import Image from "next/image";
import { certifications, education, experience, profile, projects, skills, type Project } from "@/content";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
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
    <header className="sticky top-0 z-20 border-b border-hair/80 bg-canvas/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8" aria-label="Main">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          {profile.name}
        </a>
        <ul className="flex gap-5 text-[15px] text-muted">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="hover:text-ink">
                {label}
              </a>
            </li>
          ))}
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
      className={`select-handle absolute size-2.5 border-[1.5px] border-select bg-frame ${className}`}
    />
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
      <p className="mb-6 text-muted">
        {profile.role} in {profile.location}
      </p>

      {/* Her name, selected like a layer on a design canvas. */}
      <div className="relative ml-3 inline-block sm:ml-0">
        <h1 className="font-display text-[clamp(3.4rem,13vw,10.5rem)] font-bold leading-[0.88] tracking-[-0.04em] [font-stretch:92%]">
          Mayar
          <br />
          Issa
        </h1>
        <span aria-hidden="true" className="select-box pointer-events-none absolute -inset-x-4 -inset-y-3 border-[1.5px] border-select" />
        <Handle className="-left-[1.3rem] -top-[0.95rem]" delay="0.55s" />
        <Handle className="-right-[1.3rem] -top-[0.95rem]" delay="0.65s" />
        <Handle className="-bottom-[0.95rem] -left-[1.3rem]" delay="0.75s" />
        <Handle className="-bottom-[0.95rem] -right-[1.3rem]" delay="0.85s" />
        <span className="select-tag absolute -bottom-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-select px-2 py-0.5 text-sm font-medium text-white">
          Designs it, then builds it
        </span>
      </div>

      <p className="mt-20 max-w-[38rem] text-lg leading-relaxed text-ink/85 sm:text-xl">{profile.intro}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#work" className="rounded-md bg-ink px-4 py-2.5 font-semibold text-white hover:bg-select">
          See my work
        </a>
        <a href={profile.github} className="rounded-md border border-hair bg-frame px-4 py-2.5 font-semibold hover:border-ink">
          GitHub
        </a>
        <a href={profile.linkedin} className="rounded-md border border-hair bg-frame px-4 py-2.5 font-semibold hover:border-ink">
          LinkedIn
        </a>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:px-8">
      <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Selected work</h2>
      <p className="mt-3 max-w-xl text-muted">
        Products I designed, built and shipped. Each one links to the live site or the code.
      </p>
      <div className="mt-14 flex flex-col gap-20">
        {projects.map((p, i) => (
          <ProjectFrame key={p.slug} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function isReal(url?: string): url is string {
  return !!url && url.startsWith("http");
}

function ProjectFrame({ project: p, flip }: { project: Project; flip: boolean }) {
  const hasVisual = !!p.image || !!p.sample;
  return (
    <article aria-labelledby={`${p.slug}-name`}>
      {/* Frame label, the way a design tool names a frame on the canvas. */}
      <p className="mb-2 text-sm text-muted">{p.frame}</p>
      <div className="overflow-hidden rounded-sm bg-frame shadow-[0_0_0_1px_var(--color-hair)]">
        <div className={`grid ${hasVisual ? "lg:grid-cols-[1fr_1.15fr]" : ""}`}>
          <div className={`flex flex-col gap-5 p-6 sm:p-9 ${flip && hasVisual ? "lg:order-2" : ""}`}>
            <div>
              <h3 id={`${p.slug}-name`} className="font-display text-3xl font-bold tracking-tight">
                {p.name}
              </h3>
              <p className="mt-2 text-lg leading-snug">{p.summary}</p>
              <p className="mt-2 text-sm text-muted">{p.role}</p>
            </div>
            <ul className={`flex flex-col gap-2.5 ${hasVisual ? "" : "sm:max-w-2xl"}`}>
              {p.points.map((pt) => (
                <li key={pt} className="relative pl-5 leading-relaxed text-ink/85">
                  <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-redline" />
                  {pt}
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
              {p.stack.map((s) => (
                <li key={s} className="rounded bg-select-tint px-2 py-0.5 text-sm text-select">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-2 font-semibold">
              {isReal(p.live) && (
                <a href={p.live} className="underline decoration-hair decoration-2 underline-offset-4 hover:decoration-select">
                  Visit live site
                </a>
              )}
              {isReal(p.code) && (
                <a href={p.code} className="underline decoration-hair decoration-2 underline-offset-4 hover:decoration-select">
                  Read the code
                </a>
              )}
            </div>
          </div>

          {p.image && (
            <div className={`flex items-center border-hair bg-canvas p-4 sm:p-6 lg:border-l ${flip ? "lg:order-1 lg:border-l-0 lg:border-r" : ""}`}>
              <Image
                src={p.image.src}
                alt={p.image.alt}
                width={1440}
                height={900}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-auto w-full rounded-sm shadow-[0_0_0_1px_var(--color-hair)]"
              />
            </div>
          )}

          {p.sample && (
            <div className={`flex flex-col gap-3 bg-ink p-5 font-mono text-[13px] leading-relaxed text-white/90 sm:p-7 ${flip ? "lg:order-1" : ""}`}>
              <p className="font-sans text-sm text-white/60">Request</p>
              <pre className="overflow-x-auto whitespace-pre text-[#9ec1ff]">{p.sample.request}</pre>
              <p className="mt-2 font-sans text-sm text-white/60">Response</p>
              <pre className="overflow-x-auto whitespace-pre">{p.sample.response}</pre>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function About() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:px-8">
      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Experience</h2>
          <ol className="mt-10 flex flex-col">
            {experience.map((e) => (
              <li key={e.org + e.role} className="grid gap-1 border-t border-hair py-6 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
                <p className="text-sm text-muted sm:pt-1">{e.when}</p>
                <div>
                  <h3 className="text-lg font-semibold">{e.role}</h3>
                  <p className="text-muted">{e.org}</p>
                  <p className="mt-2 leading-relaxed text-ink/85">{e.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-12">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">Education</h2>
            <p className="mt-4 font-semibold">{education.degree}</p>
            <p className="text-muted">
              {education.school}, {education.when}
            </p>
            <p className="mt-2 leading-relaxed text-ink/85">{education.note}</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">Certifications</h2>
            <ul className="mt-4 flex flex-col gap-1.5 leading-relaxed">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-muted">Cisco Networking Academy, 2025</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">Skills</h2>
            <dl className="mt-4 flex flex-col gap-4">
              {skills.map((s) => (
                <div key={s.group}>
                  <dt className="text-sm text-muted">{s.group}</dt>
                  <dd className="mt-1 leading-relaxed">{s.items.join(", ")}</dd>
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
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-24 pt-16 sm:px-8">
      <div className="rounded-sm bg-frame p-8 shadow-[0_0_0_1px_var(--color-hair)] sm:p-12">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Let&rsquo;s work together</h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/85">
          I&rsquo;m looking for a junior software engineering role where I can design and ship real features with a team.
          Email is the fastest way to reach me.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="rounded-md bg-select px-4 py-2.5 font-semibold text-white hover:bg-ink">
            Email me
          </a>
          <a href={profile.linkedin} className="rounded-md border border-hair px-4 py-2.5 font-semibold hover:border-ink">
            LinkedIn
          </a>
          <a href={profile.github} className="rounded-md border border-hair px-4 py-2.5 font-semibold hover:border-ink">
            GitHub
          </a>
        </div>
        <p className="mt-6 text-muted">{profile.email}</p>
      </div>
      <p className="mt-10 text-center text-sm text-muted">
        © 2026 {profile.fullName}. Built with Next.js and Tailwind CSS.
      </p>
    </section>
  );
}

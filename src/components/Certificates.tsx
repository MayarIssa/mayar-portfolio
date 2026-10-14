"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { certificates, type Certificate } from "@/content";
import { Reveal } from "./Reveal";

/** The real certificates, as cards. Clicking one opens the full scan in a viewer. */
export function Certificates() {
  const [open, setOpen] = useState<{ cert: Certificate; index: number } | null>(null);

  return (
    <section id="certificates" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-8">
      <Reveal>
        <p className="font-mono text-sm text-yellow">/certificates</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-5xl font-extrabold tracking-[-0.03em] sm:text-6xl">Certificates &amp; awards</h2>
          <p className="max-w-sm text-muted">The real certificates, not just a list. Click any card to see the full certificate.</p>
        </div>
      </Reveal>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c, i) => (
          <Reveal as="li" key={c.id} delay={(i % 3) * 0.07} className="min-w-0">
            <CertCard cert={c} onOpen={(index) => setOpen({ cert: c, index })} />
          </Reveal>
        ))}
      </ul>

      <Viewer state={open} onChange={setOpen} />
    </section>
  );
}

function CertCard({ cert, onOpen }: { cert: Certificate; onOpen: (index: number) => void }) {
  const stack = cert.images.length > 1;
  return (
    <button
      type="button"
      onClick={() => onOpen(0)}
      aria-label={`View certificate: ${cert.title}, ${cert.issuer}`}
      style={{ "--tint": cert.tint } as CSSProperties}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-panel text-left transition duration-300 hover:-translate-y-1 hover:border-[var(--tint)] hover:shadow-[0_18px_50px_-20px_var(--tint)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tint)]"
    >
      <div className="dot-grid relative grid aspect-[4/3] place-items-center overflow-hidden border-b border-line bg-panel-2 p-6">
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full opacity-25 blur-3xl transition-opacity group-hover:opacity-50" style={{ background: cert.tint }} />
        {stack ? (
          <div className="relative h-full w-full">
            {cert.images.map((img, i) => {
              const spread = (i - (cert.images.length - 1) / 2) * 1;
              return (
                <div
                  key={img.src}
                  className="absolute inset-x-[8%] top-1/2 overflow-hidden rounded-md shadow-[0_10px_30px_rgb(0_0_0/0.35)] ring-1 ring-black/5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] [transform:translateY(-50%)_rotate(var(--r))_translateX(var(--x))] group-hover:[transform:translateY(-50%)_rotate(var(--rh))_translateX(var(--xh))]"
                  style={{ "--r": `${spread * 4}deg`, "--x": `${spread * 4}%`, "--rh": `${spread * 9}deg`, "--xh": `${spread * 14}%`, zIndex: i } as CSSProperties}
                >
                  <Image src={img.src} alt="" width={img.width} height={img.height} sizes="(min-width: 1024px) 300px, 80vw" className="h-auto w-full bg-white" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="relative w-[88%] overflow-hidden rounded-md shadow-[0_10px_30px_rgb(0_0_0/0.35)] ring-1 ring-black/5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-rotate-2 group-hover:scale-[1.04]">
            <Image src={cert.images[0].src} alt="" width={cert.images[0].width} height={cert.images[0].height} sizes="(min-width: 1024px) 320px, 85vw" className="h-auto w-full bg-white" />
          </div>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-canvas/80 px-2.5 py-1 text-xs font-semibold opacity-0 backdrop-blur transition group-hover:opacity-100">View ↗</span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full px-2 py-0.5 font-semibold text-[#111114]" style={{ background: cert.tint }}>{cert.tag}</span>
          <span className="font-mono text-muted">{cert.date}</span>
        </div>
        <h3 className="mt-1 font-display text-xl font-bold leading-tight tracking-tight">{cert.title}</h3>
        <p className="flex items-center gap-2 text-sm font-medium text-text/75"><span aria-hidden="true" className="size-1.5 shrink-0 rounded-full" style={{ background: cert.tint }} />{cert.issuer}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{cert.detail}</p>
      </div>
    </button>
  );
}

function Viewer({
  state,
  onChange,
}: {
  state: { cert: Certificate; index: number } | null;
  onChange: (s: { cert: Certificate; index: number } | null) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (state && !d.open) d.showModal();
    if (!state && d.open) d.close();
  }, [state]);

  const cert = state?.cert;
  const index = state?.index ?? 0;
  const img = cert?.images[index];
  const many = (cert?.images.length ?? 0) > 1;
  const go = (step: number) => {
    if (!cert) return;
    const n = cert.images.length;
    onChange({ cert, index: (index + step + n) % n });
  };

  return (
    <dialog
      ref={ref}
      aria-label={cert ? `${cert.title} certificate` : "Certificate"}
      onClose={() => onChange(null)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onChange(null);
      }}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      style={{ width: `min(92vw, ${img ? Math.max(Math.round(img.width * 1.5), 620) : 900}px)` }}
      className="cert-viewer m-auto max-w-none overflow-visible bg-transparent p-0 text-text backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      {cert && img && (
        <figure className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl">
            <Image key={img.src} src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="92vw" className="h-auto max-h-[75vh] w-full object-contain" />
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-panel px-4 py-3">
            <div className="min-w-0">
              <p className="font-display text-lg font-bold">{cert.title}</p>
              <p className="text-sm text-muted">
                {img.caption ?? `${cert.issuer} · ${cert.date}`}
                {many && <span className="ml-2 font-mono text-faint">{index + 1}/{cert.images.length}</span>}
              </p>
            </div>
            <div className="flex gap-2">
              {many && (
                <>
                  <button type="button" onClick={() => go(-1)} aria-label="Previous certificate" className="grid size-10 place-items-center rounded-full border border-line transition hover:border-text">←</button>
                  <button type="button" onClick={() => go(1)} aria-label="Next certificate" className="grid size-10 place-items-center rounded-full border border-line transition hover:border-text">→</button>
                </>
              )}
              <button type="button" onClick={() => onChange(null)} className="rounded-full bg-text px-4 py-2 text-sm font-semibold text-canvas transition hover:bg-blue hover:text-white" autoFocus>
                Close
              </button>
            </div>
          </figcaption>
        </figure>
      )}
    </dialog>
  );
}

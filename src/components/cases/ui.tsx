import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "../Reveal";

/** A titled block of a case study. */
export function Block({ label, title, children, className = "" }: { label: string; title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`mt-24 ${className}`}>
      <Reveal>
        <p className="font-mono text-sm text-[color:var(--tint)]">{label}</p>
        <h2 className="mt-2 max-w-3xl font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{title}</h2>
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-5">
      <div className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: "var(--tint)" }}>{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}

/** An image from the project's own files, with a caption. White-backed charts sit on white in both themes. */
export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  white = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption: ReactNode;
  width: number;
  height: number;
  white?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <figure className="h-full overflow-hidden rounded-2xl border border-line bg-panel">
        <div className={white ? "bg-white p-3" : ""}>
          <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1024px) 600px, 100vw" className="h-auto w-full" />
        </div>
        <figcaption className="border-t border-line px-4 py-3 text-sm leading-relaxed text-muted">{caption}</figcaption>
      </figure>
    </Reveal>
  );
}

const KEYWORDS = new Set(
  "if else for while do return void int long bool char const String byte uint8_t uint16_t uint32_t private public protected static new using namespace class enum switch case break default foreach in true false var List Point Direction".split(" "),
);

/** Tiny syntax colouring for C, C++ and C#: comments, strings, numbers, keywords, preprocessor. */
function highlight(line: string, key: number) {
  const out: ReactNode[] = [];
  const re = /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)')|(#\w+)|\b(0x[0-9a-fA-F]+|\d+)\b|\b([A-Za-z_]\w*)\b/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const [text, comment, str, pre, num, word] = m;
    const color = comment ? "#7d7d8c" : str ? "#ffc700" : pre ? "#ff7ab2" : num ? "#67b7ff" : word && KEYWORDS.has(word) ? "#ff7ab2" : undefined;
    out.push(color ? <span key={`${key}-${i++}`} style={{ color }}>{text}</span> : text);
    last = m.index + text.length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

/** An editor-style code block. Always dark, like the editor it was written in. */
export function Code({ file, code, start = 1, maxHeight }: { file: string; code: string; start?: number; maxHeight?: string }) {
  const lines = code.replace(/\n$/, "").split("\n");
  return (
    <div data-theme="dark" className="overflow-hidden rounded-2xl border border-line bg-canvas text-text">
      <div className="flex items-center gap-2 border-b border-line bg-panel-2 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-1 font-mono text-xs text-muted">{file}</span>
      </div>
      <pre className="overflow-auto py-4 font-mono text-[12.5px] leading-6" style={maxHeight ? { maxHeight } : undefined} tabIndex={0}>
        {lines.map((l, i) => (
          <div key={i} className="flex pr-4">
            <span className="w-12 shrink-0 select-none pr-4 text-right text-faint">{start + i}</span>
            <code className="whitespace-pre text-[#d6d6e0]">{highlight(l, i)}</code>
          </div>
        ))}
      </pre>
    </div>
  );
}

/** The complete original file, folded away until asked for. */
export function FullSource({ file, code, lines }: { file: string; code: string; lines: number }) {
  return (
    <details className="group mt-6 rounded-2xl border border-line bg-panel">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
        <span>
          Read the full source <span className="font-mono text-sm font-normal text-muted">· {file} · {lines} lines</span>
        </span>
        <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="p-3 pt-0">
        <Code file={file} code={code} maxHeight="34rem" />
      </div>
    </details>
  );
}

/** A green 16×2 character LCD, as used on both hardware projects. */
export function Lcd({ lines, label }: { lines: [string, string]; label: string }) {
  return (
    <div className="rounded-xl bg-[#1d3a8a] p-3 shadow-inner" role="status" aria-label={label} aria-live="polite">
      <div className="rounded-md bg-[#9fe870] px-3 py-2 font-mono text-[15px] leading-6 tracking-[0.12em] text-[#14361a] shadow-[inset_0_2px_6px_rgb(0_0_0/0.35)] sm:text-base">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre">{l.padEnd(16, " ").slice(0, 16)}</div>
        ))}
      </div>
    </div>
  );
}

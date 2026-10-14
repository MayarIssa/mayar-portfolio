"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";

/* Same numbers as Form1.cs: a 35 × 25 grid of 20 px cells. */
const W = 35;
const H = 25;
const C = 20;
const TICK = 95; // ms per move (the original timer ran at 50 ms on a desktop).
const GRACE = 1200; // After a hit, a moment to get away before the next one counts.

const WALL = 1;
const OPEN = 0;
const EATEN = 2;
type Dir = 0 | 1 | 2 | 3; // up, down, left, right
const STEP: [number, number][] = [[0, -1], [0, 1], [-1, 0], [1, 0]];

type Status = "ready" | "carving" | "playing" | "won" | "lost";
type Game = {
  maze: Uint8Array;
  order: number[];
  carved: number;
  pac: number;
  dir: Dir;
  ghosts: number[];
  pellets: number;
  score: number;
  hits: number;
  graceUntil: number;
};

const at = (x: number, y: number) => y * W + x;
const inBounds = (x: number, y: number) => x >= 0 && x < W && y >= 0 && y < H;
const rand = (n: number) => Math.floor(Math.random() * n);

function shuffle<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Recursive backtracking from a random cell, as in GenerateMaze(); iterative here so the carve order can be replayed. */
function generate(): { maze: Uint8Array; order: number[] } {
  const maze = new Uint8Array(W * H).fill(WALL);
  const order: number[] = [];
  const sx = 1 + rand(W - 2);
  const sy = 1 + rand(H - 2);
  maze[at(sx, sy)] = OPEN;
  order.push(at(sx, sy));
  const stack: { x: number; y: number; dirs: Dir[] }[] = [{ x: sx, y: sy, dirs: shuffle([0, 1, 2, 3] as Dir[]) }];
  while (stack.length) {
    const top = stack[stack.length - 1];
    const d = top.dirs.pop();
    if (d === undefined) {
      stack.pop();
      continue;
    }
    const [dx, dy] = STEP[d];
    const nx = top.x + dx * 2;
    const ny = top.y + dy * 2;
    const bx = top.x + dx;
    const by = top.y + dy;
    if (inBounds(nx, ny) && inBounds(bx, by) && maze[at(nx, ny)] === WALL) {
      maze[at(bx, by)] = OPEN;
      maze[at(nx, ny)] = OPEN;
      order.push(at(bx, by), at(nx, ny));
      stack.push({ x: nx, y: ny, dirs: shuffle([0, 1, 2, 3] as Dir[]) });
    }
  }
  return { maze, order };
}

function randomOpen(maze: Uint8Array, avoid?: number) {
  let i: number;
  do i = rand(W * H);
  while (maze[i] !== OPEN || (avoid !== undefined && Math.abs((i % W) - (avoid % W)) + Math.abs(Math.floor(i / W) - Math.floor(avoid / W)) < 10));
  return i;
}

function newGame(): Game {
  const { maze, order } = generate();
  const pac = randomOpen(maze);
  let pellets = 0;
  for (const v of maze) if (v === OPEN) pellets++;
  return { maze, order, carved: 0, pac, dir: 3, ghosts: [randomOpen(maze, pac), randomOpen(maze, pac)], pellets, score: 0, hits: 0, graceUntil: 0 };
}

function draw(ctx: CanvasRenderingContext2D, g: Game | null, status: Status, now: number) {
  ctx.fillStyle = "#05060f";
  ctx.fillRect(0, 0, W * C, H * C);
  if (!g) return;
  const carving = status === "carving";
  const opened = carving ? new Set(g.order.slice(0, g.carved)) : null;

  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = at(x, y);
      const wall = carving ? !opened!.has(i) : g.maze[i] === WALL;
      if (wall) {
        ctx.fillStyle = "#1f35ff";
        ctx.fillRect(x * C, y * C, C, C);
        ctx.fillStyle = "#3a4eff";
        ctx.fillRect(x * C + 3, y * C + 3, C - 6, C - 6);
      } else if (!carving && g.maze[i] === OPEN) {
        ctx.fillStyle = "#ffe9c4";
        ctx.beginPath();
        ctx.arc(x * C + C / 2, y * C + C / 2, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  if (carving) return;

  // Ghosts
  g.ghosts.forEach((gi, n) => {
    const x = (gi % W) * C + C / 2;
    const y = Math.floor(gi / W) * C + C / 2;
    ctx.fillStyle = n === 0 ? "#ff3b3b" : "#ff6fb5";
    ctx.beginPath();
    ctx.arc(x, y - 1, 8, Math.PI, 0);
    ctx.lineTo(x + 8, y + 8);
    for (let k = 0; k < 4; k++) ctx.lineTo(x + 8 - (k + 0.5) * 4, y + (k % 2 ? 8 : 5));
    ctx.lineTo(x - 8, y + 8);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillRect(x - 5, y - 4, 4, 4);
    ctx.fillRect(x + 1, y - 4, 4, 4);
  });

  // Pac-Man, blinking during the grace period after a hit
  if (now < g.graceUntil && Math.floor(now / 120) % 2) return;
  const px = (g.pac % W) * C + C / 2;
  const py = Math.floor(g.pac / W) * C + C / 2;
  const facing = [-Math.PI / 2, Math.PI / 2, Math.PI, 0][g.dir];
  const mouth = status === "playing" ? 0.08 + 0.32 * Math.abs(Math.sin(now / 90)) : 0.3;
  ctx.fillStyle = "#ffd60a";
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.arc(px, py, 9, facing + mouth, facing - mouth + Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

const KEY_DIR: Record<string, Dir> = { ArrowUp: 0, ArrowDown: 1, ArrowLeft: 2, ArrowRight: 3, w: 0, s: 1, a: 2, d: 3, W: 0, S: 1, A: 2, D: 3 };

export function MazeGame() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game | null>(null);
  const statusRef = useRef<Status>("ready");
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [status, setStatusState] = useState<Status>("ready");
  const [hud, setHud] = useState({ score: 0, hits: 0, pellets: 0 });

  const setStatus = useCallback((s: Status) => {
    statusRef.current = s;
    setStatusState(s);
  }, []);

  // Draw continuously; the game logic below only changes the model.
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    el.width = W * C * dpr;
    el.height = H * C * dpr;
    ctx.scale(dpr, dpr);
    let raf = 0;
    const loop = (now: number) => {
      const g = game.current;
      if (g && statusRef.current === "carving") {
        g.carved = Math.min(g.order.length, g.carved + Math.ceil(g.order.length / 70));
        if (g.carved >= g.order.length) setStatus("playing");
      }
      draw(ctx, g, statusRef.current, now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [setStatus]);

  // The game tick, as in Timer_Tick(): move, check ghosts, check pellets, move ghosts.
  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => {
      const g = game.current;
      if (!g) return;
      const [dx, dy] = STEP[g.dir];
      const x = (g.pac % W) + dx;
      const y = Math.floor(g.pac / W) + dy;
      if (inBounds(x, y) && g.maze[at(x, y)] !== WALL) {
        g.pac = at(x, y);
        if (g.maze[g.pac] === OPEN) {
          g.maze[g.pac] = EATEN;
          g.score += 10;
          g.pellets--;
        }
      }
      const now = performance.now();
      if (g.ghosts.includes(g.pac) && now > g.graceUntil) {
        g.score -= 50;
        g.hits++;
        g.graceUntil = now + GRACE;
        if (g.hits >= 3) setStatus("lost");
      }
      if (g.pellets === 0) setStatus("won");
      g.ghosts = g.ghosts.map((gi) => {
        const gx = gi % W;
        const gy = Math.floor(gi / W);
        const options = STEP.map(([sx, sy]) => [gx + sx, gy + sy]).filter(([nx, ny]) => inBounds(nx, ny) && g.maze[at(nx, ny)] !== WALL);
        if (!options.length) return gi;
        const [nx, ny] = options[rand(options.length)];
        return at(nx, ny);
      });
      setHud({ score: g.score, hits: g.hits, pellets: g.pellets });
    }, TICK);
    return () => clearInterval(id);
  }, [status, setStatus]);

  // Arrow keys and WASD while a game is on.
  useEffect(() => {
    if (status !== "playing" && status !== "carving") return;
    const onKey = (e: KeyboardEvent) => {
      const d = KEY_DIR[e.key];
      if (d === undefined || !game.current) return;
      e.preventDefault();
      game.current.dir = d;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status]);

  const start = () => {
    const g = newGame();
    game.current = g;
    setHud({ score: 0, hits: 0, pellets: g.pellets });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) g.carved = g.order.length;
    setStatus(reduce ? "playing" : "carving");
    canvas.current?.focus();
  };

  const steer = (d: Dir) => {
    if (game.current) game.current.dir = d;
  };
  const onTouchStart = (e: TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
    steer(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 3 : 2) : dy > 0 ? 1 : 0);
  };

  const over = status === "won" || status === "lost";

  return (
    <div data-theme="dark" className="overflow-hidden rounded-3xl border border-line bg-canvas text-text">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-panel-2 px-5 py-3 font-mono text-sm">
        <span>
          Score <span className="font-bold text-[#ffd60a]">{hud.score}</span>
        </span>
        <span className="flex items-center gap-1.5" aria-label={`${3 - hud.hits} lives left`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`size-3 rounded-full ${i < 3 - hud.hits ? "bg-[#ffd60a]" : "bg-white/15"}`} />
          ))}
        </span>
        <span className="text-muted">{hud.pellets} pellets left</span>
      </div>

      <div className="relative">
        <canvas
          ref={canvas}
          tabIndex={0}
          aria-label="Maze Chase game board. Use the arrow keys or WASD to steer."
          className="block aspect-[7/5] w-full touch-none outline-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
        {(status === "ready" || over) && (
          <div className="absolute inset-0 grid place-items-center bg-black/65 p-6 text-center backdrop-blur-[2px]">
            <div>
              <p className="font-display text-3xl font-extrabold text-white sm:text-5xl">
                {status === "won" ? "You cleared the maze!" : status === "lost" ? "Game over" : "Maze Chase"}
              </p>
              <p className="mx-auto mt-3 max-w-sm text-white/70">
                {over ? `Final score: ${hud.score}` : "Eat every pellet. Dodge the ghosts: three hits and you're out. Every game carves a brand-new maze."}
              </p>
              <button
                type="button"
                onClick={start}
                className="mt-6 rounded-full bg-[#ffd60a] px-6 py-3 font-bold text-black transition hover:scale-105 hover:bg-white"
              >
                {over ? "Play again" : "Start game"}
              </button>
              <p className="mt-4 text-xs text-white/50">Arrow keys or WASD · swipe on a phone</p>
            </div>
          </div>
        )}
      </div>

      {/* On-screen pad for touch screens */}
      <div className="grid grid-cols-3 gap-2 p-4 pointer-fine:hidden" role="group" aria-label="Direction pad">
        {([["", null], ["↑", 0], ["", null], ["←", 2], ["↓", 1], ["→", 3]] as [string, Dir | null][]).map(([label, d], i) =>
          d === null ? (
            <span key={i} />
          ) : (
            <button key={i} type="button" onClick={() => steer(d)} className="rounded-xl bg-panel-2 py-3 text-xl active:bg-[#ffd60a] active:text-black" aria-label={["Up", "Down", "Left", "Right"][d]}>
              {label}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

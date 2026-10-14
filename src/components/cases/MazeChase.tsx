import { Reveal } from "../Reveal";
import { MazeGame } from "./MazeGame";
import { excerpt, lineCount, mazeChaseSource } from "./sources";
import { Block, Code, FullSource, Stat } from "./ui";

export function MazeChase() {
  const carve = excerpt(mazeChaseSource, "private void RecursiveBacktracking", "RecursiveBacktracking(nextCell);", 3);
  const tick = excerpt(mazeChaseSource, "private void Timer_Tick", "Refresh();", 1);
  return (
    <>
      <Reveal className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat value="35×25" label="cells in every maze" />
        <Stat value="∞" label="different mazes" />
        <Stat value="+10 / −50" label="per pellet / per ghost hit" />
        <Stat value={String(lineCount(mazeChaseSource))} label="lines of C#, no engine" />
      </Reveal>

      <Block label="/play" title="Play it right here">
        <Reveal>
          <p className="mb-6 max-w-3xl text-lg leading-relaxed text-muted">
            The original is a Windows desktop app. So you can play it here, I rebuilt it in TypeScript with the same rules: the same maze algorithm and grid, pellets,
            ghosts and scoring.
          </p>
        </Reveal>
        <MazeGame />
      </Block>

      <Block label="/how" title="A new maze every time, carved by recursive backtracking">
        <div className="grid gap-5 xl:grid-cols-[1fr_1.2fr]">
          <Reveal className="flex flex-col gap-4">
            {[
              ["Start solid", "Every cell begins as wall. Pick a random starting cell and open it."],
              ["Dig two steps", "Shuffle the four directions. For each one, if the cell two steps away is still wall, open it and the cell in between, then dig on from there."],
              ["Back up when stuck", "When no direction is left, the recursion unwinds to the last cell that still has options. The result is a maze where every cell can be reached."],
              ["Fill it with life", "Every open cell gets a pellet. Pac-Man and two ghosts drop onto random open cells, and the timer starts the game loop."],
            ].map(([t, d], i) => (
              <div key={t} className="flex gap-4 rounded-2xl border border-line bg-panel p-5">
                <span className="font-mono text-sm" style={{ color: "var(--tint)" }}>0{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-bold">{t}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{d}</p>
                </div>
              </div>
            ))}
          </Reveal>
          <Code file="Form1.cs · RecursiveBacktracking" code={carve.code} start={carve.start} />
        </div>
      </Block>

      <Block label="/game-loop" title="One timer drives the whole game">
        <Reveal>
          <p className="mb-6 max-w-3xl text-lg leading-relaxed text-muted">
            Each tick moves Pac-Man, checks for ghosts (three hits and it&rsquo;s game over), checks whether the maze is clear, moves the ghosts and redraws everything with
            GDI+.
          </p>
        </Reveal>
        <Code file="Form1.cs · Timer_Tick" code={tick.code} start={tick.start} />
        <FullSource file="WindowsFormsApp1/Form1.cs" code={mazeChaseSource} lines={lineCount(mazeChaseSource)} />
      </Block>
    </>
  );
}

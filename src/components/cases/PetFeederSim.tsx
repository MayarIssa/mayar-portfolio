"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Lcd } from "./ui";

const FOOD_FULL = 10000; // The firmware's load-cell threshold.
const FOOD_MAX = 16000;
const WATER_LOW = 25; // Below this the water sensor reads LOW.
const WATER_FULL = 85;

type Mode = "idle" | "water" | "food";
type State = {
  food: number;
  water: number;
  mode: Mode;
  manual: boolean;
  servo: 0 | 90;
  lcd: [string, string];
  foodOk: boolean;
  waterOk: boolean;
  pump: boolean;
  beep: boolean;
};

const initial: State = {
  food: 12500,
  water: 70,
  mode: "idle",
  manual: false,
  servo: 0,
  lcd: ["Smart Pet Feeder", ""],
  foodOk: true,
  waterOk: true,
  pump: false,
  beep: false,
};

/** One pass of the firmware's main loop (it runs every 500 ms): water first, then food. */
function step(s: State): State {
  if (s.mode === "water") {
    const water = Math.min(100, s.water + 12);
    if (water >= WATER_FULL) return { ...s, water, mode: "idle", pump: false, waterOk: true, beep: false, lcd: ["Water Full!", ""] };
    return { ...s, water, beep: !s.beep };
  }
  if (s.mode === "food") {
    if (s.servo === 0) return { ...s, servo: 90, food: Math.min(FOOD_MAX, s.food + 2600), beep: !s.manual && !s.beep };
    const done = s.manual || s.food >= FOOD_FULL;
    if (done) return { ...s, servo: 0, mode: "idle", manual: false, foodOk: true, beep: false, lcd: ["Food Bowl Full", ""] };
    return { ...s, servo: 0, beep: !s.beep };
  }
  if (s.water < WATER_LOW) return { ...s, mode: "water", pump: true, waterOk: false, beep: true, lcd: ["Water Low!", "Filling Water.."] };
  if (s.food < FOOD_FULL || s.manual) return { ...s, mode: "food", foodOk: false, beep: !s.manual, lcd: ["Low Food!", "Dispensing..."] };
  return s;
}

function Led({ on, color, label }: { on: boolean; color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-white/70">
      <motion.span
        className="size-3 rounded-full"
        animate={{ backgroundColor: on ? color : "#3a3a42", boxShadow: on ? `0 0 10px ${color}` : "0 0 0 transparent" }}
      />
      {label}
    </span>
  );
}

function Bowl({ level, color, label, children }: { level: number; color: string; label: string; children?: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="relative h-24 w-full max-w-40 overflow-hidden rounded-b-[3rem] rounded-t-lg border-4 border-t-0 border-white/25 bg-white/5">
        <motion.div
          className="absolute inset-x-0 bottom-0"
          style={{ background: color }}
          animate={{ height: `${level}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 16 }}
        />
        {children}
      </div>
      <span className="text-xs text-white/70">{label}</span>
    </div>
  );
}

export function PetFeederSim() {
  const [s, setS] = useState(initial);

  useEffect(() => {
    const id = setInterval(() => setS(step), 500);
    return () => clearInterval(id);
  }, []);

  const eat = () => setS((p) => ({ ...p, food: Math.max(0, p.food - 5200) }));
  const drink = () => setS((p) => ({ ...p, water: Math.max(0, p.water - 50) }));
  const manual = () => setS((p) => (p.mode === "idle" ? { ...p, manual: true } : p));

  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-[#15241a] p-5 sm:p-7">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.06)_1px,transparent_0)] bg-[size:20px_20px]" />
        <div className="relative">
          <Lcd lines={s.lcd} label={`Feeder screen: ${s.lcd.join(" ")}`} />

          <div className="mt-6 grid grid-cols-2 gap-6">
            {/* Food: hopper, servo flap, bowl on a load cell */}
            <div className="flex flex-col items-center">
              <div className="relative h-14 w-24 [clip-path:polygon(0_0,100%_0,70%_100%,30%_100%)] bg-[#c58a4a]/80" aria-hidden="true" />
              <motion.div
                aria-hidden="true"
                className="h-1.5 w-10 origin-left rounded-full bg-white/80"
                animate={{ rotate: s.servo === 90 ? 70 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              />
              <div className="relative h-8 w-full" aria-hidden="true">
                {s.servo === 90 &&
                  [0, 1, 2, 3].map((i) => (
                    <motion.span
                      key={i}
                      className="absolute left-1/2 top-0 size-2 rounded-full bg-[#c58a4a]"
                      initial={{ y: 0, x: (i - 1.5) * 6, opacity: 1 }}
                      animate={{ y: 34, opacity: 0.2 }}
                      transition={{ duration: 0.45, delay: i * 0.06 }}
                    />
                  ))}
              </div>
              <Bowl level={(s.food / FOOD_MAX) * 100} color="#c58a4a" label="Food bowl">
                <span aria-hidden="true" className="absolute inset-x-0 top-[37.5%] border-t border-dashed border-white/50" />
              </Bowl>
              <p className="mt-2 font-mono text-[11px] text-white/60">HX711: {s.food.toLocaleString("en-US")}</p>
            </div>

            {/* Water: pump and bowl with a level sensor */}
            <div className="flex flex-col items-center">
              <div className="flex h-14 items-center gap-2" aria-hidden="true">
                <motion.div
                  className="grid size-11 place-items-center rounded-full border-2 border-white/30 font-mono text-[10px] text-white/70"
                  animate={{ rotate: s.pump ? 360 : 0, borderColor: s.pump ? "#4cc3ff" : "rgb(255 255 255 / 0.3)" }}
                  transition={s.pump ? { rotate: { duration: 1, repeat: Infinity, ease: "linear" } } : { duration: 0.3 }}
                >
                  ✻
                </motion.div>
                <span className="font-mono text-[11px] text-white/60">pump {s.pump ? "ON" : "off"}</span>
              </div>
              <div className="relative h-8 w-full" aria-hidden="true">
                {s.pump &&
                  [0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="absolute left-1/2 top-0 h-3 w-1.5 rounded-full bg-[#4cc3ff]"
                      animate={{ y: [0, 30], opacity: [1, 0.2] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.16 }}
                    />
                  ))}
              </div>
              <Bowl level={s.water} color="#4cc3ff" label="Water bowl">
                <span aria-hidden="true" className="absolute inset-x-0 border-t border-dashed border-white/50" style={{ bottom: `${WATER_LOW}%` }} />
              </Bowl>
              <p className="mt-2 font-mono text-[11px] text-white/60">sensor: {s.water < WATER_LOW || s.mode === "water" ? "LOW" : "OK"}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-black/30 px-4 py-3">
            <div className="flex flex-wrap gap-4">
              <Led on={s.foodOk} color="#14ae5c" label="Food OK" />
              <Led on={!s.foodOk} color="#ff4d4d" label="Food low" />
              <Led on={s.waterOk} color="#14ae5c" label="Water OK" />
              <Led on={!s.waterOk} color="#ff4d4d" label="Water low" />
            </div>
            <Led on={s.beep} color="#ffc700" label="Buzzer" />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-5 rounded-3xl border border-line bg-panel p-6">
        <div>
          <h3 className="font-display text-xl font-bold">Be the pet</h3>
          <p className="mt-2 leading-relaxed text-muted">
            Empty a bowl and watch the firmware react: water is checked first, then food. The servo keeps dispensing until the load cell reads 10,000 again, and the buzzer
            beeps while a bowl is low.
          </p>
        </div>
        <div className="grid gap-3">
          <button type="button" onClick={eat} className="rounded-full bg-text px-5 py-3 font-semibold text-canvas transition hover:bg-[color:var(--tint)] hover:text-white">
            Eat some food 🐾
          </button>
          <button type="button" onClick={drink} className="rounded-full bg-text px-5 py-3 font-semibold text-canvas transition hover:bg-[color:var(--tint)] hover:text-white">
            Drink some water 💧
          </button>
          <button
            type="button"
            onClick={manual}
            disabled={s.mode !== "idle"}
            className="rounded-full border border-line px-5 py-3 font-semibold transition enabled:hover:border-text disabled:opacity-40"
          >
            Press the manual-feed button
          </button>
        </div>
        <p className="text-xs leading-relaxed text-faint">The simulator follows the logic of main.cpp. Fill amounts and speeds are illustrative.</p>
      </div>
    </div>
  );
}

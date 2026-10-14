"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Lcd } from "./ui";

const KEYS = ["1", "2", "3", "A", "4", "5", "6", "B", "7", "8", "9", "C", "*", "0", "#", "D"];
const PASS = "2021"; // The predefined password from the firmware.

type Phase = "idle" | "granted" | "locked" | "denied" | "alarm";

/**
 * The safe's firmware logic, running in the browser: same keypad map, same password,
 * same LCD messages, and the siren after three wrong attempts.
 */
export function SafeDemo() {
  const reduce = useReducedMotion();
  const [entered, setEntered] = useState("");
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [attempts, setAttempts] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const after = (ms: number, fn: () => void) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(fn, ms);
  };

  const busy = phase !== "idle";

  const press = (key: string) => {
    if (busy) return;
    if (key === "*") return setEntered((e) => e.slice(0, -1));
    if (key !== "#") return setEntered((e) => (e + key).slice(0, 16));

    // '#' submits, exactly as checkAndProcessPassword() does.
    if (entered === PASS) {
      setOpen(true);
      setAttempts(0);
      setPhase("granted");
      after(2000, () => setPhase("idle"));
    } else if (entered === "") {
      setOpen(false);
      setPhase("locked");
      after(2000, () => setPhase("idle"));
    } else {
      const n = attempts + 1;
      setPhase("denied");
      if (n >= 3) {
        after(1000, () => {
          setPhase("alarm");
          after(2600, () => {
            setAttempts(0);
            setPhase("idle");
          });
        });
      } else {
        setAttempts(n);
        after(1000, () => setPhase("idle"));
      }
    }
    setEntered("");
  };

  const remote = (unlock: boolean) => {
    if (busy) return;
    setOpen(unlock);
  };

  const lcd: [string, string] =
    phase === "granted" ? ["Enter Password: ", "Access Granted"]
    : phase === "locked" ? ["Enter Password: ", "Safe is Locked"]
    : phase === "denied" ? ["Enter Password: ", "Access Denied"]
    : phase === "alarm" ? ["!!  INTRUDER  !!", "3 wrong attempts"]
    : ["Enter Password: ", entered];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
      {/* The safe */}
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-line bg-[#2a2c31] p-5 sm:p-7"
        animate={phase === "alarm" && !reduce ? { x: [0, -5, 5, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.4, repeat: phase === "alarm" ? 5 : 0 }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(120deg,rgb(255_255_255/0.03)_0_2px,transparent_2px_9px)]" />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#ff2a2a]"
          animate={{ opacity: phase === "alarm" ? [0, 0.25, 0] : 0 }}
          transition={{ duration: 0.5, repeat: phase === "alarm" ? Infinity : 0 }}
        />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="grid w-full max-w-[15rem] grid-cols-4 gap-2 self-center rounded-2xl bg-[#1a1b1f] p-3 sm:self-start" role="group" aria-label="Safe keypad">
            {KEYS.map((k) => (
              <motion.button
                key={k}
                type="button"
                onClick={() => press(k)}
                whileTap={{ scale: 0.88 }}
                aria-label={k === "#" ? "Enter" : k === "*" ? "Delete" : k}
                className={`aspect-square rounded-lg font-mono text-lg font-bold shadow-[0_3px_0_rgb(0_0_0/0.5)] transition-colors ${
                  /[A-D]/.test(k) ? "bg-[#d33a3a] text-white hover:bg-[#e04848]" : k === "#" ? "bg-[#14ae5c] text-white hover:bg-[#19c468]" : "bg-[#3d7bd9] text-white hover:bg-[#4b8ae6]"
                }`}
              >
                {k}
              </motion.button>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <Lcd lines={lcd} label={`Safe screen: ${lcd.join(" ")}`} />
            <div className="flex items-center justify-between rounded-xl bg-[#1a1b1f] px-4 py-3 text-sm text-white">
              <span className="flex items-center gap-2">
                <motion.span
                  className="size-3 rounded-full"
                  animate={{ backgroundColor: open ? "#14ae5c" : "#ff4d4d", boxShadow: open ? "0 0 12px #14ae5c" : "0 0 10px #ff4d4d" }}
                />
                Solenoid {open ? "open" : "locked"}
              </span>
              <span className="flex items-center gap-2 text-white/60">
                Buzzer
                <motion.span
                  className="size-3 rounded-full bg-[#ffc700]"
                  animate={{ opacity: phase === "denied" || phase === "alarm" ? [0.2, 1, 0.2] : 0.15 }}
                  transition={{ duration: 0.3, repeat: phase === "denied" || phase === "alarm" ? Infinity : 0 }}
                />
              </span>
            </div>
            {/* The bolt slides back when the relay fires. */}
            <div className="relative h-10 overflow-hidden rounded-xl bg-[#1a1b1f]" aria-hidden="true">
              <motion.div
                className="absolute inset-y-2 left-3 rounded-md bg-gradient-to-r from-[#9aa0a8] to-[#d7dbe0]"
                animate={{ width: open ? "18%" : "70%" }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              />
              <span className="absolute inset-y-0 right-3 flex items-center font-mono text-[11px] text-white/50">{open ? "UNLOCKED" : "LOCKED"}</span>
            </div>
          </div>
        </div>
        <p className="relative mt-5 text-sm text-white/60">
          Try it: the code is <span className="font-mono text-white">2021</span>, <span className="font-mono text-white">*</span> deletes, <span className="font-mono text-white">#</span> enters. Press # with nothing typed to lock. Three wrong codes set off the alarm. Wrong tries so far: {attempts}.
        </p>
      </motion.div>

      {/* The phone */}
      <div className="flex items-center justify-center rounded-3xl border border-line bg-panel p-6">
        <div className="w-full max-w-[16rem] rounded-[2.2rem] border-[6px] border-[#1a1b1f] bg-[#a9a9a9] p-4 pb-8 shadow-xl">
          <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-[#1a1b1f]/40" />
          <p className="font-mono text-[10px] text-[#333]">192.168.1.1 · ESP_AP</p>
          <h3 className="mt-6 text-center text-2xl font-bold text-black">Lock Control</h3>
          <div className="mt-5 flex flex-col gap-3">
            <button type="button" onClick={() => remote(false)} className="rounded bg-[#4caf50] py-2.5 text-lg text-white transition hover:bg-white hover:text-[#4caf50]">
              Lock
            </button>
            <button type="button" onClick={() => remote(true)} className="rounded bg-[#4caf50] py-2.5 text-lg text-white transition hover:bg-white hover:text-[#4caf50]">
              Unlock
            </button>
          </div>
          <p className="mt-5 text-center text-[11px] leading-snug text-[#333]">The page the ESP32 serves over its own Wi-Fi hotspot.</p>
        </div>
      </div>
    </div>
  );
}

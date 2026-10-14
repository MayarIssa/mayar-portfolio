import { Reveal } from "../Reveal";
import { PetFeederSim } from "./PetFeederSim";
import { excerpt, lineCount, petFeederSource } from "./sources";
import { Block, Code, FullSource, Stat } from "./ui";

const pins = [
  ["LCD (4-bit)", "PD0 RS · PD1 E · PD4–PD6, PB3 data"],
  ["HX711 load cell", "PA0 data · PC3 clock"],
  ["Servo (food hatch)", "PD7, software PWM"],
  ["Water sensor / pump", "PB5 in · PB4 out"],
  ["Status LEDs", "PD3, PC0 food · PB7, PD2 water"],
  ["Buzzer", "PC1"],
  ["Manual-feed button", "PC2, debounced"],
];

export function PetFeeder() {
  const hx = excerpt(petFeederSource, "long HX711_read()", "return count;", 1);
  const servo = excerpt(petFeederSource, "void Servo_pulse(", "Servo_pulse(pulse);", 2);
  return (
    <>
      <Reveal className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat value="0" label="Arduino libraries: registers only" />
        <Stat value="24-bit" label="load-cell reads, bit-banged" />
        <Stat value="8 MHz" label="ATmega32 clock" />
        <Stat value={String(lineCount(petFeederSource))} label="lines of C/C++" />
      </Reveal>

      <Block label="/simulator" title="Feed the pet yourself">
        <PetFeederSim />
      </Block>

      <Block label="/how" title="Food and water, each with its own loop">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-line bg-panel p-6">
            <h3 className="font-display text-xl font-bold">Food</h3>
            <p className="mt-2 leading-relaxed text-muted">
              An HX711 amplifier reads the load cell under the bowl. Below the threshold, the LCD shows &ldquo;Low Food!&rdquo;, the red LED lights and the servo swings the
              hatch open and shut, weighing again after every swing until the bowl is full. The manual button dispenses one portion on demand.
            </p>
          </Reveal>
          <Reveal delay={0.06} className="rounded-2xl border border-line bg-panel p-6">
            <h3 className="font-display text-xl font-bold">Water</h3>
            <p className="mt-2 leading-relaxed text-muted">
              A level sensor watches the water bowl. When it reads low, the pump runs and the buzzer keeps beeping until the sensor sees water again. Then the green LED
              comes back on and the LCD says &ldquo;Water Full!&rdquo;.
            </p>
          </Reveal>
        </div>
        <Reveal className="mt-4 overflow-hidden rounded-2xl border border-line bg-panel">
          <table className="w-full text-left text-sm">
            <caption className="px-5 pt-4 text-left font-display text-lg font-bold">Pin map</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Part</th>
                <th scope="col">Pins</th>
              </tr>
            </thead>
            <tbody>
              {pins.map(([part, pin]) => (
                <tr key={part} className="border-t border-line first:border-t-0">
                  <th scope="row" className="px-5 py-3 font-medium">{part}</th>
                  <td className="px-5 py-3 font-mono text-[13px] text-muted">{pin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Block>

      <Block label="/code" title="Talking to the hardware directly">
        <Reveal>
          <p className="mb-6 max-w-3xl text-lg leading-relaxed text-muted">
            No libraries: the load cell is read by clocking its 24 bits in by hand, and the servo is driven by timing each pulse in software.
          </p>
        </Reveal>
        <div className="grid gap-5 xl:grid-cols-2">
          <Code file="main.cpp · HX711_read" code={hx.code} start={hx.start} />
          <Code file="main.cpp · servo" code={servo.code} start={servo.start} />
        </div>
        <FullSource file="SmartPetFeeder/main.cpp" code={petFeederSource} lines={lineCount(petFeederSource)} />
      </Block>
    </>
  );
}

import { Reveal } from "../Reveal";
import { SafeDemo } from "./SafeDemo";
import { Block, Code, Figure, Stat } from "./ui";

const wokwi = [
  { name: "Keypad", src: "/work/smart-safe/wokwi-keypad.webp", w: 490, h: 590, url: "https://wokwi.com/projects/397542144187020289" },
  { name: "I2C LCD", src: "/work/smart-safe/wokwi-lcd.webp", w: 812, h: 463, url: "https://wokwi.com/projects/397541307267098625" },
  { name: "Relay", src: "/work/smart-safe/wokwi-relay.webp", w: 748, h: 454, url: "https://wokwi.com/projects/397542772257858561" },
  { name: "Buzzer", src: "/work/smart-safe/wokwi-buzzer.webp", w: 604, h: 546, url: "https://wokwi.com/projects/397543780330552321" },
];

const keypadCode = `void Keypad()
{
  char key = keypad.getKey();
  if (key) {
    if (key == '#') {
      checkAndProcessPassword(key);
    } else if (key == '*' && enteredPassword.length() > 0) {
      // '*' works as backspace
      enteredPassword.remove(enteredPassword.length() - 1);
      lcd.setCursor(enteredPassword.length(), 1);
      lcd.print(" ");
      lcd.setCursor(enteredPassword.length(), 1);
    } else {
      clearLCD();
      enteredPassword += key;
      lcd.print(enteredPassword);
    }
  }
}

void checkAndProcessPassword(char key) {
  if (checkPassword()) {
    lcd.setCursor(0, 1);
    lcd.print("Access Granted");
    digitalWrite(relayPin, HIGH);   // Open the relay
    delay(2000);
    clearLCD();
    incorrectAttempts = 0;
    deactivateBuzzer();
  }
  else if (checkPassword() == false && key == '#' && enteredPassword == "") {
    lcd.setCursor(0, 1);
    lcd.print("Safe is Locked");
    digitalWrite(relayPin, LOW);
    delay(2000);
    deactivateBuzzer();
    clearLCD();
  }
  else {
    lcd.setCursor(0, 1);
    lcd.print("Access Denied");
    analogWrite(buzzerPin, 255);
    locker();
    delay(1000);
    incorrectAttempts++;
    deactivateBuzzer();
    printLcd();
    if (incorrectAttempts >= 3) {
      activateBuzzer();   // Siren sweep, 500 to 600 Hz
      police();
      delay(1000);
      incorrectAttempts = 0;
      deactivateBuzzer();
      printLcd();
    }
  }
  enteredPassword = "";   // Clear the entered password
}`;

const serverCode = `// The safe runs its own Wi-Fi hotspot and serves a lock page
WiFi.softAP(ssid, password);
WiFi.softAPConfig(local_ip, gateway, subnet);   // 192.168.1.1
server.on("/", handle_OnConnect);
server.on("/Open", handle_Opened);
server.on("/Closed", handle_Closed);
server.onNotFound(handle_NotFound);
server.begin();

void handle_Opened() {
  digitalWrite(relayPin, HIGH);
  server.send(200, "text/html", getHTML());
}

void handle_Closed() {
  digitalWrite(relayPin, LOW);
  server.send(200, "text/html", getHTML());
}`;

export function SmartSafe() {
  return (
    <>
      <Reveal className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat value="4×4" label="keypad, code entry" />
        <Stat value="12 V" label="solenoid lock via relay" />
        <Stat value="3" label="wrong tries trigger the siren" />
        <Stat value="4" label="circuits simulated first" />
      </Reveal>

      <Block label="/demo" title="The finished safe, opening for real">
        <Reveal>
          <figure className="overflow-hidden rounded-3xl border border-line bg-black">
            <video
              className="aspect-video w-full"
              controls
              playsInline
              preload="metadata"
              poster="/work/smart-safe/demo-poster.webp"
              aria-label="Demo video of the smart safe being unlocked with the keypad"
            >
              <source src="/work/smart-safe/demo.mp4" type="video/mp4" />
            </video>
          </figure>
        </Reveal>
      </Block>

      <Block label="/try-it" title="Try the safe yourself">
        <Reveal>
          <p className="mb-6 max-w-3xl text-lg leading-relaxed text-muted">
            This runs the same logic as our ESP32 firmware: the same keypad, password, messages and alarm. The phone on the right is the lock page the safe serves over its own Wi-Fi.
          </p>
        </Reveal>
        <SafeDemo />
      </Block>

      <Block label="/my-part" title="What I did on a team of five">
        <Reveal>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ["Firmware", "Wrote the main safe code: keypad input, password check, LCD messages, relay control and the alarm."],
              ["Remote control", "Wrote the Blynk code for unlocking from a phone. The final build serves its own lock page over Wi-Fi."],
              ["Schematics", "Drew the circuit schematics for the relay and solenoid, the keypad and the I2C LCD."],
              ["Hardware", "Chose the components, then soldered, wired and assembled them into the safe."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-line bg-panel p-5">
                <h3 className="font-display text-lg font-bold">{t}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Block>

      <Block label="/simulate-first" title="Simulated on Wokwi before touching a soldering iron">
        <Reveal>
          <p className="mb-6 max-w-3xl text-lg leading-relaxed text-muted">
            Each part got its own simulation first, so wiring mistakes cost nothing. The links open our original Wokwi projects.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {wokwi.map((w, i) => (
            <Reveal key={w.name} delay={i * 0.06}>
              <a href={w.url} target="_blank" rel="noreferrer" className="group block h-full overflow-hidden rounded-2xl border border-line bg-panel transition hover:border-[color:var(--tint)]">
                <div className="flex aspect-[4/3] items-center justify-center bg-white p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.src} alt={`Wokwi simulation of the ${w.name} circuit on an ESP32`} width={w.w} height={w.h} loading="lazy" className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between px-4 py-3 text-sm font-semibold">
                  {w.name} <span className="text-muted transition group-hover:text-[color:var(--tint)]">Open in Wokwi ↗</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Figure
            src="/work/smart-safe/prototype.webp"
            alt="The prototype on a breadboard: ESP32, relay, solenoid lock, LCD, keypad and battery pack"
            width={1138}
            height={667}
            caption="The breadboard prototype: ESP32, relay, solenoid, I2C LCD, keypad and battery pack."
          />
          <Figure
            src="/work/smart-safe/relay-schematic.webp"
            alt="Schematic of the relay switching a 12-volt battery into the solenoid lock"
            width={914}
            height={575}
            caption="My schematic for the relay stage: the ESP32 switches the relay, which switches 12 V into the solenoid."
          />
        </div>
      </Block>

      <Block label="/code" title="The code behind the keypad">
        <div className="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
          <Code file="smart_safe.ino" code={keypadCode} />
          <div className="flex flex-col gap-5">
            <Code file="smart_safe.ino · web server" code={serverCode} />
            <Reveal>
              <div className="rounded-2xl border border-line bg-panel p-5">
                <h3 className="font-display text-lg font-bold">What went wrong, and the fix</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  ESP32 connectivity, wiring mistakes and keypad bugs cost us time. The fix was reading the exact datasheet for each part and simulating every circuit before
                  wiring it, so we didn&rsquo;t burn out components.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Block>
    </>
  );
}

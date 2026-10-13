"use client";

import { useEffect, useRef } from "react";
import { BOOT_DONE, BOOT_REPLAY } from "@/lib/events";
import { gsap } from "@/lib/gsap";

const LINES = [
  ["mounting /home/farhan", ""],
  ["loading perception module", "dlib"],
  ["starting api server", ":8000"],
  ["deploying to edge", "cloudflare"],
] as const;
const WIDTH = 42; // dot leader pads every line to the same column
const GRID_STEP = 160;
const CHAR_MS = 0.006;

const lineText = ([label, value]: readonly [string, string]) =>
  value ? `${label} ${".".repeat(Math.max(2, WIDTH - label.length - value.length - 2))} ${value}` : label;

/**
 * First-visit intro: boot log types out, the blueprint grid draws outward from the center,
 * then the overlay wipes up. Shown once per session (the pre-paint script in layout.tsx sets
 * html.booting), never under reduced motion, skippable with any key or click. The page renders
 * underneath the whole time. `boot` in the terminal replays it.
 */
export function BootIntro() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    let tl: gsap.core.Timeline | null = null;

    const finish = () => {
      html.classList.remove("booting");
      try {
        sessionStorage.setItem("booted", "1");
      } catch {}
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      window.dispatchEvent(new Event(BOOT_DONE));
    };
    const skip = () => tl?.progress(1);

    const run = () => {
      (window as Window & { __bootStarted?: boolean }).__bootStarted = true;
      const el = root.current!;
      const lines = gsap.utils.toArray<HTMLElement>("[data-boot-line]", el);
      const ready = el.querySelector<HTMLElement>("[data-boot-ready]")!;
      const hLines = gsap.utils.toArray<HTMLElement>("[data-grid-h]", el);
      const vLines = gsap.utils.toArray<HTMLElement>("[data-grid-v]", el);

      tl?.kill();
      gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1 });
      gsap.set(lines, { opacity: 0 });
      gsap.set(ready, { opacity: 0 });
      gsap.set(hLines, { scaleX: 0 });
      gsap.set(vLines, { scaleY: 0 });
      lines.forEach((l) => (l.querySelector("[data-text]")!.textContent = ""));

      tl = gsap.timeline({ onComplete: finish });
      LINES.forEach((line, i) => {
        const target = lines[i].querySelector("[data-text]")!;
        const text = lineText(line);
        const state = { n: 0 };
        tl!
          .set(lines[i], { opacity: 1 })
          .to(state, {
            n: text.length,
            duration: text.length * CHAR_MS,
            ease: "none",
            onUpdate: () => {
              target.textContent = text.slice(0, Math.round(state.n));
            },
          })
          .to({}, { duration: 0.06 });
      });
      tl.set(ready, { opacity: 1 })
        .to({}, { duration: 0.25 })
        // Grid draws outward from the center lines.
        .to(hLines, { scaleX: 1, duration: 0.45, ease: "power2.out", stagger: { each: 0.03, from: "center" } }, "grid")
        .to(vLines, { scaleY: 1, duration: 0.45, ease: "power2.out", stagger: { each: 0.03, from: "center" } }, "grid")
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "power3.inOut" }, "+=0.05")
        .set(el, { autoAlpha: 0 });

      window.addEventListener("keydown", skip);
      window.addEventListener("pointerdown", skip);
    };

    if (html.classList.contains("booting")) run();

    const replay = () => {
      html.classList.add("booting");
      run();
    };
    window.addEventListener(BOOT_REPLAY, replay);
    return () => {
      tl?.kill();
      window.removeEventListener(BOOT_REPLAY, replay);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  // Same 160px major lines as the body background (offset -1px), enough for a large screen.
  const rows = Array.from({ length: 12 }, (_, i) => i);
  const cols = Array.from({ length: 22 }, (_, i) => i);

  return (
    <div ref={root} aria-hidden className="boot-intro fixed inset-0 z-[100] overflow-hidden bg-bg">
      <div className="absolute inset-0">
        {rows.map((i) => (
          <span
            key={`h${i}`}
            data-grid-h
            className="absolute inset-x-0 h-px origin-center bg-[var(--grid-major)]"
            style={{ top: i * GRID_STEP - 1, transform: "scaleX(0)" }}
          />
        ))}
        {cols.map((i) => (
          <span
            key={`v${i}`}
            data-grid-v
            className="absolute inset-y-0 w-px origin-center bg-[var(--grid-major)]"
            style={{ left: i * GRID_STEP - 1, transform: "scaleY(0)" }}
          />
        ))}
      </div>
      <div className="relative flex h-full items-center justify-center px-4">
        <pre className="font-mono text-xs leading-relaxed text-ink sm:text-sm">
          {LINES.map((line) => (
            <div key={line[0]} data-boot-line className="whitespace-pre" style={{ opacity: 0 }}>
              <span className="text-term">[ OK ]</span> <span data-text>{lineText(line)}</span>
            </div>
          ))}
          <div data-boot-ready className="mt-1" style={{ opacity: 0 }}>
            <span className="text-term">&gt;</span> ready<span className="caret">_</span>
          </div>
        </pre>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const BARS = 24;

// A staged MIRA detection pass: scan, a bounding box snaps onto a "car", then the spoken alert's
// waveform pulses. Illustrative, not a recording of the real model.
export function MiraDetection() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, delay: 0.8 });
        tl.fromTo("[data-scan]", { yPercent: -100 }, { yPercent: 1000, duration: 1.1, ease: "none" })
          .fromTo("[data-bbox]", { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" })
          .fromTo("[data-bbox-label]", { opacity: 0 }, { opacity: 1, duration: 0.15 }, "<0.1")
          .fromTo(
            "[data-bar]",
            { scaleY: 0.15 },
            { scaleY: () => gsap.utils.random(0.3, 1), duration: 0.12, repeat: 9, yoyo: true, stagger: { each: 0.02, from: "center" }, ease: "sine.inOut" },
          )
          .to("[data-bbox], [data-bbox-label]", { opacity: 0, duration: 0.3 }, "+=0.4");
      });
    },
    { scope },
  );

  return (
    <figure ref={scope} className="rounded-md border border-rule bg-bg p-4">
      <figcaption className="label-mono mb-3 flex justify-between">
        <span>detection pass · simulated</span>
        <span className="text-term">● frame POST /analyze</span>
      </figcaption>
      <div className="relative aspect-video overflow-hidden rounded border border-rule [background-image:linear-gradient(var(--grid-major)_1px,transparent_1px),linear-gradient(90deg,var(--grid-major)_1px,transparent_1px)] [background-size:24px_24px]">
        {/* Abstract street: road line and a car silhouette */}
        <svg viewBox="0 0 160 90" className="absolute inset-0 h-full w-full" aria-hidden>
          <path d="M0 70 H160" stroke="var(--rule)" strokeWidth="1" />
          <path d="M18 66 v-8 l8 -8 h20 l8 8 h4 v8 z" fill="var(--ink-muted)" opacity="0.6" />
          <circle cx="28" cy="67" r="4" fill="var(--bg)" stroke="var(--ink-muted)" />
          <circle cx="50" cy="67" r="4" fill="var(--bg)" stroke="var(--ink-muted)" />
        </svg>
        <span data-scan aria-hidden className="absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-transparent to-term/40" />
        <span data-bbox aria-hidden className="absolute top-[48%] left-[9%] h-[34%] w-[30%] rounded-sm border-2 border-signal motion-safe:opacity-0" />
        <span
          data-bbox-label
          className="absolute top-[36%] left-[9%] rounded-sm bg-signal px-1.5 py-0.5 font-mono text-[0.65rem] text-bg motion-safe:opacity-0"
        >
          car · left · critical
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="label-mono shrink-0 normal-case">“car on your left”</span>
        <div aria-hidden className="flex h-6 flex-1 items-center gap-[3px]">
          {Array.from({ length: BARS }, (_, i) => (
            <span key={i} data-bar className="h-full flex-1 origin-center scale-y-[0.15] rounded-full bg-accent" />
          ))}
        </div>
      </div>
    </figure>
  );
}

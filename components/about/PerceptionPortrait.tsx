"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// Face-landmark overlay in a 400×500 box (the portrait's 4:5 frame), in the spirit of dlib's 68-point model.
// Positions assume a centered head-and-shoulders crop; nudge CENTER/SCALE once the real portrait is in.
const CENTER = { x: 200, y: 230 };
const SCALE = 1;

type P = [number, number];
const ellipse = (cx: number, cy: number, rx: number, ry: number, from: number, to: number, n: number): P[] =>
  Array.from({ length: n }, (_, i) => {
    const t = from + ((to - from) * i) / (n - 1);
    return [cx + rx * Math.cos(t), cy + ry * Math.sin(t)];
  });

const { x: cx, y: cy } = CENTER;
const s = SCALE;
const landmarks: P[] = [
  ...ellipse(cx, cy, 72 * s, 98 * s, 0.04 * Math.PI, 0.96 * Math.PI, 17), // jaw
  ...ellipse(cx - 32 * s, cy - 32 * s, 22 * s, 8 * s, 1.1 * Math.PI, 1.9 * Math.PI, 5), // left brow
  ...ellipse(cx + 32 * s, cy - 32 * s, 22 * s, 8 * s, 1.1 * Math.PI, 1.9 * Math.PI, 5), // right brow
  ...Array.from({ length: 4 }, (_, i): P => [cx, cy - 18 * s + i * 13 * s]), // nose bridge
  ...Array.from({ length: 5 }, (_, i): P => [cx - 16 * s + i * 8 * s, cy + 30 * s + Math.abs(i - 2) * -2 * s]), // nose base
  ...ellipse(cx - 30 * s, cy - 12 * s, 14 * s, 6 * s, 0, 2 * Math.PI, 7).slice(0, 6), // left eye
  ...ellipse(cx + 30 * s, cy - 12 * s, 14 * s, 6 * s, 0, 2 * Math.PI, 7).slice(0, 6), // right eye
  ...ellipse(cx, cy + 62 * s, 28 * s, 10 * s, 0, 2 * Math.PI, 13).slice(0, 12), // mouth
];
const box = { x: cx - 92 * s, y: cy - 110 * s, w: 184 * s, h: 228 * s };
const bracket = 18;

export function PerceptionPortrait({ children, label }: { children: React.ReactNode; label: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(scope);
        gsap.set(q("[data-overlay]"), { opacity: 1 });
        gsap.set(q("[data-dot]"), { scale: 0, transformOrigin: "50% 50%" });
        gsap.set(q("[data-bbox], [data-bbox-label]"), { opacity: 0 });

        gsap
          .timeline({ scrollTrigger: { trigger: scope.current, start: "top 70%", once: true } })
          .fromTo(q("[data-scan]"), { yPercent: -100, opacity: 1 }, { yPercent: 1000, duration: 1.2, ease: "power1.inOut" })
          .to(q("[data-scan]"), { opacity: 0, duration: 0.2 })
          .to(q("[data-dot]"), { scale: 1, duration: 0.25, ease: "back.out(3)", stagger: { each: 0.012, from: "random" } }, 0.4)
          .fromTo(q("[data-bbox]"), { opacity: 0, scale: 1.25, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, ">-0.1")
          .to(q("[data-bbox-label]"), { opacity: 1, duration: 0.2 }, "<0.15")
          .to(q("[data-overlay]"), { opacity: 0.3, duration: 1, ease: "power2.out" }, "+=0.8");
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className="relative">
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-md">
        <span data-scan className="absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-transparent to-term/40 opacity-0" />
        <svg data-overlay viewBox="0 0 400 500" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-30">
          <g fill="var(--term)">
            {landmarks.map(([x, y], i) => (
              <circle key={i} data-dot cx={x.toFixed(1)} cy={y.toFixed(1)} r="2.2" />
            ))}
          </g>
          <g data-bbox fill="none" stroke="var(--signal)" strokeWidth="2.5">
            <rect x={box.x} y={box.y} width={box.w} height={box.h} strokeOpacity="0.35" strokeWidth="1" />
            {/* Corner brackets */}
            <path
              d={[
                `M${box.x} ${box.y + bracket} V${box.y} H${box.x + bracket}`,
                `M${box.x + box.w - bracket} ${box.y} H${box.x + box.w} V${box.y + bracket}`,
                `M${box.x} ${box.y + box.h - bracket} V${box.y + box.h} H${box.x + bracket}`,
                `M${box.x + box.w - bracket} ${box.y + box.h} H${box.x + box.w} V${box.y + box.h - bracket}`,
              ].join(" ")}
            />
          </g>
          <g data-bbox-label>
            <rect x={box.x} y={box.y - 22} width="104" height="18" fill="var(--signal)" />
            <text x={box.x + 6} y={box.y - 9} fill="var(--bg)" fontSize="11" className="font-mono">
              {label}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

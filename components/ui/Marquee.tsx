"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

const items = ["Python", "TypeScript", "FastAPI", "PyTorch", "React", "Next.js", "Supabase", "PostgreSQL", "Cloudflare Workers", "OpenCV", "Docker", "Raspberry Pi"];

// Infinite marquee. Scrolling speeds it up and leans it in the scroll direction, then it eases back.
// The second copy makes the -50% loop seamless.
export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const loop = gsap.to(track.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
      const setSkew = gsap.quickSetter(track.current, "skewX", "deg");
      // Velocity spikes kick the proxy up; one tween decays it back to rest.
      const proxy = { skew: 0, speed: 1 };

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const skew = gsap.utils.clamp(-8, 8, v / -300);
          const speed = gsap.utils.clamp(1, 6, 1 + Math.abs(v) / 400);
          if (Math.abs(skew) <= Math.abs(proxy.skew) && speed <= proxy.speed) return;
          proxy.skew = skew;
          proxy.speed = speed;
          gsap.to(proxy, {
            skew: 0,
            speed: 1,
            duration: 0.9,
            ease: "power3.out",
            overwrite: true,
            onUpdate: () => {
              setSkew(proxy.skew);
              loop.timeScale(proxy.speed);
            },
          });
        },
      });
    });
  });

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((i) => (
        <li key={i} className="flex items-center gap-8 font-mono text-sm tracking-[0.08em] whitespace-nowrap text-ink-muted uppercase">
          {i}
          <span className="text-accent">·</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="overflow-hidden border-y border-rule py-4" aria-label="Tech I use">
      <div ref={track} className="flex w-max will-change-transform">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

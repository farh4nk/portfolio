"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

// The "pen" sits 60% down the viewport: the wire tip, node lighting and log typing all key off that line.
const PEN = "top 60%";

export function TimelineMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const list = scope.current!.querySelector("ol")!;
        const wire = scope.current!.querySelector("[data-wire-progress]");

        gsap.fromTo(
          wire,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: PEN, end: "bottom 60%", scrub: true } },
        );

        for (const role of gsap.utils.toArray<HTMLElement>("[data-role]", scope.current)) {
          const node = role.querySelector("[data-node]");
          const fill = role.querySelector("[data-node-fill]");
          const ring = role.querySelector("[data-node-ring]");
          const heading = role.querySelectorAll("h3, h3 + p, [data-role-dates]");
          const logs = role.querySelectorAll("[data-log]");

          gsap.set(heading, { opacity: 0, x: -12 });
          gsap.set(logs, { opacity: 0 });
          gsap.set(node, { scale: 0.6 });
          gsap.set(fill, { scale: 0 });

          const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          tl.to(node, { scale: 1, duration: 0.3, ease: "back.out(3)" })
            .to(fill, { scale: 1, duration: 0.3, ease: "back.out(2)" }, 0)
            .fromTo(ring, { scale: 1, opacity: 0.9 }, { scale: 2.8, opacity: 0, duration: 0.9 }, 0)
            .to(heading, { opacity: 1, x: 0, duration: 0.5, stagger: 0.06 }, 0.05)
            // Each log line "types" in: a stepped left-to-right clip, like a terminal printing it.
            .fromTo(
              logs,
              { opacity: 1, clipPath: "inset(0 100% 0 0)" },
              { clipPath: "inset(0 0% 0 0)", duration: 0.45, ease: "steps(24)", stagger: 0.18 },
              0.25,
            );

          ScrollTrigger.create({
            trigger: role,
            start: PEN,
            once: true,
            onEnter: () => tl.play(),
          });
        }
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}

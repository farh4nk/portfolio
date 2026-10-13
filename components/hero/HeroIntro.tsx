"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, SCRAMBLE_CHARS, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Hero entrance: kicker scrambles in, the name's characters slide up out of a line mask,
 * then [data-hero-item] elements fade up in order. Phase 5's boot intro will start this timeline.
 */
export function HeroIntro({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const name = scope.current!.querySelector<HTMLElement>("[data-hero-name]")!;
        const kicker = scope.current!.querySelector<HTMLElement>("[data-hero-kicker]");
        const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]", scope.current);
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (kicker) {
          tl.to(kicker, { duration: 0.8, scrambleText: { text: kicker.textContent ?? "", chars: SCRAMBLE_CHARS, speed: 0.6 } }, 0);
        }

        // autoSplit re-splits on resize and font load; returning the tween keeps it in sync.
        SplitText.create(name, {
          type: "lines,chars",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(name, { visibility: "visible" });
            return gsap.from(self.chars, { yPercent: 110, duration: 0.9, ease: "power4.out", stagger: 0.03, delay: 0.1 });
          },
        });

        tl.fromTo(
          items,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
          0.55,
        );
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}

"use client";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";

// Lenis on desktop pointers only; touch devices and reduced motion keep native scrolling.
export function SmoothScroll() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
      // Lenis is only downloaded where it runs: desktop pointers with full motion.
      let teardown: (() => void) | null = null;
      let cancelled = false;
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        const lenis = new Lenis({ autoRaf: false, anchors: { offset: -80 } });
        const raf = (time: number) => lenis.raf(time * 1000);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
        setLenis(lenis);
        // Lenis cancels the native jump, which would also move the keyboard focus point. Move it
        // ourselves so the next Tab continues from the section, not the nav.
        const onClick = (e: MouseEvent) => {
          const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
          const target = link && document.getElementById(link.hash.slice(1));
          if (!target) return;
          if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
          target.focus({ preventScroll: true });
        };
        document.addEventListener("click", onClick);
        teardown = () => {
          document.removeEventListener("click", onClick);
          setLenis(null);
          gsap.ticker.remove(raf);
          gsap.ticker.lagSmoothing(500, 33);
          lenis.destroy();
        };
      });
      return () => {
        cancelled = true;
        teardown?.();
      };
    });
  });

  return null;
}

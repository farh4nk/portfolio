"use client";

import Lenis from "lenis";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";

// Lenis on desktop pointers only; touch devices and reduced motion keep native scrolling.
export function SmoothScroll() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
      const lenis = new Lenis({ autoRaf: false, anchors: { offset: -80 } });
      const raf = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
      return () => {
        setLenis(null);
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
      };
    });
  });

  return null;
}

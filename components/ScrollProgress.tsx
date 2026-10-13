"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// 1px cyan hairline across the top, scrubbed to page scroll. Not motion-gated: it tracks input 1:1.
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } },
    );
  });

  return <div ref={bar} aria-hidden className="fixed inset-x-0 top-0 z-50 h-px origin-left scale-x-0 bg-accent" />;
}

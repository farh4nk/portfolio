"use client";

import { whenBooted } from "@/lib/events";
import { gsap, MOTION_OK, SCRAMBLE_CHARS, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Page-wide scroll motion, driven by data attributes so server components stay server components:
 *   [data-reveal]         fades up when it enters view, batched with its neighbors
 *   [data-scramble]       mono label that decodes from random characters on first view
 *   [data-split-words]    heading whose words rise out of a mask one after another
 */
export function PageMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // Reveals. Anything already scrolled past (e.g. reload mid-page) shows immediately.
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const passed = reveals.filter((el) => el.getBoundingClientRect().bottom < 0);
      if (passed.length) gsap.set(passed, { opacity: 1, y: 0 });
      ScrollTrigger.batch(
        reveals.filter((el) => !passed.includes(el)),
        {
          start: "top 90%",
          once: true,
          // Anything in view at load waits for the boot intro, so it isn't revealed under the overlay.
          onEnter: (batch) =>
            whenBooted(() =>
              gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08, overwrite: true }),
            ),
        },
      );

      for (const el of gsap.utils.toArray<HTMLElement>("[data-scramble]")) {
        const text = el.textContent ?? "";
        gsap.to(el, {
          duration: 0.9,
          scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.6 },
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      }

      for (const el of gsap.utils.toArray<HTMLElement>("[data-split-words]")) {
        SplitText.create(el, {
          type: "words",
          mask: "words",
          wordsClass: "split-word",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(el, { visibility: "visible" });
            return gsap.from(self.words, {
              yPercent: 110,
              duration: 0.8,
              ease: "power4.out",
              stagger: 0.12,
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            });
          },
        });
      }
    });
  });

  return null;
}

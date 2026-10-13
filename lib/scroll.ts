"use client";

import type Lenis from "lenis";

// The active Lenis instance (desktop pointers with full motion only), so other components can
// scroll programmatically and pause scrolling under overlays.
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

const HEADER_OFFSET = 80;

export function scrollToElement(el: Element) {
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -HEADER_OFFSET });
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}

/** Locks page scroll (used by full-screen overlays). */
export function lockScroll(locked: boolean) {
  if (locked) {
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "";
    lenis?.start();
  }
}

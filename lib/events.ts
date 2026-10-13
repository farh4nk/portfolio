"use client";

// Cross-component signals for the boot intro and terminal.
export const BOOT_DONE = "boot:done";
export const BOOT_REPLAY = "boot:replay";
export const TERMINAL_OPEN = "terminal:open";
/** detail: hackathon order number to expand in the hackathon strip. */
export const HACKATHON_OPEN = "hackathon:open";

/** Runs fn once the boot intro has finished (immediately if it isn't showing). Returns a cancel function. */
export function whenBooted(fn: () => void): () => void {
  if (!document.documentElement.classList.contains("booting")) {
    fn();
    return () => {};
  }
  const handler = () => fn();
  window.addEventListener(BOOT_DONE, handler, { once: true });
  return () => window.removeEventListener(BOOT_DONE, handler);
}

export function openTerminal() {
  window.dispatchEvent(new Event(TERMINAL_OPEN));
}

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

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName));

/** ` or ⌘K / Ctrl+K. A backtick typed into a form field doesn't count, except in the terminal's own input. */
export function isTerminalShortcut(e: KeyboardEvent, terminalInput: HTMLElement | null = null) {
  const combo = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
  const tick = e.key === "`" && !e.metaKey && !e.ctrlKey && !e.altKey;
  return combo || (tick && (!isTyping(e.target) || e.target === terminalInput));
}

export function openTerminal() {
  window.dispatchEvent(new Event(TERMINAL_OPEN));
}

export const RESUME_OPEN = "resume:open";

/** The in-page PDF preview is desktop-only: mobile browsers don't render PDFs in iframes. */
export function canPreviewResume() {
  return window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches;
}

/** Opens the resume preview, or the PDF in a new tab where previews don't work. */
export function openResume(href: string) {
  if (canPreviewResume()) window.dispatchEvent(new CustomEvent(RESUME_OPEN, { detail: href }));
  else window.open(href, "_blank", "noreferrer");
}

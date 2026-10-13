"use client";

// Case files open from several places (bento cards, hackathon strip, later the terminal).
// The URL hash (#work/<slug>) is the source of truth; this module pushes it and remembers
// which element the overlay should morph out of and back into.

export const CASEFILE_EVENT = "casefile:change";

let source: HTMLElement | null = null;
let swapping = false;

export function caseFileSource() {
  return source && source.isConnected ? source : null;
}

export function slugFromHash(hash = window.location.hash): string | null {
  const m = /^#work\/([\w-]+)$/.exec(hash);
  return m ? m[1] : null;
}

export function openCaseFile(slug: string, from?: HTMLElement | null) {
  source = from ?? document.querySelector<HTMLElement>(`article[data-project="${slug}"]`);
  history.pushState({ caseFile: slug }, "", `#work/${slug}`);
  window.dispatchEvent(new Event(CASEFILE_EVENT));
}

/** Replace the open case file with another, without adding a history entry. */
export function swapCaseFile(slug: string) {
  source = document.querySelector<HTMLElement>(`article[data-project="${slug}"]`);
  swapping = true;
  history.replaceState({ caseFile: slug }, "", `#work/${slug}`);
  window.dispatchEvent(new Event(CASEFILE_EVENT));
}

/** True once after a swap, so the incoming file crossfades instead of morphing from its card. */
export function consumeSwap() {
  const was = swapping;
  swapping = false;
  return was;
}

export function closeCaseFile() {
  // If we pushed the entry, Back keeps history clean; on a direct visit, rewrite the hash instead.
  if (history.state?.caseFile) {
    history.back();
  } else {
    history.replaceState(null, "", "#work");
    window.dispatchEvent(new Event(CASEFILE_EVENT));
  }
}

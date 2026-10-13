"use client";

import { useRef, useState } from "react";
import { gsap, SCRAMBLE_CHARS } from "@/lib/gsap";

const IDLE = "[ copy ]";
const DONE = "copied ✓";

export function CopyEmail({ email }: { email: string }) {
  const label = useRef<HTMLSpanElement>(null);
  const reset = useRef<gsap.core.Tween | null>(null);
  const [copied, setCopied] = useState(false);

  // Scrambles between labels; reduced motion swaps the text instantly.
  function swapLabel(text: string) {
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(label.current, {
      duration: instant ? 0 : 0.5,
      scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.8 },
      overwrite: true,
    });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    swapLabel(DONE);
    reset.current?.kill();
    reset.current = gsap.delayedCall(1.8, () => {
      setCopied(false);
      swapLabel(IDLE);
    });
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-full max-w-full items-center justify-between gap-4 rounded-md border border-rule bg-bg-raised px-4 py-4 text-left hover:border-accent sm:w-auto sm:px-6"
    >
      <span className="truncate font-mono text-base text-ink sm:text-xl">{email}</span>
      <span ref={label} aria-hidden className="label-mono shrink-0 whitespace-nowrap text-accent">
        {IDLE}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied to clipboard" : "Copy email"}
      </span>
    </button>
  );
}

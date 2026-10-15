"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { RESUME_OPEN } from "@/lib/events";
import { gsap } from "@/lib/gsap";
import { lockScroll } from "@/lib/scroll";

const INERT_TARGETS = "body > header, body > main, body > footer";

/**
 * Desktop overlay that shows resume.pdf in the browser's PDF viewer, with download and
 * open-in-tab actions. Opened by ResumeLink and the terminal; Esc, the backdrop or ✕ closes it.
 */
export function ResumePreview() {
  const [href, setHref] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const show = (e: Event) => {
      opener.current = document.activeElement as HTMLElement | null;
      setHref((e as CustomEvent<string>).detail);
      setOpen(true);
    };
    window.addEventListener(RESUME_OPEN, show);
    return () => window.removeEventListener(RESUME_OPEN, show);
  }, []);

  // Fade and lift in; reverse out, then unmount.
  useLayoutEffect(() => {
    if (!href) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (open) {
      gsap.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: reduced ? 0 : 0.25 });
      gsap.fromTo(
        panel.current,
        { y: 32, scale: 0.98 },
        { y: 0, scale: 1, duration: reduced ? 0 : 0.45, ease: "power3.out" },
      );
      // Starts at visibility:hidden; focus once it's visible.
      const focusClose = gsap.delayedCall(0.05, () => closeButton.current?.focus({ preventScroll: true }));
      return () => {
        focusClose.kill();
      };
    }
    const tl = gsap
      .timeline({ onComplete: () => setHref(null) })
      .to(panel.current, { y: 24, duration: reduced ? 0 : 0.2, ease: "power2.in" })
      .to(root.current, { autoAlpha: 0, duration: reduced ? 0 : 0.2 }, 0);
    return () => {
      tl.kill();
    };
  }, [open, href]);

  // Modal while mounted: page inert, scroll locked, Esc closes, focus returns to the opener.
  useEffect(() => {
    if (!href) return;
    const background = document.querySelectorAll<HTMLElement>(INERT_TARGETS);
    background.forEach((el) => (el.inert = true));
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      background.forEach((el) => (el.inert = false));
      lockScroll(false);
      opener.current?.focus({ preventScroll: true });
    };
  }, [href]);

  if (!href) return null;
  const close = () => setOpen(false);
  const action = "label-mono rounded border border-rule px-3 py-1.5 text-ink hover:border-accent hover:text-accent";

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="invisible fixed inset-0 z-[60] grid place-items-center p-4 lg:p-8"
    >
      <div aria-hidden onClick={close} className="absolute inset-0 bg-bg/70 backdrop-blur-sm" />
      <div
        ref={panel}
        className="relative flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-md border border-rule bg-bg-raised"
      >
        <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3">
          <p id="resume-title" className="label-mono">
            <span className="text-accent">preview</span> · resume.pdf
          </p>
          <div className="flex items-center gap-2">
            <a href={href} download="Farhan-Khan-Resume.pdf" className={action}>
              [ download ↓ ]
            </a>
            <a href={href} target="_blank" rel="noreferrer" className={action}>
              [ open ↗ ]
            </a>
            <button ref={closeButton} type="button" onClick={close} aria-label="Close resume preview" className={action}>
              [ esc ✕ ]
            </button>
          </div>
        </div>
        <iframe src={`${href}#view=FitH&navpanes=0`} title="Farhan Khan's resume" className="w-full flex-1 bg-white" />
      </div>
    </div>
  );
}

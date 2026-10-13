"use client";

import { useEffect, useRef, useState } from "react";

type Phase = { kind: "idle" } | { kind: "wait" } | { kind: "go"; at: number } | { kind: "early" } | { kind: "hit"; ms: number };

// Brain Invaders' core mechanic in miniature: hold fire until the window opens, then react fast.
export function ReactionDrill() {
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [best, setBest] = useState<number | null>(null);
  const timer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function fire() {
    window.clearTimeout(timer.current);
    if (phase.kind === "wait") {
      setPhase({ kind: "early" });
      return;
    }
    if (phase.kind === "go") {
      const ms = Math.round(performance.now() - phase.at);
      setPhase({ kind: "hit", ms });
      setBest((b) => (b === null ? ms : Math.min(b, ms)));
      return;
    }
    setPhase({ kind: "wait" });
    timer.current = window.setTimeout(() => setPhase({ kind: "go", at: performance.now() }), 1200 + Math.random() * 2800);
  }

  const view = {
    idle: { label: "[ start ]", note: "Wait for the window to open, then fire.", tone: "border-rule text-ink" },
    wait: { label: "hold…", note: "Don't shoot yet.", tone: "border-rule text-ink-muted" },
    go: { label: "FIRE!", note: "Now!", tone: "border-term bg-term/15 text-term" },
    early: { label: "premature input", note: "Too early. That's what the game trains. Click to retry.", tone: "border-signal text-signal" },
    hit: { label: phase.kind === "hit" ? `${phase.ms} ms` : "", note: "Reaction time. Click to go again.", tone: "border-accent text-accent" },
  }[phase.kind];

  return (
    <figure className="rounded-md border border-rule bg-bg p-4">
      <figcaption className="label-mono mb-3 flex justify-between">
        <span>try it: timing window</span>
        <span>best: {best === null ? "--" : `${best} ms`}</span>
      </figcaption>
      <button
        type="button"
        onPointerDown={(e) => {
          e.preventDefault();
          fire();
        }}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            fire();
          }
        }}
        className={`grid aspect-video w-full place-items-center rounded border-2 font-mono text-2xl transition-colors ${view.tone}`}
      >
        {view.label}
      </button>
      <p className="mt-3 text-sm text-ink-muted" aria-live="polite">
        {view.note}
      </p>
    </figure>
  );
}

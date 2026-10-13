"use client";

import { useEffect, useState } from "react";
import type { HackathonEntry } from "@/content/projects";
import { hackathons } from "@/content/projects";
import { openCaseFile } from "@/lib/casefile";
import { HACKATHON_OPEN } from "@/lib/events";
import { Chip } from "../ui/Chip";

const pad = (n: number) => String(n).padStart(2, "0");
const panelId = (h: HackathonEntry, where: "row" | "strip") => `hack-${h.order}-${where}`;

function Panel({ entry, id }: { entry: HackathonEntry; id: string }) {
  return (
    <div id={id} className="rounded-md border border-rule bg-bg-raised p-5">
      <p className="label-mono">
        {entry.event} · {entry.project}
      </p>
      <p className="mt-2 font-display text-lg font-medium">{entry.pitch}</p>
      <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
        {entry.bullets?.map((b) => (
          <li key={b} className="flex gap-2">
            <span aria-hidden className="font-mono text-term">&gt;</span>
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-2" aria-label="Stack">
          {entry.stack?.map((s) => (
            <li key={s}>
              <Chip>{s}</Chip>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {entry.links?.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer" className="label-mono text-ink hover:text-accent">
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Node({ entry, open, onToggle }: { entry: HackathonEntry; open: boolean; onToggle: () => void }) {
  const winner = Boolean(entry.award);
  const body = (
    <>
      {/* Fixed 40px slot so the wire passes through every node's center. */}
      <span aria-hidden className="flex w-10 shrink-0 justify-center">
        <span
          className={`relative z-10 grid place-items-center rounded-full border bg-bg font-mono leading-none ${
            winner ? "h-10 w-10 border-signal text-lg text-signal" : `h-6 w-6 text-xs ${open ? "border-accent text-accent" : "border-rule text-ink-muted"}`
          }`}
        >
          {winner ? "★" : "●"}
        </span>
      </span>
      <span className="min-w-0 text-left lg:text-center">
        <span className="label-mono block">
          {pad(entry.order)} · {entry.event}
        </span>
        <span className={`block font-display text-lg font-medium ${winner ? "text-ink" : ""}`}>{entry.project}</span>
        {entry.award && <span className="label-mono block normal-case text-signal">{entry.award}</span>}
      </span>
    </>
  );
  const cls = "flex w-full items-center gap-4 rounded-md p-2 hover:bg-bg-raised lg:flex-col lg:gap-3";

  // Winners open their case file, morphing out of this node. Others expand a compact panel.
  if (entry.featuredSlug) {
    const slug = entry.featuredSlug;
    return (
      <button
        type="button"
        aria-label={`${entry.project}, ${entry.award}. Open the case file`}
        onClick={(e) => openCaseFile(slug, e.currentTarget)}
        className={cls}
      >
        {body}
      </button>
    );
  }
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={`${panelId(entry, "row")} ${panelId(entry, "strip")}`}
      onClick={onToggle}
      className={cls}
    >
      {body}
    </button>
  );
}

export function HackathonRun() {
  const [openOrder, setOpenOrder] = useState<number | null>(null);
  const openEntry = hackathons.find((h) => h.order === openOrder);

  // The terminal's `open <project>` expands an entry from outside.
  useEffect(() => {
    const onOpen = (e: Event) => setOpenOrder((e as CustomEvent<number>).detail);
    window.addEventListener(HACKATHON_OPEN, onOpen);
    return () => window.removeEventListener(HACKATHON_OPEN, onOpen);
  }, []);

  return (
    <div id="hackathons" className="mt-20 scroll-mt-24">
      <p className="label-mono mb-8">
        <span className="text-accent">{"// "}</span>
        <span data-scramble>fall &apos;25 hackathon run</span>
      </p>
      <ol className="relative grid gap-2 lg:grid-cols-5 lg:gap-4">
        {/* The wire: vertical on mobile, horizontal through the node centers on desktop. */}
        <span aria-hidden className="absolute top-3 bottom-3 left-[1.25rem] w-px bg-accent/50 lg:top-[1.75rem] lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-px lg:w-auto" />
        {hackathons.map((h) => {
          const open = openOrder === h.order;
          return (
            <li key={h.order} data-reveal>
              <div data-project={h.slug} className={`rounded-md ${h.award ? "" : "lg:pt-2"}`}>
                <Node entry={h} open={open} onToggle={() => setOpenOrder(open ? null : h.order)} />
              </div>
              {open && (
                <div className="mt-2 mb-4 pl-12 lg:hidden">
                  <Panel entry={h} id={panelId(h, "row")} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {openEntry && (
        <div className="mt-6 hidden lg:block">
          <Panel entry={openEntry} id={panelId(openEntry, "strip")} />
        </div>
      )}
      <p data-reveal className="label-mono mt-8 text-center">5 hackathons · 1 semester · 2 wins</p>
    </div>
  );
}

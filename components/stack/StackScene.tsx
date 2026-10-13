"use client";

import { useRef } from "react";
import { skills } from "@/content/skills";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { frameNodes, nodes } from "../hero/schematic-graph";
import { SchematicSvg } from "../hero/SchematicSvg";
import { Chip } from "../ui/Chip";

const pad = (n: number) => String(n).padStart(2, "0");
const frames = skills.map((g) => frameNodes(nodes.filter((n) => n.groups.includes(g.id)).map((n) => n.id)));

// Per-step node styling: nodes outside the current group fade, the group's boxes light up.
const stepStyles = skills
  .map(
    (g) =>
      `[data-step="${g.id}"] [data-node]:not([data-groups~="${g.id}"]){opacity:.18}` +
      `[data-step="${g.id}"] [data-node][data-groups~="${g.id}"] rect{stroke:var(--accent)}`,
  )
  .join("");

/**
 * Desktop pinned scene: the section pins while the schematic zooms to one tool group per step and the
 * side panel crossfades. Shown only at ≥768px with full motion (see .stack-scene in globals.css).
 */
export function StackScene() {
  const scene = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const svg = scene.current!.querySelector("svg")!;
        const frame = scene.current!.querySelector<HTMLElement>("[data-frame]")!;
        const counter = scene.current!.querySelector<HTMLElement>("[data-counter]")!;
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", scene.current);
        const last = skills.length - 1;

        const setStep = (i: number) => {
          frame.dataset.step = skills[i].id;
          counter.textContent = pad(i + 1);
        };
        setStep(0);
        gsap.set(svg, { attr: { viewBox: frames[0] } });
        gsap.set(panels.slice(1), { autoAlpha: 0, y: 30 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: scene.current,
            pin: true,
            start: "top top",
            end: `+=${last * 90}%`,
            scrub: 0.5,
            snap: { snapTo: 1 / last, duration: { min: 0.2, max: 0.6 }, ease: "power1.inOut" },
            onUpdate: (self) => setStep(Math.round(self.progress * last)),
          },
        });
        for (let i = 1; i <= last; i++) {
          tl.to(svg, { attr: { viewBox: frames[i] }, duration: 1 }, i - 1)
            .to(panels[i - 1], { autoAlpha: 0, y: -30, duration: 0.35 }, i - 1)
            .to(panels[i], { autoAlpha: 1, y: 0, duration: 0.35 }, i - 0.6);
        }

        // Triggers further down the page were measured before this pin added its spacing.
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    },
    { scope: scene },
  );

  return (
    <div ref={scene} className="stack-scene">
      <style>{stepStyles}</style>
      <div className="grid h-svh items-center gap-10 py-20 lg:grid-cols-[3fr_2fr]">
        <figure data-frame className="overflow-hidden rounded-md border border-rule bg-bg-raised/60 p-6">
          <figcaption className="label-mono mb-4 flex justify-between">
            <span>fig. 03 — stack, by layer</span>
            <span>
              <span data-counter className="text-accent">
                01
              </span>{" "}
              / {pad(skills.length)}
            </span>
          </figcaption>
          <SchematicSvg layout="wide" aria-hidden className="[&_[data-node]]:transition-opacity [&_[data-node]]:duration-500 [&_rect]:transition-[stroke]" />
        </figure>
        <div className="relative min-h-72">
          {skills.map((g, i) => (
            <div key={g.id} data-panel className="absolute inset-x-0 top-0">
              <p className="label-mono">
                <span className="text-accent">{pad(i + 1)}</span> / {pad(skills.length)} · layer
              </p>
              <h3 className="mt-2 font-display text-4xl font-bold tracking-tight">{g.label}</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s}>
                    <Chip>{s}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

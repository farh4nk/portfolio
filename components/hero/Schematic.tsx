"use client";

import { useEffect, useRef, useState } from "react";
import { whenBooted } from "@/lib/events";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { scrollToElement } from "@/lib/scroll";
import { type Layout, NODE_SIZE, nodes, type SchematicNode, VIEWBOX } from "./schematic-graph";
import { SchematicSvg } from "./SchematicSvg";

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

/** Lights up every [data-project] the node uses and dims the rest. null clears. */
function highlight(node: SchematicNode | null) {
  const root = document.documentElement;
  const all = document.querySelectorAll<HTMLElement>("[data-project]");
  if (!node || node.projects.includes("*")) {
    root.removeAttribute("data-highlighting");
    all.forEach((el) => el.toggleAttribute("data-lit", Boolean(node)));
    return;
  }
  root.setAttribute("data-highlighting", "");
  all.forEach((el) => el.toggleAttribute("data-lit", node.projects.includes(el.dataset.project!)));
}

function jumpTo(node: SchematicNode) {
  const target = node.projects.includes("*")
    ? document.getElementById("work")
    : document.querySelector(`[data-project="${node.projects[0]}"]`);
  if (target) scrollToElement(target);
}

export function Schematic() {
  const figure = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [layout, setLayout] = useState<Layout>("wide");
  const [pointer, setPointer] = useState("mouse");

  useEffect(() => {
    highlight(active ? byId[active] : null);
  }, [active]);
  useEffect(() => () => highlight(null), []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ wide: "(min-width: 640px)", motion: MOTION_OK }, (ctx) => {
        const { wide, motion } = ctx.conditions as { wide: boolean; motion: boolean };
        setLayout(wide ? "wide" : "tall");
        if (!motion) return;

        const svg = figure.current!.querySelector<SVGSVGElement>(`svg[data-layout="${wide ? "wide" : "tall"}"]`)!;
        const wires = gsap.utils.toArray<SVGPathElement>("[data-wire]", svg);
        const boxes = gsap.utils.toArray<SVGGElement>("[data-node]", svg);

        // Wires draw in, then nodes pop. Starts after the hero copy has landed.
        const intro = gsap.timeline({ delay: 0.9, paused: true });
        const cancelBoot = whenBooted(() => intro.play());
        intro
          .from(boxes, { opacity: 0, scale: 0.85, transformOrigin: "50% 50%", duration: 0.4, stagger: 0.05, ease: "back.out(2)" })
          .from(wires, { drawSVG: "0%", duration: 0.5, stagger: 0.07, ease: "power2.inOut" }, 0.15);

        // Data pulses: each wire sends a dot along its path forever, at its own random rhythm.
        intro.add(() => {
          for (const wire of wires) {
            const dot = svg.querySelector<SVGCircleElement>(`[data-pulse="${wire.dataset.wire}"]`);
            if (!dot) continue;
            const length = wire.getTotalLength();
            gsap
              .timeline({ repeat: -1, repeatDelay: gsap.utils.random(0.6, 3), delay: gsap.utils.random(0, 2) })
              .set(dot, { opacity: 1 })
              .to(dot, {
                motionPath: { path: wire, align: wire, alignOrigin: [0.5, 0.5] },
                duration: (length / (wide ? 90 : 60)) * 1.2,
                ease: "none",
              })
              .set(dot, { opacity: 0 });
          }
        });

        // Subtle tilt toward the mouse (desktop pointers only).
        if (wide && window.matchMedia("(pointer: fine)").matches) {
          const el = figure.current!;
          gsap.set(el, { transformPerspective: 900 });
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 6);
            rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
          };
          const reset = () => {
            rx(0);
            ry(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", reset);
          return () => {
            cancelBoot();
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", reset);
          };
        }
        return cancelBoot;
      });
    },
    { scope: figure },
  );

  const nodeProps = (n: SchematicNode) => ({
    tabIndex: 0,
    role: "button",
    "aria-label": `${n.label}: ${n.use}. Show projects that use it.`,
    "aria-pressed": active === n.id,
    className: "cursor-pointer outline-none [&:focus-visible_rect]:stroke-[var(--accent)]",
    "data-active": active === n.id ? "" : undefined,
    onPointerEnter: (e: React.PointerEvent) => {
      setPointer(e.pointerType);
      if (e.pointerType === "mouse") setActive(n.id);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setActive(null);
    },
    onPointerDown: (e: React.PointerEvent) => setPointer(e.pointerType),
    onFocus: () => setActive(n.id),
    onBlur: () => setActive(null),
    // Touch: first tap highlights, second tap jumps. Mouse and keyboard jump straight away.
    onClick: () => {
      if (pointer !== "mouse" && active !== n.id) {
        setActive(n.id);
        return;
      }
      jumpTo(n);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        jumpTo(n);
      }
      if (e.key === "Escape") setActive(null);
    },
  });

  const activeNode = active ? byId[active] : null;
  const vb = VIEWBOX[layout];
  const size = NODE_SIZE[layout];

  return (
    <figure ref={figure} className="relative rounded-md border border-rule bg-bg-raised/60 p-4 will-change-transform sm:p-6">
      <figcaption className="label-mono mb-4 flex justify-between gap-4">
        <span>fig. 01 — system schematic</span>
        <span className="text-term">● live</span>
      </figcaption>
      <div className="relative">
        <SchematicSvg layout="wide" data-layout="wide" pulses className="hidden sm:block" nodeProps={nodeProps} aria-label="Schematic of the tools I build with. Select a node to see the projects that use it." role="group" />
        <SchematicSvg layout="tall" data-layout="tall" pulses className="sm:hidden" nodeProps={nodeProps} aria-label="Schematic of the tools I build with. Select a node to see the projects that use it." role="group" />
        {activeNode && (
          <div
            role="tooltip"
            className="pointer-events-none absolute z-10 w-max max-w-56 -translate-x-1/2 -translate-y-full rounded border border-accent/60 bg-bg px-3 py-2 shadow-lg"
            style={{
              left: `${(activeNode[layout].x / vb.w) * 100}%`,
              top: `calc(${((activeNode[layout].y - size.h / 2) / vb.h) * 100}% - 8px)`,
            }}
          >
            <p className="font-mono text-xs text-accent">{activeNode.label}</p>
            <p className="mt-1 text-xs text-ink">{activeNode.use}</p>
            <p className="label-mono mt-1 text-[0.65rem]">
              {pointer === "mouse" ? "click to jump ↓" : "tap again to jump ↓"}
            </p>
          </div>
        )}
      </div>
    </figure>
  );
}

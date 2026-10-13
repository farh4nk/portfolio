import { NODE_H, NODE_W, nodes, wires } from "./schematic-graph";

// Static schematic. Phase 4 adds wire draw-in, traveling pulses and hover highlighting.
export function Schematic() {
  return (
    <figure className="relative rounded-md border border-rule bg-bg-raised/60 p-4 sm:p-6">
      <figcaption className="label-mono mb-4 flex justify-between">
        <span>fig. 01 — system schematic</span>
        <span className="text-term">● live</span>
      </figcaption>
      <svg viewBox="0 0 720 400" className="h-auto w-full" role="img" aria-label="Diagram of the tools I build with and how they connect">
        <g fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.7">
          {wires.map((w) => (
            <path key={`${w.from}-${w.to}`} d={w.d} data-wire />
          ))}
        </g>
        {nodes.map((n) => (
          <g key={n.id} data-node={n.id}>
            <rect
              x={n.x - NODE_W / 2}
              y={n.y - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx="4"
              fill="var(--bg)"
              stroke="var(--rule)"
              strokeWidth="1.5"
            />
            <text
              x={n.x}
              y={n.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--ink)"
              className="font-mono"
              fontSize="14"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

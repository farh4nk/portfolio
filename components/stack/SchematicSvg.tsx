import type { SVGProps } from "react";
import { NODE, nodes, VIEWBOX, wires } from "./schematic-graph";

// Static schematic for the stack scene; [data-node] / [data-groups] let the scene dim and light nodes.
export function SchematicSvg({ className = "", ...rest }: Omit<SVGProps<SVGSVGElement>, "children">) {
  return (
    <svg viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`} className={`h-auto w-full overflow-visible ${className}`} {...rest}>
      <g fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.7">
        {wires.map((w) => (
          <path key={w.id} d={w.d} />
        ))}
      </g>
      {nodes.map((n) => (
        <g key={n.id} data-node={n.id} data-groups={n.groups.join(" ")}>
          <rect
            x={n.x - NODE.w / 2}
            y={n.y - NODE.h / 2}
            width={NODE.w}
            height={NODE.h}
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
            className="pointer-events-none font-mono"
            fontSize="14"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

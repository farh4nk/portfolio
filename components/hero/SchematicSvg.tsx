import type { SVGProps } from "react";
import { type Layout, NODE_SIZE, nodes, type SchematicNode, VIEWBOX, wires } from "./schematic-graph";

// Pure renderer for the schematic. Animation and interaction hook in through data attributes
// ([data-wire], [data-pulse], [data-node], [data-groups]) and the optional nodeProps.
export function SchematicSvg({
  layout,
  className = "",
  pulses = false,
  nodeProps,
  ...rest
}: {
  layout: Layout;
  className?: string;
  pulses?: boolean;
  nodeProps?: (n: SchematicNode) => SVGProps<SVGGElement>;
} & Omit<SVGProps<SVGSVGElement>, "children">) {
  const { w, h } = VIEWBOX[layout];
  const size = NODE_SIZE[layout];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`h-auto w-full overflow-visible ${className}`} {...rest}>
      <g fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.7">
        {wires.map((wire) => (
          <path key={`${wire.from}-${wire.to}`} d={wire[layout]} data-wire={`${wire.from}-${wire.to}`} />
        ))}
      </g>
      {pulses && (
        <g fill="var(--term)">
          {wires.map((wire) => (
            <circle key={`${wire.from}-${wire.to}`} r="3" cx="0" cy="0" opacity="0" data-pulse={`${wire.from}-${wire.to}`} />
          ))}
        </g>
      )}
      {nodes.map((n) => {
        const p = n[layout];
        return (
          <g key={n.id} data-node={n.id} data-groups={n.groups.join(" ")} {...nodeProps?.(n)}>
            <rect
              x={p.x - size.w / 2}
              y={p.y - size.h / 2}
              width={size.w}
              height={size.h}
              rx="4"
              fill="var(--bg)"
              stroke="var(--rule)"
              strokeWidth="1.5"
              data-node-box
            />
            <text
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--ink)"
              className="pointer-events-none font-mono"
              fontSize={layout === "wide" ? 14 : 13}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Case-file pipeline: the project's components as schematic nodes joined by wires.
// Vertical on phones, a wrapping row on wide screens. CaseFile animates [data-diagram-*] in order.
export function ArchitectureDiagram({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col items-start lg:flex-row lg:flex-wrap lg:items-center lg:gap-y-3" aria-label="Architecture">
      {steps.map((step, i) => (
        <li key={step} className="flex flex-col items-start lg:flex-row lg:items-center">
          {i > 0 && (
            <span
              aria-hidden
              data-diagram-wire
              className="ml-6 h-5 w-px origin-top bg-accent lg:ml-0 lg:h-px lg:w-7 lg:origin-left"
            />
          )}
          <span
            data-diagram-node
            className="rounded border border-rule bg-bg px-3 py-2 font-mono text-xs whitespace-nowrap text-ink"
          >
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

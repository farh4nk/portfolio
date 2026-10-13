import { experience } from "@/content/experience";

// Static circuit timeline. Phase 4 draws the wire on scroll and lights each node as it's reached.
export function CircuitTimeline() {
  return (
    <ol className="relative">
      <span aria-hidden data-wire className="absolute top-2 bottom-2 left-[7px] w-px bg-accent/50 md:left-[calc(11rem+7px)]" />
      {experience.map((r, i) => (
        <li key={r.org} data-reveal className="relative grid gap-x-8 pb-14 pl-10 last:pb-0 md:grid-cols-[11rem_1fr] md:pl-0">
          <p className="label-mono pt-1 md:text-right md:pr-10">{r.dates}</p>
          <span
            aria-hidden
            data-node
            className={`absolute top-1.5 left-0 h-[15px] w-[15px] rounded-full border-2 bg-bg md:left-[11rem] ${
              i === 0 ? "border-term" : "border-accent"
            }`}
          />
          <div className="md:pl-10">
            <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl md:mt-0">{r.title}</h3>
            <p className="mt-1 text-accent">
              {r.org}
              {i === 0 && <span className="label-mono ml-3 normal-case text-term">● current</span>}
            </p>
            <ul className="mt-4 max-w-2xl space-y-2 text-ink-muted">
              {r.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="font-mono text-term">&gt;</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

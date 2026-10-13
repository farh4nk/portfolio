import { experience } from "@/content/experience";
import { TimelineMotion } from "./TimelineMotion";

// Circuit timeline. TimelineMotion draws the wire with scroll and lights each node as the wire reaches it.
export function CircuitTimeline() {
  return (
    <TimelineMotion>
      <ol className="relative">
        <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-rule md:left-[calc(11rem+7px)]" />
        <span
          aria-hidden
          data-wire-progress
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent md:left-[calc(11rem+7px)]"
        />
        {experience.map((r, i) => (
          <li key={r.org} data-role className="relative grid gap-x-8 pb-14 pl-10 last:pb-0 md:grid-cols-[11rem_1fr] md:pl-0">
            <p data-role-dates className="label-mono pt-1 md:pr-10 md:text-right">
              {r.dates}
            </p>
            <span aria-hidden className="absolute top-1.5 left-0 h-[15px] w-[15px] md:left-[11rem]">
              <span data-node-ring className="absolute inset-0 rounded-full border border-accent opacity-0" />
              <span
                data-node
                className={`absolute inset-0 rounded-full border-2 bg-bg ${i === 0 ? "border-term" : "border-accent"}`}
              >
                <span
                  data-node-fill
                  className={`absolute inset-[2px] rounded-full ${i === 0 ? "bg-term" : "bg-accent"}`}
                />
              </span>
            </span>
            <div data-project={r.slug} className="-m-3 rounded-md p-3 md:ml-7 md:pl-3">
              <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl md:mt-0">{r.title}</h3>
              <p className="mt-1 text-accent">
                {r.org}
                {i === 0 && <span className="label-mono ml-3 normal-case text-term">● current</span>}
              </p>
              <ul className="mt-4 max-w-2xl space-y-2 text-ink-muted">
                {r.bullets.map((b) => (
                  <li key={b} data-log className="flex gap-3">
                    <span aria-hidden className="font-mono text-term">
                      &gt;
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </TimelineMotion>
  );
}

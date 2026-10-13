import { skills } from "@/content/skills";
import { CornerMarks } from "../ui/CornerMarks";
import { Chip } from "../ui/Chip";

const pad = (n: number) => String(n).padStart(2, "0");

// Six stacked cards. This stays as the mobile layout; Phase 4 adds the pinned schematic scene on desktop.
export function StackExplorer() {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((g, i) => (
        <li key={g.id} data-reveal className="relative rounded-md border border-rule bg-bg-raised p-5 sm:p-6">
          <CornerMarks />
          <p className="label-mono">
            <span className="text-accent">{pad(i + 1)}</span> / {pad(skills.length)}
          </p>
          <h3 className="mt-2 font-display text-xl font-bold">{g.label}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {g.items.map((s) => (
              <li key={s}>
                <Chip>{s}</Chip>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

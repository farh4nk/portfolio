import { profile } from "@/content/profile";

// Final values render server-side; PageMotion counts them up from 0 on enter.
export function Stats() {
  return (
    <section aria-label="Highlights" className="grid grid-cols-2 gap-px border border-rule bg-rule md:grid-cols-4">
      {profile.stats.map((s) => (
        <div key={s.label} data-reveal className="bg-bg p-5 sm:p-6">
          <p className="font-display text-3xl font-bold sm:text-4xl">
            <span data-count={s.value} data-decimals={s.decimals}>
              {s.value.toLocaleString("en-US", { minimumFractionDigits: s.decimals })}
            </span>
            <span className="text-accent">{s.suffix}</span>
          </p>
          <p className="label-mono mt-2">{s.label}</p>
        </div>
      ))}
    </section>
  );
}

import { profile } from "@/content/profile";
import { Chip } from "../ui/Chip";

// Bio and education on the left; leadership and honors in a side column on wide screens.
export function About() {
  const { education } = profile;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
      <div className="space-y-10">
        <div data-reveal className="space-y-4 text-lg leading-relaxed">
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div data-reveal className="rounded-md border border-rule bg-bg-raised p-5 sm:p-6">
          <p className="label-mono">education</p>
          <h3 className="mt-2 font-display text-xl font-bold">{education.school}</h3>
          <p className="mt-1 text-ink-muted">
            {education.degree} · {education.graduation}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm text-accent">
            {education.honors.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Coursework">
            {education.coursework.map((c) => (
              <li key={c}>
                <Chip>{c}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <aside data-reveal className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1 lg:content-start">
        <div>
          <p className="label-mono mb-3">leadership</p>
          <ul className="space-y-3">
            {profile.leadership.map((l) => (
              <li key={l.org}>
                <p className="font-medium">{l.role}</p>
                <p className="text-sm text-ink-muted">{l.org}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-mono mb-3">honors</p>
          <ul className="flex flex-col items-start gap-2">
            {profile.awards.map((a) => (
              <li key={a}>
                <Chip tone="signal">★ {a}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

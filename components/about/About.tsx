import { profile } from "@/content/profile";
import { publicAsset } from "@/lib/assets";
import { Chip } from "../ui/Chip";
import { CornerMarks } from "../ui/CornerMarks";
import { MediaFrame } from "../ui/MediaFrame";

// Phase 4 adds the perception overlay (scan line, landmarks, bounding box) on the portrait.
export function About() {
  const { education } = profile;

  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div data-reveal className="relative mx-auto w-full max-w-sm md:mx-0 md:max-w-none">
        <CornerMarks />
        <MediaFrame
          src={publicAsset(profile.portrait)}
          alt={`Portrait of ${profile.name}`}
          pending="portrait.jpg"
          sizes="(min-width: 768px) 40vw, 384px"
          className="aspect-[4/5] rounded-md border border-rule"
        />
        <p className="label-mono mt-3 flex justify-between">
          <span>fig. 04 — {profile.location.toLowerCase()}</span>
          <span className="text-term">farhan · 0.99</span>
        </p>
      </div>

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

        <div data-reveal className="grid gap-10 sm:grid-cols-2">
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
        </div>
      </div>
    </div>
  );
}

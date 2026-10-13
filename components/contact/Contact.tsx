import { profile } from "@/content/profile";
import { publicAsset } from "@/lib/assets";
import { CopyEmail } from "./CopyEmail";

export function Contact() {
  const resume = publicAsset(profile.links.resume);
  const links = [
    { label: "GitHub", href: profile.links.github },
    { label: "LinkedIn", href: profile.links.linkedin },
    ...(resume ? [{ label: "Resume PDF", href: resume }] : []),
  ];

  return (
    <div>
      <h2 data-split-words className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] font-bold tracking-[-0.03em]">
        Let&apos;s build something.
      </h2>
      <p data-reveal className="mt-6 max-w-xl text-lg text-ink-muted">
        {profile.contactBlurb}
      </p>
      <div data-reveal className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
        <CopyEmail email={profile.email} />
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer" className="label-mono text-ink hover:text-accent">
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

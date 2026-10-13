import { profile } from "@/content/profile";
import { publicAsset } from "@/lib/assets";
import { HeroIntro } from "./HeroIntro";
import { Schematic } from "./Schematic";
import { TypedRoles } from "./TypedRoles";

export function Hero() {
  const resume = publicAsset(profile.links.resume);

  return (
    <section className="pt-16 pb-20 sm:pt-24 sm:pb-28">
      <HeroIntro>
        <p className="label-mono mb-6">
          <span className="text-accent">{"// "}</span>
          <span data-hero-kicker>{profile.kicker}</span>
        </p>
        <h1
          data-hero-name
          className="font-display text-[clamp(3rem,11vw,8rem)] leading-[0.9] font-bold tracking-[-0.04em] uppercase"
        >
          {profile.name}
        </h1>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <div data-hero-item>
              <TypedRoles roles={profile.roles} />
            </div>
            <p data-hero-item className="mt-6 font-display text-2xl font-medium sm:text-3xl">
              {profile.tagline}
            </p>
            <p data-hero-item className="mt-4 max-w-xl text-ink-muted">
              {profile.summary}
            </p>
            <div data-hero-item className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="label-mono rounded-md bg-accent px-4 py-3 font-bold text-bg hover:opacity-90">
                [ View work ↓ ]
              </a>
              <a
                href={resume ?? profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="label-mono rounded-md border border-rule px-4 py-3 text-ink hover:border-accent hover:text-accent"
              >
                [ {resume ? "Resume" : "GitHub"} ↗ ]
              </a>
            </div>
          </div>
          <div data-hero-item>
            <Schematic />
          </div>
        </div>
      </HeroIntro>
    </section>
  );
}

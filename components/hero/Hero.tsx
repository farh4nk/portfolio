import { profile } from "@/content/profile";
import { publicAsset } from "@/lib/assets";
import { PinIcon, SkylineIcon } from "../ui/CityIcons";
import { CornerMarks } from "../ui/CornerMarks";
import { MediaFrame } from "../ui/MediaFrame";
import { ResumeLink } from "../resume/ResumeLink";
import { HeroIntro } from "./HeroIntro";
import { PerceptionPortrait } from "./PerceptionPortrait";
import { TypedRoles } from "./TypedRoles";

const secondaryCta =
  "label-mono rounded-md border border-rule px-4 py-3 text-ink hover:border-accent hover:text-accent";

// The headshot runs a face-detection pass after the boot intro, then the overlay fades away.
// Desktop: the headshot sits top-right beside the name, like the photo on an ID card, spanning from the
// kicker to the buttons. Phones: a small badge above the kicker, so the name stays on the first screen.
export function Hero() {
  const resume = publicAsset(profile.links.resume);

  return (
    <section className="pt-12 pb-20 sm:pt-20 sm:pb-28">
      <HeroIntro>
        <div className="grid gap-x-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <figure data-hero-item className="mb-8 w-28 sm:w-36 lg:mb-0 lg:w-64 xl:w-72 lg:col-start-2 lg:row-start-1 lg:mt-2">
            <div className="relative">
              <CornerMarks />
              <PerceptionPortrait label="farhan · 0.99">
                <MediaFrame
                  src={publicAsset(profile.portrait)}
                  alt={`Portrait of ${profile.name}`}
                  pending="portrait.webp"
                  priority
                  sizes="(min-width: 1280px) 288px, (min-width: 1024px) 256px, 144px"
                  className="aspect-[4/5] rounded-md border border-rule"
                />
              </PerceptionPortrait>
            </div>
            <figcaption className="label-mono mt-3 hidden justify-between lg:flex">
              <span>fig. 01</span>
              <span>{profile.location.toLowerCase()}</span>
            </figcaption>
          </figure>

          <div className="lg:col-start-1 lg:row-start-1">
            {/* Icons sit outside the kicker span: its scramble rewrites the span's text. */}
            <p className="label-mono mb-6 flex items-center gap-2">
              <span className="text-accent">
                <PinIcon />
              </span>
              <span data-hero-kicker>{profile.city}</span>
              <span className="text-accent">
                <SkylineIcon />
              </span>
            </p>
            <h1
              data-hero-name
              className="font-display text-[clamp(3rem,11vw,8rem)] leading-[0.9] font-bold tracking-[-0.04em] uppercase lg:text-[clamp(4rem,7.6vw,8rem)]"
            >
              {profile.name}
            </h1>

            <div className="mt-10">
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
                {resume ? (
                  <ResumeLink href={resume} className={secondaryCta}>
                    [ Resume ↗ ]
                  </ResumeLink>
                ) : (
                  <a href={profile.links.github} target="_blank" rel="noreferrer" className={secondaryCta}>
                    [ GitHub ↗ ]
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </HeroIntro>
    </section>
  );
}

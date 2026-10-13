import type { FeaturedProject } from "@/content/projects";
import { publicAsset } from "@/lib/assets";
import { Chip } from "../ui/Chip";
import { CornerMarks } from "../ui/CornerMarks";
import { MediaFrame } from "../ui/MediaFrame";
import { CaseFileTrigger } from "./CaseFileTrigger";

type Variant = "wide" | "tall" | "banner";

// Media shape and image sizes per bento slot. "banner" is a full-width row: image left, text right.
const media: Record<Variant, { className: string; sizes: string }> = {
  wide: { className: "rounded-t-md border-b aspect-[16/7]", sizes: "(min-width: 1024px) 66vw, 100vw" },
  tall: {
    className: "rounded-t-md border-b aspect-video lg:aspect-auto lg:min-h-64 lg:flex-1",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  banner: {
    className:
      "rounded-t-md border-b aspect-video lg:aspect-auto lg:w-1/2 lg:shrink-0 lg:rounded-tr-none lg:rounded-l-md lg:border-b-0 lg:border-r",
    sizes: "(min-width: 1024px) 50vw, 100vw",
  },
};

// Featured card. Clicking anywhere on it morphs it into the full-screen case file (see CaseFile.tsx).
export function ProjectCard({
  project,
  variant = "wide",
  className = "",
}: {
  project: FeaturedProject;
  variant?: Variant;
  className?: string;
}) {
  const winner = Boolean(project.ribbon);

  return (
    <article
      id={`work-${project.slug}`}
      data-project={project.slug}
      data-reveal
      className={`group relative flex scroll-mt-24 flex-col rounded-md border bg-bg-raised ${
        variant === "banner" ? "lg:min-h-80 lg:flex-row" : ""
      } ${winner ? "border-signal/40" : "border-rule"} ${className}`}
    >
      <CornerMarks />
      <MediaFrame
        src={publicAsset(project.image)}
        alt={`${project.name} screenshot`}
        pending={project.image.split("/").pop()!}
        sizes={media[variant].sizes}
        focus={project.imageFocus}
        imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        className={`border-rule ${media[variant].className}`}
      />

      <div className="flex flex-1 flex-col">
        {project.ribbon && (
          <p className="label-mono border-b border-signal/30 bg-signal/10 px-5 py-2 text-signal">
            <span aria-hidden className="star-badge mr-1 inline-block">
              ★
            </span>
            {project.ribbon}
          </p>
        )}

        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="label-mono">{project.context}</p>
            <p className="label-mono normal-case text-accent transition-transform duration-300 group-hover:-translate-x-1">
              {project.annotation}
            </p>
          </div>
          <h3 className="font-display text-3xl font-bold tracking-tight">{project.name}</h3>
          <p className="text-ink-muted">{project.tagline}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Stack">
            {project.stack.slice(0, variant === "wide" ? 5 : 6).map((s) => (
              <li key={s}>
                <Chip>{s}</Chip>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
            <ul className="relative z-10 flex flex-wrap gap-x-5 gap-y-2">
              {project.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="label-mono text-ink hover:text-accent">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
            <CaseFileTrigger slug={project.slug} name={project.name} />
          </div>
        </div>
      </div>
    </article>
  );
}

import { featured } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

const bySlug = Object.fromEntries(featured.map((p) => [p.slug, p]));

// Desktop: Quenova and MIRA are 2×1 on the left (MIRA's screenshot is landscape), Brain Invaders is
// 1×2 on the right (its screenshot is portrait).
// Cribby runs full width underneath as a banner (image left, text right).
// Tablet: Quenova and Cribby span both columns, MIRA and Brain Invaders sit side by side. Mobile: one column.
export function BentoGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <ProjectCard project={bySlug.quenova} className="md:col-span-2 lg:col-start-1 lg:row-start-1" />
      <ProjectCard
        project={bySlug["brain-invaders"]}
        variant="tall"
        className="lg:col-start-3 lg:row-span-2 lg:row-start-1"
      />
      <ProjectCard project={bySlug.mira} className="lg:col-span-2 lg:col-start-1 lg:row-start-2" />
      <ProjectCard project={bySlug.cribby} variant="banner" className="md:col-span-2 lg:col-span-3 lg:row-start-3" />
    </div>
  );
}

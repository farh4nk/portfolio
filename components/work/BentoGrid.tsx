import { featured } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

const bySlug = Object.fromEntries(featured.map((p) => [p.slug, p]));

// Desktop: Quenova and Brain Invaders are 2×1 on the left, MIRA is 1×2 on the right.
// Tablet: Quenova spans both columns, the winners sit side by side. Mobile: one column.
export function BentoGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <ProjectCard project={bySlug.quenova} className="md:col-span-2 lg:col-start-1 lg:row-start-1" />
      <ProjectCard project={bySlug.mira} tall className="lg:col-start-3 lg:row-span-2 lg:row-start-1" />
      <ProjectCard project={bySlug["brain-invaders"]} className="lg:col-span-2 lg:col-start-1 lg:row-start-2" />
    </div>
  );
}

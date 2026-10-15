"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CASEFILE_EVENT, slugFromHash } from "@/lib/casefile";
import type { CaseFileProject } from "./CaseFile";

// The overlay (Flip, diagrams, demos) is only downloaded when a case file first opens.
const CaseFile = dynamic(() => import("./CaseFile").then((m) => m.CaseFile), { ssr: false });

/** Owns which case file is open, mirroring the #work/<slug> hash (so Back closes it). */
export function CaseFileController({ projects }: { projects: CaseFileProject[] }) {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const next = slugFromHash();
      setSlug(next && projects.some((p) => p.slug === next) ? next : null);
    };
    sync();
    window.addEventListener(CASEFILE_EVENT, sync);
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener(CASEFILE_EVENT, sync);
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, [projects]);

  const index = projects.findIndex((p) => p.slug === slug);
  // Keep the last project rendered while the close animation runs.
  const [shown, setShown] = useState<string | null>(null);
  if (slug && slug !== shown) setShown(slug);
  const shownIndex = projects.findIndex((p) => p.slug === shown);

  if (shownIndex < 0) return null;
  return (
    <CaseFile
      key={shown}
      project={projects[shownIndex]}
      position={`${String(shownIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`}
      next={projects[(shownIndex + 1) % projects.length]}
      open={index >= 0}
      onClosed={() => setShown(null)}
    />
  );
}

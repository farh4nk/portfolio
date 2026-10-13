"use client";

import { openCaseFile } from "@/lib/casefile";

// Visible "open case file" button whose ::after stretches over the whole card, so the card is
// clickable while its own links (z-10) stay independently clickable.
export function CaseFileTrigger({ slug, name }: { slug: string; name: string }) {
  return (
    <button
      type="button"
      aria-label={`Open the ${name} case file`}
      onClick={(e) => openCaseFile(slug, e.currentTarget.closest("article"))}
      className="label-mono text-accent after:absolute after:inset-0 after:rounded-md after:content-[''] hover:text-ink"
    >
      [ open case file → ]
    </button>
  );
}

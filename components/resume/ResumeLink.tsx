"use client";

import type { ReactNode } from "react";
import { canPreviewResume, openResume } from "@/lib/events";

// A real link to the PDF. On desktop a plain click opens the in-page preview instead;
// modified clicks (new tab, download) and phones keep the browser's default.
export function ResumeLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-haspopup="dialog"
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || !canPreviewResume()) return;
        e.preventDefault();
        openResume(href);
      }}
    >
      {children}
    </a>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

/** YouTube video id from a watch URL, or null. */
export function youTubeId(href: string): string | null {
  try {
    const url = new URL(href);
    return url.hostname.endsWith("youtube.com") ? url.searchParams.get("v") : url.hostname === "youtu.be" ? url.pathname.slice(1) : null;
  } catch {
    return null;
  }
}

// Thumbnail first; the YouTube iframe only loads when clicked.
export function VideoFacade({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-md border border-rule bg-bg">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play ${title}`}>
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            unoptimized
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover opacity-70 transition-opacity group-hover:opacity-90"
          />
          <span className="label-mono absolute inset-0 grid place-items-center">
            <span className="rounded-md border border-accent bg-bg/80 px-4 py-3 text-accent">▶ play demo</span>
          </span>
        </button>
      )}
    </div>
  );
}

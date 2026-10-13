"use client";

import { useEffect, useRef, useState } from "react";
import type { FeaturedProject } from "@/content/projects";
import { CASEFILE_EVENT, caseFileSource, closeCaseFile, consumeSwap, slugFromHash, swapCaseFile } from "@/lib/casefile";
import { Flip, gsap, useGSAP } from "@/lib/gsap";
import { lockScroll } from "@/lib/scroll";
import { Chip } from "../ui/Chip";
import { MediaFrame } from "../ui/MediaFrame";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { MiraDetection } from "./MiraDetection";
import { ReactionDrill } from "./ReactionDrill";
import { VideoFacade, youTubeId } from "./VideoFacade";

export type CaseFileProject = FeaturedProject & { imageSrc?: string };

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const INERT_TARGETS = "body > header, body > main, body > footer";

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

function CaseFile({
  project,
  position,
  next,
  open,
  onClosed,
}: {
  project: CaseFileProject;
  position: string;
  next: CaseFileProject;
  open: boolean;
  onClosed: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const source = useRef<HTMLElement | null>(null);
  const video = project.links.find((l) => l.label === "Demo");
  const videoId = video ? youTubeId(video.href) : null;

  // Open: morph from the source element, then bring in the contents.
  useGSAP(
    () => {
      source.current = caseFileSource();
      const from = consumeSwap() ? null : source.current;
      const content = gsap.utils.toArray<HTMLElement>("[data-cf-in]", panel.current);
      const tl = gsap.timeline();

      if (reducedMotion()) {
        gsap.set(root.current, { autoAlpha: 1 });
        return;
      }

      tl.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0);
      if (from) {
        // Snap the panel onto the source's box, then grow it back to full size.
        Flip.fit(panel.current, from, { scale: true });
        tl.to(panel.current, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.65, ease: "power3.inOut" }, 0);
      } else {
        tl.from(panel.current, { y: 40, opacity: 0, duration: 0.5, ease: "power3.out" }, 0);
      }
      tl.from(content, { opacity: 0, y: 18, duration: 0.5, stagger: 0.06, ease: "power3.out" }, from ? 0.5 : 0.2)
        .from("[data-diagram-node]", { opacity: 0, scale: 0.8, duration: 0.3, stagger: 0.12, ease: "back.out(2)" }, "<0.2")
        .from("[data-diagram-wire]", { scale: 0, duration: 0.25, stagger: 0.12, ease: "power2.out" }, "<0.1");
    },
    { scope: root },
  );

  const onClosedRef = useRef(onClosed);
  useEffect(() => {
    onClosedRef.current = onClosed;
  });

  // Close: fade the contents, morph back into the source, then unmount.
  useEffect(() => {
    if (open) return;
    const from = source.current;
    const done = () => onClosedRef.current();
    if (reducedMotion()) {
      done();
      return;
    }
    const tl = gsap.timeline({ onComplete: done });
    tl.to("[data-cf-in]", { opacity: 0, duration: 0.15 });
    if (from && from.isConnected) {
      tl.add(Flip.fit(panel.current, from, { scale: true, duration: 0.5, ease: "power3.inOut" }) as gsap.core.Tween);
    } else {
      tl.to(panel.current, { y: 40, opacity: 0, duration: 0.3 });
    }
    tl.to(root.current, { autoAlpha: 0, duration: 0.2 }, "-=0.15");
    return () => {
      tl.kill();
    };
  }, [open]);

  // Modal behavior: lock scroll, make the page inert, Esc closes, focus returns to the source.
  useEffect(() => {
    const background = document.querySelectorAll<HTMLElement>(INERT_TARGETS);
    background.forEach((el) => (el.inert = true));
    lockScroll(true);
    // The dialog starts at visibility:hidden for the morph; focus once it's visible.
    const focusClose = gsap.delayedCall(0.05, () => closeButton.current?.focus({ preventScroll: true }));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCaseFile();
    };
    window.addEventListener("keydown", onKey);
    const returnTo = source.current?.querySelector<HTMLElement>("button") ?? source.current;
    return () => {
      focusClose.kill();
      window.removeEventListener("keydown", onKey);
      background.forEach((el) => (el.inert = false));
      lockScroll(false);
      returnTo?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-labelledby="casefile-title"
      className="invisible fixed inset-0 z-[60]"
    >
      <div aria-hidden onClick={closeCaseFile} className="absolute inset-0 bg-bg/70 backdrop-blur-sm" />
      <div
        ref={panel}
        data-lenis-prevent
        className="absolute inset-2 overflow-y-auto overscroll-contain rounded-md border border-rule bg-bg-raised sm:inset-4 lg:inset-8"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-rule bg-bg-raised/90 px-5 py-3 backdrop-blur sm:px-8">
          <p className="label-mono">
            <span className="text-accent">case file</span> · {position}
          </p>
          <button
            ref={closeButton}
            type="button"
            onClick={closeCaseFile}
            className="label-mono rounded border border-rule px-3 py-1.5 text-ink hover:border-accent hover:text-accent"
          >
            [ esc ✕ ]
          </button>
        </div>

        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
          <header data-cf-in>
            <p className="label-mono">{project.context}</p>
            <h2 id="casefile-title" className="mt-2 font-display text-5xl font-bold tracking-tight sm:text-7xl">
              {project.name}
            </h2>
            {project.ribbon && (
              <p className="label-mono mt-4 inline-block rounded border border-signal/40 bg-signal/10 px-3 py-1.5 text-signal">
                <span aria-hidden className="star-badge mr-1 inline-block">
                  ★
                </span>
                {project.ribbon}
              </p>
            )}
            <p className="mt-6 max-w-3xl text-lg text-ink-muted">{project.tagline}</p>
            {project.role && (
              <p className="mt-4 max-w-3xl">
                <span className="label-mono mr-2 text-accent">my part</span>
                {project.role}
              </p>
            )}
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {project.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="label-mono text-ink hover:text-accent">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </header>

          <section data-cf-in className="mt-12">
            <p className="label-mono mb-4">
              <span className="text-accent">{"// "}</span>architecture
            </p>
            <ArchitectureDiagram steps={project.diagram} />
          </section>

          <div className="mt-12 grid gap-10 lg:grid-cols-[3fr_2fr]">
            <section data-cf-in>
              <p className="label-mono mb-4">
                <span className="text-accent">{"// "}</span>how it works
              </p>
              <ul className="space-y-4">
                {project.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden className="font-mono text-term">
                      &gt;
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {project.note && <p className="label-mono mt-6 normal-case">* {project.note}</p>}
            </section>
            <aside data-cf-in className="space-y-8">
              {(project.metric || project.award) && (
                <div className="rounded-md border border-rule bg-bg p-5">
                  <p className="label-mono">{project.metric ? "traction" : "award"}</p>
                  <p className={`mt-2 font-display text-3xl font-bold ${project.metric ? "text-accent" : "text-signal"}`}>
                    {project.metric ?? project.award}
                  </p>
                </div>
              )}
              <div>
                <p className="label-mono mb-3">stack</p>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li key={s}>
                      <Chip>{s}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <section data-cf-in className="mt-12 grid gap-6 lg:grid-cols-2">
            <MediaFrame
              src={project.imageSrc}
              alt={`${project.name} screenshot`}
              pending={project.image.split("/").pop()!}
              focus={project.imageFocus}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-video rounded-md border border-rule"
            />
            {videoId ? (
              <VideoFacade id={videoId} title={`${project.name} demo`} />
            ) : (
              <div className="label-mono grid aspect-video place-items-center rounded-md border border-dashed border-rule normal-case">
                live at {project.links[0]?.href.replace(/^https?:\/\//, "")}
              </div>
            )}
            {project.slug === "mira" && <MiraDetection />}
            {project.slug === "brain-invaders" && <ReactionDrill />}
          </section>

          <footer data-cf-in className="mt-16 flex justify-end border-t border-rule pt-6">
            <button
              type="button"
              onClick={() => swapCaseFile(next.slug)}
              className="label-mono text-ink hover:text-accent"
            >
              next case file: <span className="text-accent">{next.name} →</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

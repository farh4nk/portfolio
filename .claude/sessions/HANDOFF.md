# Project Handoff (updated 2026-10-13)

## Where we are
This is Farhan Khan's single-page portfolio: Next.js 16.4 static export, Tailwind v4, GSAP 3.15 and Lenis, served on Cloudflare Workers. Phases 1–5 of 6 are done and live at https://farhan-khan.farhank-dev.workers.dev. The private repo is https://github.com/farh4nk/portfolio, at `main` = `7f86052`.

The site has:
- **Boot intro and terminal.**
- **Hero:** the name, a typing role line, and the headshot top-right with a face-detection overlay that fades away.
- **Featured Projects:** a bento of Quenova, Brain Invaders (tall), MIRA (wide) and a full-width Cribby banner, each with a Flip case file. Below it is the hackathon timeline (6 events, 3 wins).
- **Experience:** a scroll-drawn circuit timeline.
- **Skills:** the pinned stack scene, with cards on mobile.
- **About:** text only. Then Contact.

All images and `resume.pdf` are in `public/`. The only placeholders left are the personal copy strings Farhan will write himself.

## Next steps (ordered)
1. **Phase 6** (about 1–2h):
   - Accessibility and keyboard audit: nav, case files, terminal, hackathon nodes.
   - Lighthouse ≥95 on mobile. Start by adding `preload` to the hero headshot `<Image>`; dev warns that it's the LCP. `components/ui/MediaFrame.tsx` needs a prop for this.
   - OG image, sitemap, Cloudflare Web Analytics, and a reduced-motion pass.
2. **Remind Farhan to fill the `[ TODO ]` copy** in `content/profile.ts` (`tagline`, `summary`, `bio`, `contactBlurb`) before he shares the site. Don't draft it for him.
3. **Ask Farhan to confirm** that hackathons 01–05 were all Fall 2025 (the `term` field in `content/projects.ts`).
4. **Open offers he hasn't answered:**
   - Rename the nav items "work" → "projects" and "stack" → "skills" (the headings already say Featured Projects and Skills).
   - An in-page resume preview overlay.

## Active blockers
- None.

## Standing decisions & constraints
- **Single long page** with anchor nav. Project detail lives in full-screen case files (`#work/<slug>`); Back or Esc closes them.
- **No custom cursor and no magnetic buttons.** He declined both.
- **Personal first-person copy is Farhan's.** Leave visible `[ TODO ]` placeholders and never draft it; this is saved in memory. Factual project copy is fine to write.
- **Copy accuracy:** only state what the code, Devpost or demos confirm.
  - Check stacks against the repo when one is public (e.g. Cribby omits ElevenLabs, which was dropped during the build).
  - Prize names: "Winner, EquiTech Track", "Best First-Time Hack", "Best Use of Presage" (no "[MLH]", per his request).
  - MIRA uses HTTP frame POSTs and YOLOv8, with no WebSockets and no depth estimation. He didn't pitch reciPal. LUNA has no backend link. Quenova links to the site only.
  - Team builds show his part via the `role` field, in his own Devpost words.
  - Staged animations are labeled as such (MIRA "detection pass · simulated").
- **Featured cards:** Quenova plus the winners (MIRA, Brain Invaders, Cribby). reciPal, LUNA and NutriScope stay compact in the hackathon timeline.
- **Layout choices he asked for:**
  - The headshot sits only in the hero; About has no portrait.
  - The hero schematic and the stats strip are removed.
  - The footer is the NYC clock plus the terminal hint, with no "built with" line.
- **No phone number.** The medical ed role stays generic. Hosting stays on `workers.dev` (he doesn't own `farhan.dev`; don't imply it).
- **Where things live:**
  - All copy is in `content/*.ts`.
  - Tokens are in `app/globals.css`.
  - GSAP plugins are registered once in `lib/gsap.ts` (`MOTION_OK`, `SCRAMBLE_CHARS` without `< > &`).
- **Motion rules:**
  - All animation goes through `gsap.matchMedia()`.
  - Content is hidden only under `html.js:not(.motion-reduced)`.
  - Anything above the fold waits for `whenBooted()` from `lib/events.ts`.
- **The repo stays private** until the MIRA-keys pointer is removed from `.claude/sessions/`. To publish: `gh repo edit farh4nk/portfolio --visibility public --accept-visibility-change-consequences`.

## Gotchas that remain true
- **Next 16.4 is newer than training data.** Read `node_modules/next/dist/docs/` (per `AGENTS.md`) before using unfamiliar APIs; the `next/image` `priority` prop is deprecated in favor of `preload`.
- **Dev HMR leaves `data-reveal` elements invisible** after an edit hot-reloads them. Tell Farhan to hard-reload (⌘⇧R); it's not a production bug.
- **Verifying motion:**
  - Headless `--screenshot` throttles rAF. Drive real Chrome over CDP (`--remote-debugging-port`, `Input.dispatchMouseEvent`/`mouseWheel`, `Emulation.setDeviceMetricsOverride` for a true 390px).
  - Set `sessionStorage.booted='1'` and reload to skip the boot intro.
- **Lenis:** it overrides native `scrollIntoView`; use `lib/scroll.ts` (`scrollToElement`, `lockScroll`). Overlays and scroll panels need `data-lenis-prevent`.
- **The pinned stack scene must call `ScrollTrigger.sort()` and `refresh()`** after creating its pin.
- **`[data-node]` is used by both** the timeline and the stack schematic. Scope selectors.
- **Images:** filenames must match `content/*.ts` exactly (`brain-invaders.jpg` is a jpg). Crop focus defaults to the top; set `imageFocus: "center"` for logos.
- **npm 11 install-script approvals:** esbuild, workerd and unrs-resolver are approved. New packages with install scripts need `npm install-scripts approve <pkg>`.
- **`turbopack.root: __dirname` is pinned** because of a stray `~/Code/package-lock.json`. Tailwind loads via the `@tailwindcss/turbopack` rule, not PostCSS.
- **Deploy:** `npm run deploy` (Wrangler is logged in). `npm run preview` or `npx serve out` serves the build locally.
- **The `!` bash prefix doesn't work in the VS Code extension.** Run interactive logins in the background.
- **Devpost blocks direct fetches.** Use `curl https://r.jina.ai/<url>`, adding `-H "X-Return-Format: html"` for prizes, team and tags.
- **Session preference:** ADHD mode is on. Lead with the next action, use numbered steps, cap lists at 5, use concrete time estimates, and skip filler.

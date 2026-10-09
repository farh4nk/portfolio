# Project Handoff (updated 2026-10-08)

## Where we are
This is Farhan Khan's single-page portfolio, built in Next.js 16.4 (static export), Tailwind v4 and GSAP 3.15, and served as static assets on Cloudflare Workers. Phase 1 of 6 is done and deployed to https://farhan-khan.farhank-dev.workers.dev. It has the design system ("Blueprint Terminal": dark default plus a light blueprint-paper theme), all real content in `content/`, a theme toggle, and a terminal-styled 404 page. The page is still an unpolished shell with no animation. `PLAN.md` is the source of truth for every section spec and animation.

## Next steps (ordered)
1. **Phase 2, the full static layout, per PLAN.md §4:**
   - Featured 3-card bento (Quenova, MIRA ★, Brain Invaders ★)
   - The 5-node hackathon strip, where non-winners expand into compact panels
   - Experience timeline layout and the About section (portrait, education, leadership, honors)
   - Contact section with a copy-email button
   - Assets go in `public/images/` (`portrait.jpg`, `quenova.png`, `mira.png`, `brain-invaders.png`) and `public/resume.pdf`. Ask whether he's added them, or use placeholders.
2. **Verify mobile at real phone width.** The headless Chrome capture at 390px looked clipped, likely a tooling artifact.
3. **Phase 3, core motion:** Lenis + ScrollTrigger, reveals, SplitText name, typewriter roles, scroll progress, scramble labels, count-ups, velocity marquee.
4. **Phase 4, signature pieces:** hero schematic, scroll-drawn circuit timeline, Flip case files, pinned stack scene, perception portrait.
5. **Phase 5:** boot intro and terminal easter egg. The Header's `>_` button isn't wired yet.
6. **Phase 6:** accessibility, reduced motion and Lighthouse ≥95, OG image, sitemap, Cloudflare Web Analytics.

## Active blockers
- Phase 2 media isn't provided yet. This doesn't block progress, since placeholders work.

## Standing decisions & constraints
- **Single long page** with anchor nav. Project detail lives in full-screen case-file overlays (GSAP Flip, `#work/<slug>`).
- **Hero centerpiece:** a live system schematic SVG with traveling pulses. Hovering a node highlights the related projects.
- **Motion extras:** terminal boot intro (once per session), terminal easter egg (`` ` `` / ⌘K), Lenis plus pinned scenes. **No custom cursor and no magnetic buttons.** He declined them.
- **Experience** is a scroll-drawn circuit timeline. **Stack** is a pinned scene, with no pinning below 768px. **About** uses the perception-overlay portrait.
- **Emphasis:** only Quenova, MIRA and Brain Invaders get full case files. reciPal, LUNA and NutriScope stay compact in the hackathon strip.
- **Hackathon order:** BYTE Hacks → NASA Space Apps → Hack Knight → SBUHacks ★ → HackRPI ★.
- **Copy accuracy:** only state what the code, Devpost or demos confirm. Use Devpost prize names ("Best First-Time Hack"). MIRA uses HTTP frame POSTs and YOLOv8, with no WebSockets and no depth estimation. He did not pitch reciPal. LUNA has no backend link, and its placeholder author names and researcher panel aren't real. Quenova links to the site only (its repo is private).
- **No phone number.** The medical ed role stays generic. Hosting stays on `workers.dev` with no custom domain.
- **All copy lives in `content/*.ts`.** Design tokens are in `app/globals.css`, and GSAP plugins are registered once in `lib/gsap.ts`.
- **Respect `prefers-reduced-motion`:** wrap all animation in `gsap.matchMedia()`, and hide content only under `html.js`.

## Gotchas that remain true
- **Next 16.4 is newer than training data.** Read `node_modules/next/dist/docs/` (per `AGENTS.md`) before using unfamiliar APIs. `cacheComponents` and `partialPrefetching` were removed because static export needs no server.
- **npm 11 install-script approvals:** esbuild, workerd and unrs-resolver are already approved. New packages with install scripts need `npm install-scripts approve <pkg>`.
- **`turbopack.root: __dirname` is pinned** because of a stray `~/Code/package-lock.json`.
- **Tailwind loads via the `@tailwindcss/turbopack` rule** in `next.config.ts`, not PostCSS.
- **Deploy:** `npm run deploy` (Wrangler is logged in). `npm run preview` serves the build locally.
- **The `!` bash prefix doesn't work in this VS Code extension.** Run interactive CLI logins in the background and have him approve in the browser.
- **Devpost blocks direct fetches.** Use `curl https://r.jina.ai/<url>` instead.
- **Headless Chrome screenshots** work via `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot=... --window-size=W,H` against `npx serve out`.
- **Session preference:** ADHD mode is on. Lead with the next action, use numbered steps, cap lists at 5, use concrete time estimates, and skip filler.

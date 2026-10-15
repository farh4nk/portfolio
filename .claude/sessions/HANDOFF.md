# Project Handoff (updated 2026-10-14, night)

## Where we are
Farhan Khan's single-page portfolio is **launched and complete**: all 6 phases are done, and the personal copy is filled in. Stack: Next.js 16.4 static export, Tailwind v4, GSAP 3.15 and Lenis, served on Cloudflare Workers at **https://portfolio.farhankhan.workers.dev** (worker `portfolio`, account subdomain `farhankhan`; renamed 2026-10-14 from `farhan-khan.farhank-dev.workers.dev`, which is now dead). The private repo is https://github.com/farh4nk/portfolio; `main` is pushed and deployed. Local Lighthouse: perf 91, a11y 100, best practices 100, SEO 100. Observed LCP is about 50–470 ms.

The site has:
- **Boot intro and terminal.** The terminal is lazy-loaded.
- **Hero:**
  - A pin icon with "NYC".
  - The name, the typing roles, and Farhan's tagline and summary.
  - The headshot with its face-detection overlay.
  - Resume CTA → preview overlay.
- **Featured Projects:** a bento grid whose cards open lazy-loaded case files, plus the hackathon timeline (6 events, 3 wins).
- **Experience:** Cornell Tech, The Bideshi and NYC DSS. The medical ed role was removed.
- **Skills, About** (3-paragraph bio) and **Contact** (the blurb wraps at the heading's width).
- **SEO and assets:** OG image, sitemap, robots, the FK. favicon, WebP images, and `_headers` cache rules.

## Next steps (ordered)
1. **Old worker cleanup:** confirm Farhan deleted the orphaned `farhan-khan` worker (dashboard → Workers & Pages → farhan-khan → Settings → Delete). `wrangler delete` was blocked by the permission classifier, so it's his to do.
2. **Otherwise nothing is required.** Wait for Farhan's next request.
3. **Optional: analytics.** Farhan creates a Web Analytics site in the dashboard (Analytics & Logs → Web Analytics → Add site → the workers.dev host), pastes the token into `profile.analyticsToken` in `content/profile.ts`, then deploys.
4. **Optional: phone number.** `public/resume.pdf` shows his phone number, which conflicts with the "no phone number" rule. He decides whether to swap the PDF.
5. **Optional:**
   - Responsive `srcset` images (~105 KiB on mobile).
   - Remind him to run LinkedIn Post Inspector before he shares.
   - Make the repo public, after removing the MIRA-keys pointer from `.claude/sessions/`.

## Active blockers
- None.

## Standing decisions & constraints
- **Single long page** with anchor nav. Project detail lives in full-screen case files (`#work/<slug>`); Back or Esc closes them.
- **Nav labels stay "work" and "stack".** Farhan declined the rename.
- **No custom cursor and no magnetic buttons.** He declined both.
- **Personal first-person copy is Farhan's.** Never draft it (saved in memory). Fixing clear typos is fine, but say so. The copy lives in `content/profile.ts`: `tagline`, `summary`, `bio[]` and `contactBlurb`.
- **Copy accuracy:** only state what the code, Devpost or demos confirm.
  - Prize names: "Winner, EquiTech Track", "Best First-Time Hack", "Best Use of Presage" (no "[MLH]").
  - MIRA uses HTTP frame POSTs and YOLOv8, with no WebSockets and no depth estimation. He didn't pitch reciPal. LUNA has no backend link. Quenova links to the site only. Cribby omits ElevenLabs.
  - Team builds show his part via the `role` field.
  - Staged animations are labeled (MIRA "detection pass · simulated").
- **Experience:** no medical ed platform role until it's public. A role is "current" only if its `dates` contains "Present".
- **Hero location line:** pin icon plus `profile.city` only. No `//`, no "software engineer", and no skyline icon (tried; he rejected it). The terminal `whoami` still uses `profile.kicker`.
- **Hackathon terms:** 01–05 are Fall 2025, 06 is Fall 2026.
- **Featured cards:** Quenova plus the winners (MIRA, Brain Invaders, Cribby). The rest stay in the timeline.
- **Layout:**
  - The headshot is in the hero only.
  - No stats strip.
  - The footer is the NYC clock plus the terminal hint.
- **No phone number on the site.** Hosting stays on `workers.dev` (he's fine with that suffix); don't imply he owns a custom domain.
- **The account subdomain `farhankhan` is shared** by every worker on the account (`portfolio`, `quenova` (also `quenova.app`), `project-luna` (dead project)). Changing it renames all their workers.dev URLs; it can only be changed in the dashboard (the API PUT returns 10036 "Account already has an associated subdomain").
- **Resume preview:** desktop only (`canPreviewResume`). `ResumeLink` stays a real `<a>` and only intercepts plain left-clicks.
- **Where things live:**
  - All copy is in `content/*.ts`.
  - Tokens are in `app/globals.css`.
  - GSAP core plugins (ScrollTrigger, SplitText, ScrambleText) are registered in `lib/gsap.ts`. Flip is registered in the lazy `CaseFile.tsx`.
  - Don't import heavy modules into the main bundle: overlays load via `TerminalLauncher` and `CaseFileController` (`next/dynamic`, `ssr: false`), and Lenis is a dynamic import.
- **Motion rules:**
  - All animation goes through `gsap.matchMedia()`.
  - Content is hidden only under `html.js:not(.motion-reduced)`. The class is kept in step with OS changes by the pre-paint script.
  - Anything above the fold waits for `whenBooted()`.
  - The hero hide rules are `:not(.booting)` so LCP lands on first paint. Don't move them.
- **Modals** (case file, terminal, resume):
  - Inert `body > header, main, footer`.
  - Call `lockScroll`.
  - Use `data-lenis-prevent`.
  - Focus the close button via `gsap.delayedCall(0.05)`; the dialog starts out `visibility: hidden`.
  - Restore focus on close.
- **The repo stays private** until the MIRA-keys pointer is removed from `.claude/sessions/`.

## Gotchas that remain true
- **Next 16.4 is newer than training data.** Read `node_modules/next/dist/docs/` first.
  - Metadata routes need `export const dynamic = "force-static"` under `output: "export"`.
  - The `/opengraph-image` output has no file extension; `public/_headers` sets its PNG type.
- **Images:** `unoptimized: true`, so files in `public/images/` must already be WebP at display size (`cwebp -q 80 -m 6`). Filenames must match `content/*.ts`. Set `imageFocus: "center"` for logos.
- **Dev HMR leaves `data-reveal` elements invisible.** Hard-reload (⌘⇧R); it's not a production bug.
- **Verifying in Chrome over CDP:**
  - Launch real Chrome with `--remote-debugging-port=9333` and call `Page.bringToFront`, or rAF throttles and GSAP never completes.
  - Screenshot clips use page coordinates (add `scrollY`).
  - Skip the boot intro with `sessionStorage.booted='1'` plus a reload.
  - Write Node output to a file.
- **Lenis overrides `scrollIntoView`.** Use `lib/scroll.ts`.
- **The pinned stack scene must call `ScrollTrigger.sort()` and `refresh()`.** `[data-node]` is shared, so scope selectors.
- **npm 11 install-script approvals:** esbuild, workerd and unrs-resolver are approved.
- **`turbopack.root: __dirname` is pinned**, and Tailwind loads via the `@tailwindcss/turbopack` rule.
- **Deploy:** `npm run deploy`. For about a minute afterwards, new files can 404 on some edges while it propagates.
- **Local preview:** `npx wrangler dev --port 8788` applies `_headers`; `npx serve out` doesn't.
- **ESLint ignores `.wrangler/**`.**
- **The `!` bash prefix doesn't work in the VS Code extension.** Devpost blocks fetches, so use `r.jina.ai`. Gamma returns 403 to curl but is fine in a browser.
- **Lighthouse:** `npx -y lighthouse@12 <url> --quiet --chrome-flags="--headless=new" --output=json`. Check `observedLargestContentfulPaint`. Local simulated perf reads lower than live.
- **Session preference:** ADHD mode is on. Lead with the next action, use numbered steps, cap lists at 5, give concrete time estimates, and skip filler.

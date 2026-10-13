# Portfolio Build Plan — Farhan Khan

**Concept:** "Blueprint Terminal." The page looks like an engineering drawing being run from a dev console. A dark navy-black base carries a faint blueprint grid, technical type and monospace labels. Wires and data pulses tie every section back to one idea: *systems that see, serve, and scale*. The three verbs match your perception work (MIRA, the robot), backend work (FastAPI, Supabase) and edge work (Cloudflare).

**Locked decisions**

| Area | Choice |
|---|---|
| Look | Blueprint lab mixed with dark terminal (dark by default, light "blueprint paper" toggle) |
| Type | Technical: Space Grotesk headings, Inter body, JetBrains Mono for labels and the terminal |
| Hero | Live system schematic, plus the name sliding up and the typing role line |
| Format | Single long page with anchor nav |
| Projects | Bento grid; each card expands into a full-screen "case file" (GSAP Flip) |
| Experience | Scroll-drawn circuit timeline |
| Motion extras | Terminal boot intro, terminal easter egg, Lenis smooth scroll and pinned scenes |
| Not included | Custom cursor and magnetic buttons |
| Assets | Portrait and project screenshots are ready |
| Hosting | `*.workers.dev` subdomain for now; add a custom domain later |
| Contact | Email, GitHub, LinkedIn, resume. **No phone number.** |
| Medical Ed role | Kept generic (no name or link) |

---

## 1. Tech stack

| Layer | Pick | Why |
|---|---|---|
| Framework | Next.js (App Router), static export (`output: 'export'`) | Already on your resume, and you can iterate fast in it |
| Language | TypeScript | |
| Styling | Tailwind CSS v4 plus CSS custom properties for tokens | |
| Animation | GSAP 3.13+ with `@gsap/react`, using ScrollTrigger, Flip, SplitText, DrawSVG, MotionPath and ScrambleText | All of these plugins are free since 3.13 |
| Smooth scroll | Lenis, synced to the GSAP ticker | |
| Hosting | Cloudflare Workers static assets (same setup as Quenova) | Includes a GitHub Actions CI deploy |
| Analytics | Cloudflare Web Analytics | No cookies, so no consent banner |

---

## 2. Design system

### Color tokens

| Token | Dark (default) | Light ("blueprint paper") | Used for |
|---|---|---|---|
| `--bg` | `#070B14` | `#F4F1E8` | page |
| `--bg-raised` | `#0D1424` | `#ECE7DA` | cards, terminal |
| `--grid` | `rgba(91,192,235,.07)` | `rgba(27,36,51,.08)` | background grid (32px minor, 160px major) |
| `--rule` | `#1E2A40` | `#DDD6C6` | borders, dividers |
| `--ink` | `#E6EDF7` | `#1B2433` | body text |
| `--ink-muted` | `#8A97AD` | `#5B6478` | metadata |
| `--accent` | `#5BC0EB` blueprint cyan | `#2F5BEA` drafting blue | wires, links, focus |
| `--term` | `#3DFFA2` phosphor | `#0B7A53` | prompts, `[ OK ]`, pulses |
| `--signal` | `#FF6B35` safety orange | `#E8572A` | awards and stars only (use sparingly) |

### Type scale
- Display: Space Grotesk 700, `clamp(3rem, 9vw, 8rem)`, tight tracking (−0.04em), uppercase name
- Headings: Space Grotesk 500
- Body: Inter 400, 17–18px, line-height 1.6
- Labels: JetBrains Mono 12–13px, uppercase, +0.08em tracking, e.g. `// 02 — EXPERIENCE`

### Motifs
- Blueprint grid behind everything, drifting at about 0.3× scroll speed (parallax)
- Corner registration marks (`┼`) on cards, like a technical drawing
- Mono "annotations" next to headings, like dimension callouts: `← 14k pageviews`
- Cards use 1px `--rule` borders and small radii (6px), with no heavy shadows

---

## 3. Page map (single page)

```
┌─ BOOT INTRO (first visit per session, ~1.6s, skippable) ─────────┐
├─ HEADER  FK · [01]work [02]experience [03]stack [04]about [05]contact · >_ · ◐
├─ ━━━━━━━━ scroll progress hairline (cyan) ━━━━━━━━━━━━━━━━━━━━━━━┤
│                                                                   │
│  HERO        name + typing role + tagline + CTAs │ live schematic │
│  STATS       3.99 GPA · 14k+ pageviews · 5 hackathons/2 wins · 1 of 9
│  MARQUEE     PYTHON · TYPESCRIPT · FASTAPI · PYTORCH · SUPABASE ···
│  01 WORK     3 featured cards (Quenova, MIRA ★, Brain Inv ★)      │
│              → full-screen case files                             │
│              + "Fall '25 hackathon run" strip (5 events)          │
│  02 EXPER.   scroll-drawn circuit timeline (4 roles)              │
│  03 STACK    PINNED scene: schematic zooms node by node           │
│  04 ABOUT    perception-overlay portrait + bio + education + honors
│  05 CONTACT  "Let's build something." + copy-email + links        │
│  FOOTER      live NYC clock                                       │
└───────────────────────────────────────────────────────────────────┘
        ` or ⌘K anywhere → TERMINAL EASTER EGG overlay
```

---

## 4. Section specs and animations

### 0. Boot intro
- Full-screen `--bg` overlay. Mono lines type out quickly (about 25ms per character):
  ```
  [ OK ] mounting /home/farhan
  [ OK ] loading perception module ........ dlib
  [ OK ] starting api server .............. :8000
  [ OK ] deploying to edge ................ cloudflare
  > ready_
  ```
- Next, the blueprint grid draws outward from the center (scaled lines, staggered). The overlay then wipes up with a `clip-path` inset, and the hero timeline starts.
- Shown only once per session (`sessionStorage`). Any key or click skips it. It never shows when the visitor prefers reduced motion.
- The hero renders underneath from the start, so the intro doesn't delay page load metrics.

### Header
- A mono nav whose active section highlights as you scroll (ScrollTrigger on each section).
- Hides when scrolling down and slides back in when scrolling up. Gains a backdrop blur after 8px of scroll.
- `>_` button opens the terminal, which is how mobile users get to it. `◐` toggles the theme.
- Scroll progress: a 1px cyan bar scrubbed with `scaleX`.

### Hero
- **Kicker:** `// software engineer · new york`. Scrambles from random characters into the text (ScrambleText).
- **Name:** `FARHAN KHAN`. SplitText into characters, each sliding up from `yPercent: 110` with a 0.03s stagger.
- **Role line (mono, typing):** cycles through `backend systems` → `robotics & perception` → `full-stack products` → `applied AI at the edge`, with a blinking `▍` cursor. Types at 55ms and deletes at 35ms per character.
- **Tagline:** "I build systems that see, serve, and scale."
- **Supporting line:** "Production experience across full-stack architecture, low-latency ML pipelines, and embedded robotics."
- **CTAs:** `[ View work ↓ ]` and `[ Resume ↗ ]`
- **Live system schematic (the signature piece):** an SVG of your stack as a circuit:
  ```
  [Camera/OpenCV]──●──[YOLOv8 · PyTorch]──●──[FastAPI]──●──[Gemini · ElevenLabs]
        │                                       │
  [Pi 5 · dlib]            [Django · Express]──●──[Postgres · Mongo]
                                                │
                     [CF Workers + AI]──●──[React UI]
  ```
  Which items each node highlights (featured cards first, then hackathon-strip nodes in parentheses):

  | Node | Highlights |
  |---|---|
  | Camera/OpenCV | MIRA, Cornell Tech robot (NutriScope) |
  | YOLOv8 · PyTorch, FastAPI | MIRA |
  | Gemini · ElevenLabs | MIRA (reciPal, NutriScope) |
  | Pi 5 · dlib | Cornell Tech robot (experience node) |
  | Django · Express | Brain Invaders (reciPal) |
  | Postgres · Mongo | Quenova, The Bideshi, Brain Invaders |
  | CF Workers + AI | Quenova (LUNA) |
  | React UI | everything |

  - On load, the wires draw in (DrawSVG, staggered), then the nodes pop in.
  - Data pulses (small `--term` dots) travel along the wires in a loop (MotionPath), with random delays so it feels alive.
  - **Hovering or tapping a node** shows a tooltip (tool name plus a one-line use) and highlights the project cards that use it, dimming the rest. Example: CF Workers lights up Quenova and LUNA.
  - **Clicking a node** smooth-scrolls to the first project that uses it.
  - The grid behind it tilts subtly with the mouse (a few px, desktop only).
  - Mobile: the schematic stacks vertically below the text, with slower pulses and tap-to-highlight.

### Stats strip and marquee
- Numbers count up when they enter view: `3.99` GPA · `14,000+` Quenova pageviews · `5` hackathons / `2` wins · `1 of 9` Cornell Tech researchers.
- Below that, an infinite mono marquee of your stack. Its speed and skew react to scroll velocity: scrolling faster makes it run faster and lean further.

### 01 Work: featured case files and the hackathon run
**Emphasis rule:** Quenova (production, real traction) and the two winners (MIRA, Brain Invaders) are the only full case-study cards. The other three hackathon builds (reciPal, LUNA, NutriScope) live inside the hackathon-run strip as compact entries.

**A. Featured bento (3 cards)**
- **Layout (desktop):**
  ```
  ┌───────────────────────────┬─────────────┐
  │ QUENOVA (2×1)             │ MIRA ★      │
  │ live · 14k pageviews      │ (1×2)       │
  ├───────────────────────────┤ SBUHacks    │
  │ BRAIN INVADERS ★ (2×1)    │ EquiTech    │
  │ HackRPI · Best First-Time │ winner      │
  └───────────────────────────┴─────────────┘
  ```
  On tablet it becomes 2 columns, and on mobile a single column.
- **Winner treatment:** the `★` badge in `--signal` slowly rotates a few degrees and glows, and a mono ribbon reads `WINNER · SBUHACKS 2025 · EQUITECH TRACK`.
- **Card hover:** the screenshot zooms to 1.04, the corner registration marks slide outward, and a mono annotation appears (`← 14k pageviews`, `← EquiTech winner`).
- **Reveal:** cards fade up in a staggered batch.
- **Click → case file:** GSAP Flip morphs the card into a full-screen overlay. It contains:
  - Header: name, context (e.g. "SBUHacks 2025 · ★ Winner, EquiTech Track"), and links
  - **Architecture diagram:** a mini schematic built from the hero's SVG components, with wires that draw in
  - Stack chips, 3–4 bullets, and a metric or award callout
  - Media: a screenshot gallery plus the demo video. Use a click-to-play facade (thumbnail first, the iframe loads only when clicked) so YouTube doesn't slow the page.
- The URL updates to `#work/mira`, so case files can be linked directly and the browser Back button closes them. Esc closes too. Focus is trapped inside while open, and the page scroll locks.

**B. Fall '25 hackathon run (5 events, in order)**
- A horizontal wire draws left to right as the strip scrolls into view, and each event pops in as a node.
  - **Winning nodes are large `★` nodes.** When the wire reaches one, it flashes with a small `--signal` particle burst, and clicking it opens that project's case file.
  - **Other nodes are small `●` dots.** Clicking one expands a compact panel under the strip with a one-line pitch, 2–3 bullets, stack chips and links. There is no full case file and no screenshot gallery.
- On mobile it becomes a vertical list of expandable rows.
  ```
   01 ●── BYTE Hacks ─────── reciPal
   02 ●── NASA Space Apps ── LUNA
   03 ●── Hack Knight ────── NutriScope
   04 ★── SBUHacks ───────── MIRA            EquiTech Track winner
   05 ★── HackRPI ────────── Brain Invaders  Best First-Time Hack
         5 hackathons · 1 semester · 2 wins
  ```

#### Project content sheet (checked against Devpost, the repos and the demos)

*Featured: full case files*

**Quenova** · Summer 2026 · [quenova.app](https://quenova.app) (repo is private, so link to the site only)
- *Tagline:* A research workspace for publications, documents, to-dos and literature, built for teams.
- *Stack:* React, TypeScript, Supabase (Postgres), Cloudflare Workers, GitHub Actions
- *Bullets:*
  - Multi-tenant isolation enforced in the database with Postgres Row-Level Security
  - Invite-based editor and viewer roles
  - Serverless routing on Cloudflare Workers
  - A CI pipeline that blocks failed builds
- *Metric:* 14,000+ pageviews

**MIRA** · SBUHacks 2025 · ★ Winner, EquiTech Track · team of 4
- *Tagline:* A real-time vision assistant that turns a camera feed into spoken guidance for blind and low-vision users.
- *Stack:* Python, FastAPI, PyTorch, YOLOv8 (Ultralytics), OpenCV, React, Tailwind, Gemini, ElevenLabs
- *Bullets:*
  - The React client captures camera frames and posts them to a FastAPI `/analyze` endpoint, where YOLOv8 and OpenCV detect objects in each frame.
  - A custom risk scorer ranks each detection by class weight, proximity (bounding-box size) and motion toward the center of the frame. It then tags the detection left, center or right, and info, important or critical.
  - A queue feeds alerts like "car on your left" to ElevenLabs text-to-speech. Snapshot mode sends the frame to Gemini 2.5 Flash for a full scene description.
  - It is hands-free: voice commands ("live" or "snapshot") go through the Web Speech API.
- *Links:* [GitHub](https://github.com/farh4nk/MIRA) · [Demo](https://www.youtube.com/watch?v=bWBrbfu0Abs) · [Devpost](https://devpost.com/software/mira-wgsiub)
- *Case-file diagram:* camera → frame POST → YOLOv8 → risk scorer → alert queue → ElevenLabs
- *Case-file touch:* the diagram plays a fake detection pass, where a bounding box labeled `car · left · critical` snaps on and an audio-wave line pulses

**Brain Invaders** · HackRPI 2025 · ★ Winner, Best First-Time Hack · team of 3
- *Tagline:* A Space Invaders-style game that trains impulse control, response inhibition and timing.
- *Stack:* Phaser.js, React, Node, Express, MongoDB, Chart.js
- *Bullets:*
  - The game runs on Phaser scenes (start, calibration, game, game over, past sessions). A timing-window mechanic penalizes premature shots.
  - It tracks reaction time, premature inputs, missed windows, accuracy and streaks in real time, and the difficulty adapts to the player.
  - Authenticated accounts are stored in Express and MongoDB, and an end-of-round analytics dashboard shows progress across sessions.
- *Links:* [GitHub](https://github.com/deyan-reza/BrainInvaders) · [Demo](https://www.youtube.com/watch?v=Cld4ErQqrNc) · [Devpost](https://devpost.com/software/space-invaders-impulse-control-trainer)
- *Case-file touch:* a playable 10-second "don't shoot yet" timing mini-game that reports your reaction time

*Hackathon run: compact panels only*

**reciPal** · BYTE Hacks 2025 · team of 5
- *Pitch:* Turns cooking videos from social media into recipes, then tells you what to buy.
- *Bullets:*
  - yt-dlp and FFmpeg pull the audio from an Instagram or YouTube link, and Gemini turns it into a structured recipe.
  - The pantry tracks ingredients by barcode scan (Open Food Facts).
  - A grocery list compares saved recipes with the pantry and suggests substitutes you already have.
- *Stack:* React, Django REST Framework, SQLite, Gemini, FFmpeg
- *Links:* [GitHub](https://github.com/farh4nk/reciPal) · [Demo](https://www.youtube.com/watch?v=7EKcPbCa5ow) · [Devpost](https://devpost.com/software/recipal)

**LUNA** · NASA Space Apps Challenge 2025
- *Pitch:* Ask a space-biology question and get an answer synthesized from research papers, with the sources listed.
- *Bullets:*
  - The search interface sends questions to a Cloudflare Worker `/rag` endpoint. The Worker returns a synthesized answer plus ranked papers with relevance scores and summaries.
  - "Compare with ChatGPT" puts LUNA's answer next to a general LLM's answer.
- *Stack:* React, TypeScript, Vite, shadcn/ui, Cloudflare Workers
- *Links:* [GitHub (frontend)](https://github.com/farh4nk/luna-engine) · [Demo](https://www.loom.com/share/7df64cc3d5ad475bbf5fd97f26bd3d75)
- *Note:* the backend code is lost, so the site doesn't link to it. Don't feature the "Top Researchers" panel or the author names from the demo, because those are placeholder data in the repo.

**NutriScope** · Hack Knight
- *Pitch:* Snap a photo of a meal to see which food groups you've covered today and which are still missing.
- *Bullets:*
  - A photo of a meal identifies the food, and the app tracks daily food-group coverage.
  - A Gemini-powered chatbot answers questions with context about what you've eaten.
- *Stack:* Gemini (plus whatever else was used; not confirmed)
- *Links:* [Presentation](https://gamma.app/docs/NutriScope-98lzn02epr1076r?mode=doc)

### 02 Experience: circuit timeline
- A vertical "wire" runs down the left side. It draws as you scroll (DrawSVG scrubbed to the section's scroll progress).
- Each role is a node. When the wire reaches it, the node lights up (`--accent` fill plus an expanding pulse ring) and its bullets type in as log lines (`> ...`).
- Roles, newest first:
  1. **Primary Software Engineer (Founding)** · Medical Education Platform · Aug 2026 – present
  2. **Undergraduate Research Intern** · Cornell Tech AI & Robotics Lab · May – Aug 2026
  3. **Software Engineer Intern** · The Bideshi · Jan – Jun 2026
  4. **Desktop Support Intern** · NYC Dept. of Social Services · Jul – Aug 2025
- Mobile: the same wire sits at the left edge with a narrower layout.

### 03 Stack: pinned scene
- The section **pins** for about 6 scroll steps (`scrub: 0.5`). A large version of the hero schematic zooms and pans to one node group per step, while a side panel crossfades its tools:
  1. Languages (Python, TypeScript, SQL, C++, Java, Bash)
  2. Frontend (React, Next.js, Redux, Tailwind, Phaser)
  3. Backend & Systems (Node, Express, FastAPI, REST, WebSockets)
  4. Cloud, Edge & Data (Supabase/Postgres, MongoDB, CF Workers AI, Vectorize, Docker)
  5. ML & Perception (PyTorch, OpenCV, dlib, RAG, Gemini, ElevenLabs)
  6. Hardware (Raspberry Pi 5, ESP32, sensor/actuator control loops)
- A step counter shows `03 / 06` in mono.
- **Below 768px the pin is turned off** and the section becomes six stacked cards, because pinning is unreliable on mobile.

### 04 About
- **Perception portrait:** your photo enters with a scan line sweeping down. Landmark dots plot onto the face, and a bounding box snaps in labeled `farhan · 0.99`. The overlay then fades to about 30% and stays as a subtle detail. This nods to MIRA and the dlib face recognition work.
- Bio: written by Farhan himself (`profile.bio`). Claude leaves placeholders and never drafts personal copy.
- **Education card:** CCNY, Macaulay Honors · B.S. Computer Science · May 2028 · GPA 3.99 · Dean's List · S Jay Levy Fellow. Coursework appears as mono chips.
- **Leadership:** MHC++ Vice President · HackMHC++ founding organizer and host · MSO.
- **Honors:** short "achievement unlocked" chips that pop in with a slight overshoot: SBUHacks 2025 Winner, EquiTech Track · HackRPI 2025 Best First-Time Hack · CodePath Web102 Honors.

### 05 Contact and footer
- Headline: "Let's build something." Each word reveals in turn.
- **Copy-email button:** click to copy `farhank.dev@gmail.com`. The label scrambles to `copied ✓`, then back.
- Links: GitHub, LinkedIn, Resume PDF.
- Footer: live NYC clock (`NYC 14:07:32`) · `press \` for terminal` hint.

### Terminal easter egg
- Opens with `` ` `` or `⌘K`/`Ctrl+K` (desktop), or the header `>_` button (all devices). Slides down from the top as a translucent `--bg-raised` panel.
- Commands:
  - `help`, `whoami`, `ls projects`, `open <project>` (opens that case file)
  - `cat resume` (prints a summary plus a download link), `experience`, `skills`, `contact`
  - `theme dark|light`, `boot` (replays the intro), `clear`, `exit`
  - Fun extras: `sudo hire farhan` (playful "permission granted" plus a mailto link), `rm -rf /` ("nice try")
- Tab completion, ↑/↓ history, and blinking block cursor. Unknown commands print `command not found: x — try 'help'`.

### Global motion rules
- Lenis smooth scroll on desktop. Touch devices keep native scroll.
- Section labels scramble-decode the first time they enter view.
- Generic `data-reveal` fade-up (`y: 24 → 0`, `power3.out`, 0.7s), with staggered groups.
- All animation code goes through `gsap.matchMedia()`. Under `prefers-reduced-motion: reduce` there is no intro, no pins, no smooth scroll and no typing, and all content is visible immediately.
- Content is hidden for animation only after JS adds an `html.js` class, so the site still reads fine without JavaScript.

---

## 5. Project structure

```
app/
  layout.tsx          fonts (next/font), theme + js-class inline script, metadata, JSON-LD
  page.tsx            composes the sections
  globals.css         tokens, grid background, base styles
components/
  BootIntro.tsx  Header.tsx  ScrollProgress.tsx  SmoothScroll.tsx
  hero/       Hero.tsx  Schematic.tsx  schematic-graph.ts (nodes, edges, project map)
  work/       BentoGrid.tsx  ProjectCard.tsx  CaseFile.tsx
  experience/ CircuitTimeline.tsx
  stack/      StackExplorer.tsx
  about/      About.tsx  PerceptionPortrait.tsx
  contact/    Contact.tsx  Footer.tsx
  terminal/   Terminal.tsx  commands.ts
  ui/         SectionLabel.tsx (scramble)  CountUp.tsx  Marquee.tsx  Chip.tsx
lib/
  gsap.ts     registers plugins once
content/      ← ALL copy lives here; edit text without touching components
  profile.ts  projects.ts  experience.ts  skills.ts
public/
  images/  video/  resume.pdf  og.png
```

---

## 6. Build phases

Estimates assume you are building alongside Claude Code.

| # | Phase | Output you can see | Time |
|---|---|---|---|
| 0 | **Assets** (you) | Portrait (≥1200px, plain background), 1600px-wide screenshots per project, MIRA demo clip (≤10s mp4), `resume.pdf` | 30–45 min |
| 1 | **Scaffold + design system** | Next.js + Tailwind + fonts + tokens + grid background + theme toggle + `content/` files. **Deployed to Cloudflare** with a live preview URL. | 1–2 h |
| 2 | **Static layout** | Every section built and responsive with no animation. **Shippable at this point.** | 2–3 h |
| 3 | **Core motion** | Lenis, reveals, hero name and typing, scroll progress, header behavior, scramble labels, count-ups, marquee | 2–3 h |
| 4 | **Signature pieces** | Hero schematic → circuit timeline → bento/case file → pinned stack → perception portrait | 5–7 h |
| 5 | **Boot intro + terminal** | Intro sequence and a working terminal overlay | 2–3 h |
| 6 | **Polish + launch** | Reduced-motion pass, accessibility audit, Lighthouse ≥95, OG image, sitemap, analytics, final `workers.dev` URL | 1–2 h |

**Total: about 14–20 hours.** Because Phase 2 is shippable, there is a real site live early and every phase after it improves it.

### Launch checklist
- [ ] Lighthouse ≥95 for Performance, Accessibility and SEO on mobile
- [ ] Reduced-motion mode tested (macOS: System Settings → Accessibility → Display → Reduce motion)
- [ ] Keyboard-only pass: tab through nav, open and close a case file, open and close the terminal
- [ ] Tested on an iPhone-width viewport (pins disabled, schematic stacked)
- [ ] OG image renders in a LinkedIn post preview

---

## 7. Open items

**All resolved:**
- Hosting on a `workers.dev` subdomain
- No phone number
- Medical ed role kept generic
- Quenova links to the site only
- LUNA has no backend link
- The Devpost prize name is used ("Best First-Time Hack")
- The hackathon order is BYTE → NASA → Hack Knight → SBUHacks → HackRPI
- Winners are featured and the other builds are compact

**Content rule:** copy only states what the code, Devpost or the demos confirm.

## 8. Later (after launch)
- A cursor "spotlight" that brightens the grid near the mouse. This is a background effect, not a custom cursor.
- Keystroke sounds in the terminal (off by default)
- A "currently" status widget (what you're building or reading)
- Short write-ups and blog posts on Quenova's RLS design and MIRA's latency work

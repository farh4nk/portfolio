export type Link = { label: string; href: string };

export type FeaturedProject = {
  slug: string;
  name: string;
  context: string;
  award?: string;
  tagline: string;
  stack: string[];
  bullets: string[];
  metric?: string;
  /** Farhan's own part in a team build, in his words from Devpost. Shown in the case file. */
  role?: string;
  /** Caveat shown under the case-file bullets. */
  note?: string;
  /** Mono callout shown next to the card, e.g. "← 14k pageviews". */
  annotation: string;
  /** Ribbon on winning cards. */
  ribbon?: string;
  /** Screenshot under /public. A placeholder renders until the file exists. */
  image: string;
  /** Which part of the image stays visible when the card crops it. Defaults to the top (screenshots). */
  imageFocus?: "top" | "center";
  diagram: string[];
  links: Link[];
};

export type HackathonEntry = {
  /** Used by the terminal's `open`; winners share their featured card's slug. */
  slug: string;
  order: number;
  event: string;
  /** Term the hackathon ran in, e.g. "Fall 2025". */
  term: string;
  project: string;
  /** Winners link to a featured case file by slug. */
  featuredSlug?: string;
  award?: string;
  pitch?: string;
  bullets?: string[];
  stack?: string[];
  links?: Link[];
};

// Full case files: Quenova plus the winners.
export const featured: FeaturedProject[] = [
  {
    slug: "quenova",
    name: "Quenova",
    context: "Production web app · Summer 2026",
    tagline:
      "A research workspace for publications, documents, to-dos and literature, built for teams.",
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Cloudflare Workers", "GitHub Actions"],
    bullets: [
      "Multi-tenant data isolation enforced in the database with PostgreSQL Row-Level Security.",
      "Invite-based editor and viewer roles so research teams can co-manage projects.",
      "Serverless routing and delivery on Cloudflare Workers.",
      "GitHub Actions CI pipeline that blocks failed builds before deploy.",
    ],
    metric: "14,000+ pageviews",
    annotation: "← 14k pageviews",
    image: "/images/quenova.webp",
    diagram: ["React UI", "Cloudflare Workers", "Supabase Auth", "Postgres + RLS"],
    links: [{ label: "Live", href: "https://quenova.app" }],
  },
  {
    slug: "mira",
    name: "MIRA",
    context: "SBUHacks 2025 · team of 4",
    award: "Winner, EquiTech Track",
    tagline:
      "A real-time vision assistant that turns a camera feed into spoken guidance for blind and low-vision users.",
    stack: ["Python", "FastAPI", "PyTorch", "YOLOv8", "OpenCV", "React", "Tailwind", "Gemini", "ElevenLabs"],
    bullets: [
      "The React client captures camera frames and posts them to a FastAPI /analyze endpoint, where YOLOv8 and OpenCV detect objects in each frame.",
      "A custom risk scorer ranks each detection by class weight, proximity (bounding-box size) and motion toward the frame center, then tags it left / center / right and info / important / critical.",
      "A queue feeds alerts like “car on your left” to ElevenLabs text-to-speech; snapshot mode sends the frame to Gemini for a full scene description.",
      "Hands-free: “live” and “snapshot” voice commands via the Web Speech API.",
    ],
    annotation: "← EquiTech winner",
    ribbon: "Winner · SBUHacks 2025 · EquiTech Track",
    image: "/images/mira.webp",
    imageFocus: "center",
    diagram: ["Camera", "Frame POST", "YOLOv8", "Risk scorer", "Alert queue", "ElevenLabs"],
    links: [
      { label: "GitHub", href: "https://github.com/farh4nk/MIRA" },
      { label: "Demo", href: "https://www.youtube.com/watch?v=bWBrbfu0Abs" },
      { label: "Devpost", href: "https://devpost.com/software/mira-wgsiub" },
    ],
  },
  {
    slug: "brain-invaders",
    name: "Brain Invaders",
    context: "HackRPI 2025 · team of 3",
    award: "Best First-Time Hack",
    tagline:
      "A Space Invaders-style game that trains impulse control, response inhibition and timing.",
    stack: ["Phaser.js", "React", "Node", "Express", "MongoDB", "Chart.js"],
    bullets: [
      "Phaser scenes for start, calibration, gameplay, game over and past sessions; a timing-window mechanic penalizes premature shots.",
      "Tracks reaction time, premature inputs, missed windows, accuracy and streaks in real time, with difficulty that adapts to the player.",
      "Authenticated accounts on Express + MongoDB and an end-of-round analytics dashboard for progress across sessions.",
    ],
    annotation: "← Best First-Time Hack",
    ribbon: "Best First-Time Hack · HackRPI 2025",
    image: "/images/brain-invaders.webp",
    diagram: ["Phaser game", "Behavior tracker", "Adaptive difficulty", "Express API", "MongoDB", "Dashboard"],
    links: [
      { label: "GitHub", href: "https://github.com/deyan-reza/BrainInvaders" },
      { label: "Demo", href: "https://www.youtube.com/watch?v=Cld4ErQqrNc" },
      { label: "Devpost", href: "https://devpost.com/software/space-invaders-impulse-control-trainer" },
    ],
  },
  {
    slug: "cribby",
    name: "Cribby",
    context: "Hack Knight Fall 2026 · team of 4",
    award: "Best Use of Presage",
    tagline:
      "A baby monitor that also reads vitals: Presage estimates breathing and heart rate from the nursery camera, so nothing ever touches the baby.",
    stack: ["Python", "FastAPI", "C++", "Presage SmartSpectra", "OpenCV", "Raspberry Pi", "Next.js", "Tailwind", "WebSockets", "Tiger Data", "Gemini", "Docker", "Tailscale"],
    bullets: [
      "A Raspberry Pi 4 streams the crib camera to a Mac, where a FastAPI service runs Presage through a small C++ bridge, only while a face is in view so it doesn't spend credits on an empty crib.",
      "A sleep-state classifier counts the baby as asleep only after 20 straight seconds of infant-range breathing (22–40 breaths a minute) and calm movement, and uses Presage's face data to catch open eyes.",
      "Auto-soothe: 4 seconds of restlessness starts a lullaby that fades out once the baby settles, limited to once every 10 minutes.",
      "A frame pacer smooths bursty Wi-Fi delivery into a steady 30 fps for Presage. Readings save to Tiger Data, and Gemini writes a three-bullet recap of the night.",
    ],
    role: "Connections between the hardware and software, the Presage integration, and general frontend work.",
    note: "An informational wellness monitor, not a medical device. So far it has only been tested on adults.",
    annotation: "← Best Use of Presage",
    ribbon: "Winner · Hack Knight Fall 2026 · Best Use of Presage",
    image: "/images/cribby.webp",
    diagram: ["Pi 4 camera", "Frame pacer", "Presage · C++", "Sleep classifier", "Dashboard", "Tiger Data + Gemini"],
    links: [
      { label: "GitHub", href: "https://github.com/farh4nk/cribby" },
      { label: "Demo", href: "https://www.youtube.com/watch?v=eI_JGgeIOac" },
      { label: "Devpost", href: "https://devpost.com/software/cribby" },
    ],
  },
];

// Every hackathon, in chronological order. Winners link to their featured case file.
export const hackathons: HackathonEntry[] = [
  {
    slug: "recipal",
    order: 1,
    event: "BYTE Hacks",
    term: "Fall 2025",
    project: "reciPal",
    pitch: "Turns cooking videos from social media into recipes, then tells you what to buy.",
    bullets: [
      "yt-dlp and FFmpeg pull the audio from an Instagram or YouTube link; Gemini turns it into a structured recipe.",
      "Pantry tracking by barcode scan (Open Food Facts).",
      "A grocery list that compares saved recipes with the pantry and suggests substitutes you already have.",
    ],
    stack: ["React", "Django REST Framework", "SQLite", "Gemini", "FFmpeg"],
    links: [
      { label: "GitHub", href: "https://github.com/farh4nk/reciPal" },
      { label: "Demo", href: "https://www.youtube.com/watch?v=7EKcPbCa5ow" },
      { label: "Devpost", href: "https://devpost.com/software/recipal" },
    ],
  },
  {
    slug: "luna",
    order: 2,
    event: "NASA Space Apps",
    term: "Fall 2025",
    project: "LUNA",
    pitch: "Ask a space-biology question; get an answer synthesized from research papers, with sources.",
    bullets: [
      "Search interface that sends questions to a Cloudflare Worker /rag endpoint, which returns a synthesized answer plus ranked papers with relevance scores and summaries.",
      "“Compare with ChatGPT” view puts LUNA's answer next to a general LLM's.",
    ],
    stack: ["React", "TypeScript", "Vite", "shadcn/ui", "Cloudflare Workers"],
    links: [
      { label: "GitHub", href: "https://github.com/farh4nk/luna-engine" },
      { label: "Demo", href: "https://www.loom.com/share/7df64cc3d5ad475bbf5fd97f26bd3d75" },
    ],
  },
  {
    slug: "nutriscope",
    order: 3,
    event: "Hack Knight",
    term: "Fall 2025",
    project: "NutriScope",
    pitch: "Snap a photo of a meal to see which food groups you've covered today and which are missing.",
    bullets: [
      "Meal photo → food identification → daily food-group coverage.",
      "Gemini-powered chatbot that answers questions with context on what you've eaten.",
    ],
    stack: ["FastAPI", "PyTorch", "Gemini", "Docker"],
    links: [
      { label: "Presentation", href: "https://gamma.app/docs/NutriScope-98lzn02epr1076r?mode=doc" },
    ],
  },
  {
    slug: "mira",
    order: 4,
    event: "SBUHacks",
    term: "Fall 2025",
    project: "MIRA",
    featuredSlug: "mira",
    award: "Winner, EquiTech Track",
  },
  {
    slug: "brain-invaders",
    order: 5,
    event: "HackRPI",
    term: "Fall 2025",
    project: "Brain Invaders",
    featuredSlug: "brain-invaders",
    award: "Best First-Time Hack",
  },
  {
    slug: "cribby",
    order: 6,
    event: "Hack Knight",
    term: "Fall 2026",
    project: "Cribby",
    featuredSlug: "cribby",
    award: "Best Use of Presage",
  },
];

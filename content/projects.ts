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
  /** Mono callout shown next to the card, e.g. "← 14k pageviews". */
  annotation: string;
  /** Ribbon on winning cards. */
  ribbon?: string;
  /** Screenshot under /public. A placeholder renders until the file exists. */
  image: string;
  diagram: string[];
  links: Link[];
};

export type HackathonEntry = {
  order: number;
  event: string;
  project: string;
  /** Winners link to a featured case file by slug. */
  featuredSlug?: string;
  award?: string;
  pitch?: string;
  bullets?: string[];
  stack?: string[];
  links?: Link[];
};

// Full case files: Quenova plus the two winners.
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
    image: "/images/quenova.png",
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
    image: "/images/mira.png",
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
    image: "/images/brain-invaders.png",
    diagram: ["Phaser game", "Behavior tracker", "Adaptive difficulty", "Express API", "MongoDB", "Dashboard"],
    links: [
      { label: "GitHub", href: "https://github.com/deyan-reza/BrainInvaders" },
      { label: "Demo", href: "https://www.youtube.com/watch?v=Cld4ErQqrNc" },
      { label: "Devpost", href: "https://devpost.com/software/space-invaders-impulse-control-trainer" },
    ],
  },
];

// Fall 2025 hackathon run, in chronological order.
export const hackathons: HackathonEntry[] = [
  {
    order: 1,
    event: "BYTE Hacks",
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
    order: 2,
    event: "NASA Space Apps",
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
    order: 3,
    event: "Hack Knight",
    project: "NutriScope",
    pitch: "Snap a photo of a meal to see which food groups you've covered today and which are missing.",
    bullets: [
      "Meal photo → food identification → daily food-group coverage.",
      "Gemini-powered chatbot that answers questions with context on what you've eaten.",
    ],
    stack: ["Gemini"],
    links: [
      { label: "Presentation", href: "https://gamma.app/docs/NutriScope-98lzn02epr1076r?mode=doc" },
    ],
  },
  {
    order: 4,
    event: "SBUHacks",
    project: "MIRA",
    featuredSlug: "mira",
    award: "Winner, EquiTech Track",
  },
  {
    order: 5,
    event: "HackRPI",
    project: "Brain Invaders",
    featuredSlug: "brain-invaders",
    award: "Best First-Time Hack",
  },
];

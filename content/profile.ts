export const profile = {
  name: "Farhan Khan",
  kicker: "software engineer · new york",
  roles: [
    "backend systems",
    "robotics & perception",
    "full-stack products",
    "applied AI at the edge",
    "hackathon enthusiast",
    "builder"
  ],
  // Written by Farhan. Placeholders render until replaced.
  tagline: "Building systems for positive impact.",
  summary: "Software engineer with experience in full stack architecture, research settings, robotics, and ML.",
  location: "New York, NY",
  // Hero location line, after the pin icon.
  city: "NYC",
  portrait: "/images/portrait.webp",
  bio: ["[ TODO: bio paragraph 1 ]", "[ TODO: bio paragraph 2 ]"],
  contactBlurb: "Seeking software engineering/machine learning/forward deployed engineering internships.",
  email: "farhank.dev@gmail.com",
  // Live URL; used for canonical, Open Graph and the sitemap.
  siteUrl: "https://farhan-khan.farhank-dev.workers.dev",
  // Cloudflare Web Analytics site token (dashboard → Analytics & Logs → Web Analytics). Empty = no beacon.
  analyticsToken: "",
  links: {
    github: "https://github.com/farh4nk",
    linkedin: "https://linkedin.com/in/farhank0127",
    resume: "/resume.pdf",
  },
  education: {
    school: "CUNY City College — Macaulay Honors College",
    degree: "B.S. Computer Science",
    graduation: "May 2028",
    honors: ["GPA 3.99", "Dean's List", "S Jay Levy Fellow"],
    coursework: [
      "Data Structures",
      "Algorithms",
      "Software Design",
      "Database Systems",
      "Numerical Issues in Scientific Programming",
      "Theoretical Computer Science",
      "Programming Language Paradigms",
      "Artificial Intelligence",
    ],
  },
  leadership: [
    { role: "Vice President", org: "MHC++ (Macaulay Honors Computer Science Club)" },
    { role: "Organizer & Host", org: "HackMHC++, the club's first hackathon" },
  ],
  awards: [
    "Hack Knight Fall 2026 · Best Use of Presage",
    "SBUHacks 2025 · Winner, EquiTech Track",
    "HackRPI 2025 · Best First-Time Hack",
    "CodePath · Web102 Honors",
  ],
} as const;

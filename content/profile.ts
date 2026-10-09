export const profile = {
  name: "Farhan Khan",
  kicker: "software engineer · new york",
  roles: [
    "backend systems",
    "robotics & perception",
    "full-stack products",
    "applied AI at the edge",
  ],
  tagline: "I build systems that see, serve, and scale.",
  summary:
    "Production experience across full-stack architecture, low-latency ML pipelines, and embedded robotics.",
  location: "New York, NY",
  email: "farhank.dev@gmail.com",
  links: {
    github: "https://github.com/farh4nk",
    linkedin: "https://linkedin.com/in/farhank0127",
    resume: "/resume.pdf",
  },
  stats: [
    { value: 3.99, decimals: 2, suffix: "", label: "GPA" },
    { value: 14000, decimals: 0, suffix: "+", label: "Quenova pageviews" },
    { value: 5, decimals: 0, suffix: "", label: "hackathons · 2 wins" },
    { value: 1, decimals: 0, suffix: " of 9", label: "Cornell Tech researchers" },
  ],
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
    { role: "Member", org: "Muslim Students Organization" },
  ],
  awards: [
    "SBUHacks 2025 · Winner, EquiTech Track",
    "HackRPI 2025 · Best First-Time Hack",
    "CodePath · Web102 Honors",
  ],
} as const;

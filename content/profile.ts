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
  // Written by Farhan.
  tagline: "Building systems for positive impact.",
  summary: "Software engineer with experience in full stack architecture, research settings, robotics, and ML.",
  location: "New York, NY",
  // Hero location line, after the pin icon.
  city: "NYC",
  portrait: "/images/portrait.webp",
  bio: ["Hello! My name is Farhan. I'm a third-year CS student at The City College of New York, and I'm a Macaulay Honors Student. I'm a software engineer interested in health-tech and AI/ML. I love building things that serve a real purpose and can benefit people's lives. This can be seen amongst my hackathon projects, of which I've won 3.", 
        "Most recently, I did research at Cornell Tech's AI and Robotics Lab. There, I helped co-design a robot to facilitate social interactions amongst older adults. Before that, I was a SWE intern at The Bideshi, where I worked on a team to create an e-commerce platform for an online cultural brand with over 100k followers. I'm comfortable working in established organizations as well as fast-paced startup environments.",
       "If you'd like to connect with me, don't hesitate to reach out! My contact info is right here on my portfolio."],
  contactBlurb: "Seeking software engineering/machine learning/forward deployed engineering internships.",
  email: "farhank.dev@gmail.com",
  // Live URL; used for canonical, Open Graph and the sitemap.
  siteUrl: "https://portfolio.farhankhan.workers.dev",
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

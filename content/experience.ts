export type Role = {
  title: string;
  org: string;
  dates: string;
  bullets: string[];
};

// Newest first.
export const experience: Role[] = [
  {
    title: "Undergraduate Research Intern",
    org: "Cornell Tech · AI & Robotics Lab",
    dates: "May – Aug 2026",
    bullets: [
      "Selected as 1 of 9 researchers under Dr. Angelique Taylor.",
      "Co-designed a humanoid tabletop robot (Python, Raspberry Pi) that runs arts & crafts circles for 20+ older adults in long-term care.",
      "Implemented facial recognition with dlib vector embeddings to map names to stored faces.",
      "Field-tested and debugged the robot in live sessions with residents.",
    ],
  },
  {
    title: "Software Engineer Intern",
    org: "The Bideshi",
    dates: "Jan – Jun 2026",
    bullets: [
      "Worked across 3 teams in a ~20k-line e-commerce codebase for a brand with 100k+ followers.",
      "Built a preorder flow for restocking items with the Shopify Storefront API, plus an interactive size guide.",
      "Migrated the store to Next.js + Supabase, modularizing the UI in React and removing the dependency on Shopify's frontend frameworks.",
    ],
  },
  {
    title: "Desktop Support Intern",
    org: "NYC Department of Social Services",
    dates: "Jul – Aug 2025",
    bullets: [
      "Troubleshot hardware, software, and network issues across municipal department facilities.",
      "Assisted in the design and implementation of an internal webpage to streamline new account registrations.",
      "Collaborated with business analysts and developers in the Software Development Life Cycle."

    ],
  },
];

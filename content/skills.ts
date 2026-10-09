export type SkillGroup = { id: string; label: string; items: string[] };

// One group per step of the pinned "stack" scene.
export const skills: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "C++", "Java", "Bash"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "Next.js", "Redux", "Tailwind CSS", "Phaser.js"],
  },
  {
    id: "backend",
    label: "Backend & Systems",
    items: ["Node.js", "Express", "FastAPI", "Django", "REST APIs", "Sequelize"],
  },
  {
    id: "cloud",
    label: "Cloud, Edge & Data",
    items: ["PostgreSQL (Supabase)", "MySQL", "MongoDB", "Cloudflare Workers", "Workers AI", "Docker", "Linux"],
  },
  {
    id: "ml",
    label: "ML & Perception",
    items: ["PyTorch", "YOLOv8", "OpenCV", "dlib", "RAG", "Gemini API", "ElevenLabs API"],
  },
  {
    id: "hardware",
    label: "Hardware & Embedded",
    items: ["Raspberry Pi 5", "ESP32", "Sensor & actuator control loops"],
  },
];

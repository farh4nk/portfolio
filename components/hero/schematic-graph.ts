// The hero's system schematic: node boxes, wires between them, and which projects each node lights up.
// Coordinates live in a 720×400 viewBox; nodes are 180×40 boxes centered on (x, y).

export type SchematicNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  /** Slugs of projects that use this node (featured cards and hackathon entries). "*" = everything. */
  projects: string[];
};

export type SchematicWire = { from: string; to: string; d: string };

export const NODE_W = 180;
export const NODE_H = 40;

export const nodes: SchematicNode[] = [
  { id: "camera", label: "Camera / OpenCV", x: 120, y: 50, projects: ["mira", "nutriscope"] },
  { id: "yolo", label: "YOLOv8 · PyTorch", x: 360, y: 50, projects: ["mira"] },
  { id: "fastapi", label: "FastAPI", x: 600, y: 50, projects: ["mira"] },
  { id: "pi", label: "Pi 5 · dlib", x: 120, y: 150, projects: [] },
  { id: "genai", label: "Gemini · ElevenLabs", x: 600, y: 150, projects: ["mira", "recipal", "nutriscope"] },
  { id: "server", label: "Django · Express", x: 120, y: 250, projects: ["brain-invaders", "recipal"] },
  { id: "db", label: "Postgres · Mongo", x: 360, y: 250, projects: ["quenova", "brain-invaders"] },
  { id: "react", label: "React UI", x: 600, y: 250, projects: ["*"] },
  { id: "edge", label: "CF Workers + AI", x: 360, y: 350, projects: ["quenova", "luna"] },
];

export const wires: SchematicWire[] = [
  { from: "camera", to: "yolo", d: "M210 50 H270" },
  { from: "yolo", to: "fastapi", d: "M450 50 H510" },
  { from: "camera", to: "pi", d: "M120 70 V130" },
  { from: "fastapi", to: "genai", d: "M600 70 V130" },
  { from: "server", to: "db", d: "M210 250 H270" },
  { from: "db", to: "react", d: "M450 250 H510" },
  { from: "db", to: "edge", d: "M360 270 V330" },
  { from: "edge", to: "react", d: "M450 350 H600 V270" },
];

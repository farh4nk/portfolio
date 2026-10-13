// The system schematic: node boxes, wires, what each node is used for, and which projects it lights up.
// Two layouts share the same nodes: a wide one (720×400) and a stacked phone one (400×440).

export type Point = { x: number; y: number };

export type SchematicNode = {
  id: string;
  label: string;
  /** One-line tooltip. */
  use: string;
  wide: Point;
  tall: Point;
  /** data-project slugs this node highlights, in scroll order. "*" = everything. */
  projects: string[];
  /** Stack-scene steps (content/skills.ts ids) that spotlight this node. */
  groups: string[];
};

export type SchematicWire = { from: string; to: string; wide: string; tall: string };

export type Layout = "wide" | "tall";

export const VIEWBOX: Record<Layout, { w: number; h: number }> = {
  wide: { w: 720, h: 400 },
  tall: { w: 400, h: 440 },
};

export const NODE_SIZE: Record<Layout, { w: number; h: number }> = {
  wide: { w: 180, h: 40 },
  tall: { w: 170, h: 40 },
};

export const nodes: SchematicNode[] = [
  {
    id: "camera",
    label: "Camera / OpenCV",
    use: "Frame capture and image preprocessing",
    wide: { x: 120, y: 50 },
    tall: { x: 100, y: 40 },
    projects: ["mira", "cornell-robot", "nutriscope"],
    groups: ["languages", "ml", "hardware"],
  },
  {
    id: "yolo",
    label: "YOLOv8 · PyTorch",
    use: "Real-time object detection",
    wide: { x: 360, y: 50 },
    tall: { x: 300, y: 40 },
    projects: ["mira"],
    groups: ["languages", "ml"],
  },
  {
    id: "fastapi",
    label: "FastAPI",
    use: "Python inference API",
    wide: { x: 600, y: 50 },
    tall: { x: 300, y: 130 },
    projects: ["mira"],
    groups: ["languages", "backend"],
  },
  {
    id: "pi",
    label: "Pi 5 · dlib",
    use: "On-device face recognition for the Cornell Tech robot",
    wide: { x: 120, y: 150 },
    tall: { x: 100, y: 130 },
    projects: ["cornell-robot"],
    groups: ["languages", "hardware"],
  },
  {
    id: "genai",
    label: "Gemini · ElevenLabs",
    use: "Scene descriptions, recipe extraction, text-to-speech",
    wide: { x: 600, y: 150 },
    tall: { x: 300, y: 220 },
    projects: ["mira", "recipal", "nutriscope"],
    groups: ["languages", "ml"],
  },
  {
    id: "server",
    label: "Django · Express",
    use: "REST backends for web apps",
    wide: { x: 120, y: 250 },
    tall: { x: 100, y: 310 },
    projects: ["brain-invaders", "recipal"],
    groups: ["languages", "backend"],
  },
  {
    id: "db",
    label: "Postgres · Mongo",
    use: "Relational and document storage, with Row-Level Security on Postgres",
    wide: { x: 360, y: 250 },
    tall: { x: 300, y: 310 },
    projects: ["quenova", "bideshi", "brain-invaders"],
    groups: ["languages", "cloud"],
  },
  {
    id: "react",
    label: "React UI",
    use: "The frontend on every project here",
    wide: { x: 600, y: 250 },
    tall: { x: 300, y: 400 },
    projects: ["*"],
    groups: ["languages", "frontend"],
  },
  {
    id: "edge",
    label: "CF Workers + AI",
    use: "Serverless routing and RAG endpoints at the edge",
    wide: { x: 360, y: 350 },
    tall: { x: 100, y: 400 },
    projects: ["quenova", "luna"],
    groups: ["languages", "cloud"],
  },
];

export const wires: SchematicWire[] = [
  { from: "camera", to: "yolo", wide: "M210 50 H270", tall: "M185 40 H215" },
  { from: "yolo", to: "fastapi", wide: "M450 50 H510", tall: "M300 60 V110" },
  { from: "camera", to: "pi", wide: "M120 70 V130", tall: "M100 60 V110" },
  { from: "fastapi", to: "genai", wide: "M600 70 V130", tall: "M300 150 V200" },
  { from: "server", to: "db", wide: "M210 250 H270", tall: "M185 310 H215" },
  { from: "db", to: "react", wide: "M450 250 H510", tall: "M300 330 V380" },
  { from: "db", to: "edge", wide: "M360 270 V330", tall: "M240 330 V355 H100 V380" },
  { from: "edge", to: "react", wide: "M450 350 H600 V270", tall: "M185 400 H215" },
];

/** viewBox that frames the given nodes (wide layout) with padding, keeping the 720:400 aspect. */
export function frameNodes(ids: string[], pad = 40): string {
  const { w: VW, h: VH } = VIEWBOX.wide;
  const { w: NW, h: NH } = NODE_SIZE.wide;
  const pts = nodes.filter((n) => ids.includes(n.id)).map((n) => n.wide);
  let x0 = Math.min(...pts.map((p) => p.x)) - NW / 2 - pad;
  let x1 = Math.max(...pts.map((p) => p.x)) + NW / 2 + pad;
  let y0 = Math.min(...pts.map((p) => p.y)) - NH / 2 - pad;
  let y1 = Math.max(...pts.map((p) => p.y)) + NH / 2 + pad;
  // Grow the short side to keep the aspect ratio.
  const aspect = VW / VH;
  if ((x1 - x0) / (y1 - y0) > aspect) {
    const h = (x1 - x0) / aspect;
    const cy = (y0 + y1) / 2;
    y0 = cy - h / 2;
    y1 = cy + h / 2;
  } else {
    const w = (y1 - y0) * aspect;
    const cx = (x0 + x1) / 2;
    x0 = cx - w / 2;
    x1 = cx + w / 2;
  }
  return `${x0} ${y0} ${x1 - x0} ${y1 - y0}`;
}

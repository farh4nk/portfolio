// The stack schematic: node boxes and the wires between them, in a 720×400 viewBox.
// Nodes are 180×40 boxes centered on (x, y); `groups` are the skill layers (content/skills.ts ids)
// each node belongs to, which the pinned scene zooms to one step at a time.

export type SchematicNode = { id: string; label: string; x: number; y: number; groups: string[] };

export const VIEWBOX = { w: 720, h: 400 };
export const NODE = { w: 180, h: 40 };

export const nodes: SchematicNode[] = [
  { id: "camera", label: "Camera / OpenCV", x: 120, y: 50, groups: ["languages", "ml", "hardware"] },
  { id: "yolo", label: "YOLOv8 · PyTorch", x: 360, y: 50, groups: ["languages", "ml"] },
  { id: "fastapi", label: "FastAPI", x: 600, y: 50, groups: ["languages", "backend"] },
  { id: "pi", label: "Pi 5 · dlib", x: 120, y: 150, groups: ["languages", "hardware"] },
  { id: "genai", label: "Gemini · ElevenLabs", x: 600, y: 150, groups: ["languages", "ml"] },
  { id: "server", label: "Django · Express", x: 120, y: 250, groups: ["languages", "backend"] },
  { id: "db", label: "Postgres · Mongo", x: 360, y: 250, groups: ["languages", "cloud"] },
  { id: "react", label: "React UI", x: 600, y: 250, groups: ["languages", "frontend"] },
  { id: "edge", label: "CF Workers + AI", x: 360, y: 350, groups: ["languages", "cloud"] },
];

export const wires = [
  { id: "camera-yolo", d: "M210 50 H270" },
  { id: "yolo-fastapi", d: "M450 50 H510" },
  { id: "camera-pi", d: "M120 70 V130" },
  { id: "fastapi-genai", d: "M600 70 V130" },
  { id: "server-db", d: "M210 250 H270" },
  { id: "db-react", d: "M450 250 H510" },
  { id: "db-edge", d: "M360 270 V330" },
  { id: "edge-react", d: "M450 350 H600 V270" },
];

/** viewBox that frames the given nodes with padding, keeping the 720:400 aspect. */
export function frameNodes(ids: string[], pad = 40): string {
  const pts = nodes.filter((n) => ids.includes(n.id));
  let x0 = Math.min(...pts.map((p) => p.x)) - NODE.w / 2 - pad;
  let x1 = Math.max(...pts.map((p) => p.x)) + NODE.w / 2 + pad;
  let y0 = Math.min(...pts.map((p) => p.y)) - NODE.h / 2 - pad;
  let y1 = Math.max(...pts.map((p) => p.y)) + NODE.h / 2 + pad;
  // Grow the short side to keep the aspect ratio.
  const aspect = VIEWBOX.w / VIEWBOX.h;
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

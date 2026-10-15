import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// Rendered once at build time into out/opengraph-image; layout metadata links it automatically.
export const alt = `${profile.name}, software engineer in New York`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const C = { bg: "#070b14", raised: "#0d1424", rule: "#1e2a40", ink: "#e6edf7", muted: "#8a97ad", accent: "#5bc0eb", term: "#3dffa2" };

export default async function Image() {
  const [display, mono, portrait] = await Promise.all([
    readFile(join(process.cwd(), "assets/og/SpaceGrotesk-700.woff")),
    readFile(join(process.cwd(), "assets/og/JetBrainsMono-400.woff")),
    readFile(join(process.cwd(), "assets/og/portrait.jpg"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 64,
          background: C.bg,
          // Blueprint grid, as on the site: 32px minor and 160px major lines.
          backgroundImage: `linear-gradient(rgba(91,192,235,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(91,192,235,0.12) 1px, transparent 1px), linear-gradient(rgba(91,192,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(91,192,235,0.05) 1px, transparent 1px)`,
          backgroundSize: "160px 160px, 160px 160px, 32px 32px, 32px 32px",
          fontFamily: "JetBrains Mono",
          color: C.ink,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 24, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>
            <span style={{ color: C.accent, marginRight: 14 }}>{"//"}</span>
            {profile.kicker}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Space Grotesk",
                fontSize: 120,
                lineHeight: 0.9,
                letterSpacing: -4,
                textTransform: "uppercase",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {profile.name.split(" ").map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>
            <div style={{ display: "flex", marginTop: 32, fontSize: 28, color: C.term }}>
              {`> ${profile.roles.slice(0, 2).join(" · ")}`}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: C.muted }}>{profile.siteUrl.replace(/^https:\/\//, "")}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: 48 }}>
          <div style={{ display: "flex", padding: 10, border: `1px solid ${C.rule}`, background: C.raised }}>
            <img
              src={`data:image/jpeg;base64,${portrait}`}
              alt=""
              width={300}
              height={380}
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 18, color: C.muted }}>
            <span>FIG. 01</span>
            <span>NEW YORK, NY</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: display, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}

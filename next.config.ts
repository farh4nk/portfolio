import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pure static site: `next build` emits ./out, which Cloudflare Workers serves as static assets.
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    // A package-lock.json in ~/Code would otherwise be picked as the workspace root.
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

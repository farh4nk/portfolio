# farhan-khan portfolio

Single-page portfolio. Next.js (static export) + Tailwind v4 + GSAP, served as static assets on Cloudflare Workers.

- `npm run dev`: local dev server at http://localhost:3000
- `npm run preview`: build and serve with Wrangler (production-like)
- `npm run deploy`: build and deploy to `portfolio.<subdomain>.workers.dev`

All copy lives in `content/`. The design tokens are in `app/globals.css`. The full build plan is in `PLAN.md`.

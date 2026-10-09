import { Header } from "@/components/Header";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { featured, hackathons } from "@/content/projects";
import { skills } from "@/content/skills";

// Phase 1 shell: real content on the design system, no layout polish or motion yet.
function SectionLabel({ index, title }: { index: number; title: string }) {
  return (
    <p className="label-mono mb-6">
      <span className="text-accent">{"// "}{String(index).padStart(2, "0")}</span> — {title}
    </p>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="label-mono rounded border border-rule px-2 py-1 normal-case tracking-normal text-ink">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="py-24 sm:py-32">
          <p className="label-mono mb-6">{profile.kicker}</p>
          <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] font-bold tracking-[-0.04em] uppercase">
            {profile.name}
          </h1>
          <p className="mt-6 font-mono text-lg text-term">
            &gt; {profile.roles[0]}
            <span className="animate-pulse">▍</span>
          </p>
          <p className="mt-8 max-w-2xl font-display text-2xl font-medium sm:text-3xl">{profile.tagline}</p>
          <p className="mt-4 max-w-2xl text-ink-muted">{profile.summary}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#work" className="label-mono rounded-md bg-accent px-4 py-3 font-bold text-bg">
              [ View work ↓ ]
            </a>
            <a
              href={profile.links.github}
              className="label-mono rounded-md border border-rule px-4 py-3 text-ink hover:border-accent"
            >
              [ GitHub ↗ ]
            </a>
          </div>
        </section>

        <section aria-label="Highlights" className="grid grid-cols-2 gap-px border border-rule bg-rule md:grid-cols-4">
          {profile.stats.map((s) => (
            <div key={s.label} className="bg-bg p-6">
              <p className="font-display text-4xl font-bold">
                {s.value.toLocaleString("en-US", { minimumFractionDigits: s.decimals })}
                <span className="text-accent">{s.suffix}</span>
              </p>
              <p className="label-mono mt-2">{s.label}</p>
            </div>
          ))}
        </section>

        <section id="work" className="scroll-mt-20 py-24">
          <SectionLabel index={1} title="work" />
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((p) => (
              <article key={p.slug} className="rounded-md border border-rule bg-bg-raised p-6">
                <p className="label-mono">{p.context}</p>
                <h3 className="mt-2 font-display text-2xl font-bold">{p.name}</h3>
                {p.award && <p className="label-mono mt-1 text-signal">★ {p.award}</p>}
                <p className="mt-3 text-sm text-ink-muted">{p.tagline}</p>
              </article>
            ))}
          </div>
          <ol className="mt-12 space-y-2">
            {hackathons.map((h) => (
              <li key={h.order} className="font-mono text-sm">
                <span className="text-ink-muted">{String(h.order).padStart(2, "0")}</span>{" "}
                <span className={h.award ? "text-signal" : "text-accent"}>{h.award ? "★" : "●"}</span>{" "}
                {h.event} — {h.project}
                {h.award && <span className="text-ink-muted"> · {h.award}</span>}
              </li>
            ))}
          </ol>
        </section>

        <section id="experience" className="scroll-mt-20 py-24">
          <SectionLabel index={2} title="experience" />
          <ol className="space-y-10 border-l border-rule pl-6">
            {experience.map((r) => (
              <li key={r.org}>
                <p className="label-mono">{r.dates}</p>
                <h3 className="font-display text-xl font-bold">{r.title}</h3>
                <p className="text-accent">{r.org}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="stack" className="scroll-mt-20 py-24">
          <SectionLabel index={3} title="stack" />
          <div className="grid gap-8 md:grid-cols-3">
            {skills.map((g) => (
              <div key={g.id}>
                <h3 className="font-display font-bold">{g.label}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <Chip key={i}>{i}</Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="scroll-mt-20 py-24">
          <SectionLabel index={4} title="about" />
          <h3 className="font-display text-xl font-bold">{profile.education.school}</h3>
          <p className="text-ink-muted">
            {profile.education.degree} · {profile.education.graduation} · {profile.education.honors.join(" · ")}
          </p>
        </section>

        <section id="contact" className="scroll-mt-20 py-24">
          <SectionLabel index={5} title="contact" />
          <h2 className="font-display text-5xl font-bold">Let&apos;s build something.</h2>
          <a href={`mailto:${profile.email}`} className="mt-6 inline-block font-mono text-accent">
            {profile.email}
          </a>
        </section>
      </main>
      <footer className="border-t border-rule">
        <p className="label-mono mx-auto max-w-6xl px-4 py-8 sm:px-6">
          built with next.js + gsap · deployed on cloudflare
        </p>
      </footer>
    </>
  );
}

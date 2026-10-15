import type { ReactNode } from "react";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { featured, hackathons } from "@/content/projects";
import { skills } from "@/content/skills";
import type { Theme } from "@/lib/theme";

/** Side effects a command can request. Navigation-type actions run after the terminal closes. */
export type CommandContext = {
  clear: () => void;
  close: (after?: () => void) => void;
  setTheme: (t: Theme) => void;
  theme: () => Theme;
  openCaseFile: (slug: string) => void;
  openHackathon: (order: number) => void;
  replayBoot: () => void;
  resumeHref: string | null;
  openResume: (href: string) => void;
};

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target={href.startsWith("mailto:") ? undefined : "_blank"}
    rel="noreferrer"
    className="text-accent underline-offset-4 hover:underline"
  >
    {children}
  </a>
);
const Dim = ({ children }: { children: ReactNode }) => <span className="text-ink-muted">{children}</span>;
// Key/value line: stacked on phones, two columns from sm up. `w` is the key column's sm width class.
const Row = ({ k, children, w = "sm:w-28" }: { k: ReactNode; children: ReactNode; w?: string }) => (
  <div className="flex flex-col sm:flex-row sm:gap-3">
    <span className={`${w} shrink-0 text-term`}>{k}</span>
    <span className="min-w-0">{children}</span>
  </div>
);

const projectKey = (s: string) => s.toLowerCase().replace(/[\s_]+/g, "-");
const openable = [
  ...featured.map((p) => ({ key: p.slug, name: p.name, featured: true, order: 0 })),
  ...hackathons
    .filter((h) => !h.featuredSlug)
    .map((h) => ({ key: h.slug, name: h.project, featured: false, order: h.order })),
];

export const COMMANDS: Record<string, { help: string; args?: string[] }> = {
  help: { help: "list commands" },
  whoami: { help: "who's behind this site" },
  ls: { help: "list files; try 'ls projects'", args: ["projects"] },
  open: { help: "open a project, e.g. 'open mira'", args: openable.map((p) => p.key) },
  cat: { help: "print a file; try 'cat resume'", args: ["resume"] },
  experience: { help: "work history" },
  skills: { help: "tools by layer" },
  contact: { help: "ways to reach me" },
  theme: { help: "switch theme: 'theme dark' or 'theme light'", args: ["dark", "light"] },
  boot: { help: "replay the boot sequence" },
  clear: { help: "clear the screen" },
  exit: { help: "close the terminal" },
};

const commonPrefix = (words: string[]) =>
  words.reduce((pre, w) => {
    let i = 0;
    while (i < pre.length && pre[i] === w[i]) i++;
    return pre.slice(0, i);
  });

/**
 * Tab completion for a command name, or the first argument of a known command. Completes as far as
 * the matches agree; `options` lists them when more than one remains (like a shell's double-tab).
 */
export function complete(input: string): { value: string; options: string[] } {
  const parts = input.trimStart().split(/\s+/);
  const [pool, word, prefix] =
    parts.length === 1
      ? [Object.keys(COMMANDS), parts[0], ""]
      : [COMMANDS[parts[0]]?.args ?? [], parts[1].toLowerCase(), `${parts[0]} `];
  const hits = pool.filter((c) => c.startsWith(word));
  if (hits.length === 0) return { value: input, options: [] };
  if (hits.length === 1) return { value: `${prefix}${hits[0]}${parts.length === 1 ? " " : ""}`, options: [] };
  return { value: `${prefix}${commonPrefix(hits)}`, options: hits };
}

/** Runs one line of input. Returns the output to print, or null for none. */
export function run(raw: string, ctx: CommandContext): ReactNode | null {
  const input = raw.trim();
  if (!input) return null;
  const [cmd, ...rest] = input.split(/\s+/);
  const arg = rest.join(" ");

  if (/^rm\s+-(rf|fr|r)\b/.test(input)) return "nice try.";
  if (cmd === "sudo") {
    if (/^hire\s+farhan$/i.test(arg)) {
      return (
        <>
          <div>
            <Dim>[sudo] password for recruiter: ********</Dim>
          </div>
          <div className="text-term">permission granted ✓</div>
          <div>
            next step: <A href={`mailto:${profile.email}`}>{profile.email}</A>
          </div>
        </>
      );
    }
    return "you are not in the sudoers file. this incident will be reported.";
  }

  switch (cmd) {
    case "help":
      return (
        <>
          {Object.entries(COMMANDS).map(([name, c]) => (
            <Row key={name} k={name}>
              {c.help}
            </Row>
          ))}
          <div className="mt-2">
            <Dim>tab completes · ↑/↓ history · esc closes</Dim>
          </div>
        </>
      );

    case "whoami":
      return (
        <>
          <div>{profile.name.toLowerCase()}</div>
          <div>
            <Dim>{profile.kicker}</Dim>
          </div>
          <div>
            <Dim>
              {profile.education.degree.toLowerCase()} · {profile.education.school.toLowerCase()} · class of{" "}
              {profile.education.graduation.slice(-4)}
            </Dim>
          </div>
        </>
      );

    case "ls":
      if (!arg) {
        return (
          <div className="flex gap-6 text-accent">
            <span>projects/</span>
            <span>resume</span>
          </div>
        );
      }
      if (arg.replace(/\/$/, "") !== "projects") return `ls: ${arg}: no such file or directory`;
      return (
        <>
          {featured.map((p) => (
            <Row key={p.slug} k={p.slug} w="sm:w-36">
              {p.award && <span className="text-signal">★ </span>}
              {p.context}
            </Row>
          ))}
          {hackathons
            .filter((h) => !h.featuredSlug)
            .map((h) => (
              <Row key={h.slug} k={h.slug} w="sm:w-36">
                <Dim>{h.event}</Dim>
              </Row>
            ))}
          <div className="mt-2">
            <Dim>open one with &apos;open &lt;name&gt;&apos;</Dim>
          </div>
        </>
      );

    case "open": {
      if (!arg) return "usage: open <project>. try 'ls projects'";
      const hit = openable.find((p) => p.key === projectKey(arg) || p.name.toLowerCase() === arg.toLowerCase());
      if (!hit) return `open: ${arg}: no such project. try 'ls projects'`;
      ctx.close(() => (hit.featured ? ctx.openCaseFile(hit.key) : ctx.openHackathon(hit.order)));
      return `opening ${hit.name}…`;
    }

    case "cat":
      if (arg !== "resume" && arg !== "resume.pdf") return arg ? `cat: ${arg}: no such file` : "usage: cat resume";
      return (
        <>
          <div>{profile.education.school}</div>
          <div>
            <Dim>
              {profile.education.degree} · {profile.education.graduation} · {profile.education.honors.join(" · ")}
            </Dim>
          </div>
          <div className="mt-2">
            {experience.map((r) => (
              <Row key={r.org} k={r.dates.toLowerCase()} w="sm:w-40">
                {r.title} <Dim>@ {r.org}</Dim>
              </Row>
            ))}
          </div>
          <div className="mt-2">
            {profile.awards.map((a) => (
              <div key={a}>
                <span className="text-signal">★</span> {a}
              </div>
            ))}
          </div>
          <div className="mt-2">
            {ctx.resumeHref ? (
              <span className="flex flex-wrap gap-x-6">
                <button
                  type="button"
                  onClick={() => ctx.openResume(ctx.resumeHref!)}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  preview resume.pdf
                </button>
                <A href={ctx.resumeHref}>open in new tab ↗</A>
              </span>
            ) : (
              <>
                full history: <A href={profile.links.linkedin}>linkedin ↗</A>
              </>
            )}
          </div>
        </>
      );

    case "experience":
      return experience.map((r) => (
        <Row key={r.org} k={r.dates.toLowerCase()} w="sm:w-40">
          {r.title} <Dim>@ {r.org}</Dim>
        </Row>
      ));

    case "skills":
      return skills.map((g) => (
        <Row key={g.id} k={g.id} w="sm:w-24">
          {g.items.join(", ")}
        </Row>
      ));

    case "contact":
      return (
        <>
          <Row k="email">
            <A href={`mailto:${profile.email}`}>{profile.email}</A>
          </Row>
          <Row k="github">
            <A href={profile.links.github}>{profile.links.github.replace("https://", "")}</A>
          </Row>
          <Row k="linkedin">
            <A href={profile.links.linkedin}>{profile.links.linkedin.replace("https://", "")}</A>
          </Row>
        </>
      );

    case "theme":
      if (!arg) return `current theme: ${ctx.theme()}. usage: theme dark|light`;
      if (arg !== "dark" && arg !== "light") return `theme: unknown theme '${arg}'. try dark or light`;
      ctx.setTheme(arg);
      return `theme set to ${arg}`;

    case "boot":
      ctx.close(ctx.replayBoot);
      return "rebooting…";

    case "clear":
      ctx.clear();
      return null;

    case "exit":
      ctx.close();
      return null;

    default:
      return `command not found: ${cmd} — try 'help'`;
  }
}

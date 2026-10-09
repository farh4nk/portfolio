import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "#work", label: "work" },
  { href: "#experience", label: "experience" },
  { href: "#stack", label: "stack" },
  { href: "#about", label: "about" },
  { href: "#contact", label: "contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          FK<span className="text-accent">.</span>
        </a>
        <nav aria-label="Primary" className="hidden gap-5 md:flex">
          {nav.map((item, i) => (
            <a key={item.href} href={item.href} className="label-mono hover:text-accent">
              <span className="text-accent">[{String(i + 1).padStart(2, "0")}]</span> {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open terminal"
            className="label-mono grid h-8 w-8 place-items-center rounded-md border border-rule text-term hover:border-term"
          >
            &gt;_
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

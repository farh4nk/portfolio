"use client";

import { useRef, useState } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "#work", label: "work" },
  { href: "#experience", label: "experience" },
  { href: "#stack", label: "stack" },
  { href: "#about", label: "about" },
  { href: "#contact", label: "contact" },
];

export function Header() {
  const header = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    // Backdrop after 8px of scroll.
    ScrollTrigger.create({
      start: 8,
      end: "max",
      onToggle: (self) => setScrolled(self.isActive),
    });

    // Highlight the nav item whose section spans the middle of the viewport.
    for (const { href } of nav) {
      ScrollTrigger.create({
        trigger: href,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => setActive((cur) => (self.isActive ? href : cur === href ? null : cur)),
      });
    }

    // Hide on scroll down, show on scroll up. Reduced motion keeps the header fixed in place.
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const hide = gsap.to(header.current, { yPercent: -100, duration: 0.3, ease: "power2.out", paused: true });
      ScrollTrigger.create({
        start: 120,
        end: "max",
        onUpdate: (self) => (self.direction === 1 ? hide.play() : hide.reverse()),
        onLeaveBack: () => hide.reverse(),
      });
      // Keyboard users tabbing into the header should always see it.
      const show = () => hide.reverse();
      header.current!.addEventListener("focusin", show);
      return () => header.current?.removeEventListener("focusin", show);
    });
  });

  return (
    <header
      ref={header}
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-rule bg-bg/80 backdrop-blur" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          FK<span className="text-accent">.</span>
        </a>
        <nav aria-label="Primary" className="hidden gap-5 md:flex">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "true" : undefined}
              className="label-mono hover:text-accent aria-[current=true]:text-ink"
            >
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

"use client";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  // Both icons render; CSS shows the right one, so server and client markup match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="label-mono grid h-8 w-8 place-items-center rounded-md border border-rule hover:border-accent hover:text-accent"
    >
      <span className="hidden [[data-theme=light]_&]:inline" aria-hidden>◑</span>
      <span className="[[data-theme=light]_&]:hidden" aria-hidden>◐</span>
    </button>
  );
}

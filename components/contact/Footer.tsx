import { NycClock } from "./NycClock";

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="label-mono mx-auto flex max-w-6xl justify-between gap-4 px-4 py-8 sm:px-6">
        <p>
          <NycClock />
        </p>
        <p className="hidden md:block">
          press <kbd className="text-term">`</kbd> for terminal
        </p>
      </div>
    </footer>
  );
}

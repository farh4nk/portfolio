import { NycClock } from "./NycClock";

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="label-mono mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p>
          <NycClock />
        </p>
      </div>
    </footer>
  );
}

// Small line icons for the hero location line. Plain SVG (no hooks), so the build-time OG image can
// render them too.

export function PinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// Outline of a skyline with a spire in the middle, Empire State style.
export function SkylineIcon({ size = 14 }: { size?: number }) {
  return (
    <svg aria-hidden width={size * 2} height={size} viewBox="0 0 32 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round">
      <path d="M1 15V9h3v4h2V5h3v7h2V6h2V3h1V.5h1V3h1v3h2v4h2V7h3v4h2V8h3v5h2v2Z" />
    </svg>
  );
}

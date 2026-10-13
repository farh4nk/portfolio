export function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "signal" }) {
  const toneClass = tone === "signal" ? "border-signal/50 text-signal" : "border-rule text-ink";
  return (
    <span className={`inline-block rounded border px-2 py-1 font-mono text-xs leading-tight ${toneClass}`}>
      {children}
    </span>
  );
}

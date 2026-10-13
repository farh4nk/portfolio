// Mono section label plus heading, e.g. "// 02 — EXPERIENCE". The label word scramble-decodes on first view.
export function SectionLabel({
  index,
  label,
  title,
  annotation,
}: {
  index: number;
  label: string;
  title?: string;
  annotation?: string;
}) {
  return (
    <div data-reveal className="mb-10 sm:mb-14">
      <p className="label-mono">
        <span className="text-accent">
          {"// "}
          {String(index).padStart(2, "0")}
        </span>{" "}
        — <span data-scramble>{label}</span>
      </p>
      {title && (
        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-5xl">
          {title}
          {annotation && <span className="label-mono ml-4 align-middle normal-case">{annotation}</span>}
        </h2>
      )}
    </div>
  );
}

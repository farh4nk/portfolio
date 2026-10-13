// Technical-drawing registration marks on the four corners of a positioned parent.
// Inside a .group they slide outward on hover.
const positions = [
  "-top-[7px] -left-[5px] group-hover:-translate-x-1 group-hover:-translate-y-1",
  "-top-[7px] -right-[5px] group-hover:translate-x-1 group-hover:-translate-y-1",
  "-bottom-[7px] -left-[5px] group-hover:-translate-x-1 group-hover:translate-y-1",
  "-bottom-[7px] -right-[5px] group-hover:translate-x-1 group-hover:translate-y-1",
];

export function CornerMarks() {
  return (
    <>
      {positions.map((p) => (
        <span
          key={p}
          aria-hidden
          data-corner
          className={`pointer-events-none absolute ${p} font-mono text-xs leading-none text-accent/70 transition-transform duration-300`}
        >
          +
        </span>
      ))}
    </>
  );
}

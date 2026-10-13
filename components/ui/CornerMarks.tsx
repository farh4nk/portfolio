// Technical-drawing registration marks on the four corners of a positioned parent.
const positions = ["-top-[7px] -left-[5px]", "-top-[7px] -right-[5px]", "-bottom-[7px] -left-[5px]", "-bottom-[7px] -right-[5px]"];

export function CornerMarks() {
  return (
    <>
      {positions.map((p) => (
        <span
          key={p}
          aria-hidden
          data-corner
          className={`pointer-events-none absolute ${p} font-mono text-xs leading-none text-accent/70`}
        >
          +
        </span>
      ))}
    </>
  );
}

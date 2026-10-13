"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 55;
const DELETE_MS = 35;
const HOLD_MS = 1800;
const START_DELAY_MS = 2800;

// Types and deletes each role in turn. Starts showing the first role in full, so the static
// HTML and reduced-motion users get a complete line.
export function TypedRoles({ roles }: { roles: readonly string[] }) {
  const [text, setText] = useState(roles[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let index = 0;
    let shown = roles[0].length;
    let deleting = true;
    let timer: number;

    const step = () => {
      if (deleting) {
        shown -= 1;
        if (shown === 0) {
          deleting = false;
          index = (index + 1) % roles.length;
        }
      } else {
        shown += 1;
      }
      const current = roles[index];
      setText(current.slice(0, shown));

      let delay = deleting ? DELETE_MS : TYPE_MS;
      if (!deleting && shown === current.length) {
        deleting = true;
        delay = HOLD_MS;
      }
      timer = window.setTimeout(step, delay);
    };

    timer = window.setTimeout(step, START_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [roles]);

  return (
    <p className="font-mono text-lg text-term">
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden>
        &gt; {text}
        <span className="caret">▍</span>
      </span>
    </p>
  );
}

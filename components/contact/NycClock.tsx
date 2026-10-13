"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

// Renders a placeholder on the server so static HTML and the first client render match.
export function NycClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">
      NYC <time>{time ?? "--:--:--"}</time>
    </span>
  );
}

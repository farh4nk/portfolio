"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isTerminalShortcut, TERMINAL_OPEN } from "@/lib/events";

// The terminal (and its command set) is only downloaded the first time someone asks for it.
const Terminal = dynamic(() => import("./Terminal").then((m) => m.Terminal), { ssr: false });

export function TerminalLauncher({ resumeHref }: { resumeHref: string | null }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const load = () => setLoaded(true);
    const onKey = (e: KeyboardEvent) => {
      if (!isTerminalShortcut(e)) return;
      e.preventDefault();
      load();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(TERMINAL_OPEN, load);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(TERMINAL_OPEN, load);
    };
  }, [loaded]);

  return loaded ? <Terminal resumeHref={resumeHref} startOpen /> : null;
}

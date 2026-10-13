"use client";

import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { openCaseFile, slugFromHash } from "@/lib/casefile";
import { BOOT_REPLAY, HACKATHON_OPEN, TERMINAL_OPEN } from "@/lib/events";
import { gsap } from "@/lib/gsap";
import { lockScroll, scrollToElement } from "@/lib/scroll";
import { currentTheme, setTheme } from "@/lib/theme";
import { complete, run } from "./commands";

type Entry = { id: number; input?: string; output?: ReactNode };

const PROMPT = "guest@farhan:~$";
const INERT_TARGETS = "body > header, body > main, body > footer";
const WELCOME: Entry = { id: 0, output: "welcome. type 'help' to see what this terminal can do." };

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName));

/**
 * Easter-egg terminal. Opens with ` or ⌘K / Ctrl+K, or the header's >_ button (the way in on phones).
 * Slides down from the top; Esc, `exit` or ` closes it. History survives closing.
 */
export function Terminal({ resumeHref }: { resumeHref: string | null }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([WELCOME]);
  const [value, setValue] = useState("");
  const [cursor, setCursor] = useState(0);
  const history = useRef<string[]>([]);
  const historyIndex = useRef(-1);
  const nextId = useRef(1);
  const afterClose = useRef<(() => void) | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  // Global shortcuts and the header button's open event.
  useEffect(() => {
    const show = () => {
      // Not over a case file or the boot intro; both manage the page themselves.
      if (slugFromHash() || document.documentElement.classList.contains("booting")) return;
      opener.current = document.activeElement as HTMLElement | null;
      setVisible(true);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      const combo = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const tick = e.key === "`" && !e.metaKey && !e.ctrlKey && !e.altKey;
      if (combo || (tick && (!isTyping(e.target) || e.target === input.current))) {
        e.preventDefault();
        if (open) setOpen(false);
        else show();
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(TERMINAL_OPEN, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(TERMINAL_OPEN, show);
    };
  }, [open]);

  // Slide in / out (before paint, so it never flashes). Closing finishes before the page becomes
  // interactive again and queued actions run.
  useLayoutEffect(() => {
    if (!visible) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = panel.current;
    if (open) {
      gsap.fromTo(el, { yPercent: -100 }, { yPercent: 0, duration: reduced ? 0 : 0.35, ease: "power3.out" });
      input.current?.focus({ preventScroll: true });
      return;
    }
    const tween = gsap.to(el, {
      yPercent: -100,
      duration: reduced ? 0 : 0.25,
      ease: "power2.in",
      onComplete: () => setVisible(false),
    });
    return () => {
      tween.kill();
    };
  }, [open, visible]);

  // Modal while visible: page inert, scroll locked, focus restored afterwards, then queued action.
  useEffect(() => {
    if (!visible) return;
    const background = document.querySelectorAll<HTMLElement>(INERT_TARGETS);
    background.forEach((el) => (el.inert = true));
    lockScroll(true);
    return () => {
      background.forEach((el) => (el.inert = false));
      lockScroll(false);
      const action = afterClose.current;
      afterClose.current = null;
      if (action) action();
      else opener.current?.focus({ preventScroll: true });
    };
  }, [visible]);

  // Keep the newest output in view.
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [entries]);

  const ctx = {
    clear: () => setEntries([]),
    close: (after?: () => void) => {
      afterClose.current = after ?? null;
      setOpen(false);
    },
    setTheme,
    theme: currentTheme,
    openCaseFile: (slug: string) => openCaseFile(slug),
    openHackathon: (order: number) => {
      const strip = document.getElementById("hackathons");
      if (strip) scrollToElement(strip);
      window.dispatchEvent(new CustomEvent(HACKATHON_OPEN, { detail: order }));
    },
    replayBoot: () => window.dispatchEvent(new Event(BOOT_REPLAY)),
    resumeHref,
  };

  function submit() {
    const line = value;
    setValue("");
    setCursor(0);
    historyIndex.current = -1;
    if (line.trim()) history.current.unshift(line);
    const isClear = line.trim() === "clear";
    const output = run(line, ctx);
    if (isClear) return;
    setEntries((prev) => [...prev, { id: nextId.current++, input: line, output: output ?? undefined }]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const { value: next, options } = complete(value);
      setValue(next);
      setCursor(next.length);
      if (options.length) {
        setEntries((prev) => [...prev, { id: nextId.current++, input: value, output: options.join("   ") }]);
      }
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const max = history.current.length - 1;
      historyIndex.current = Math.max(-1, Math.min(max, historyIndex.current + (e.key === "ArrowUp" ? 1 : -1)));
      const next = historyIndex.current < 0 ? "" : history.current[historyIndex.current];
      setValue(next);
      setCursor(next.length);
    } else if (e.key === "Escape") {
      e.preventDefault();
      ctx.close();
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      ctx.clear();
    }
  }

  if (!visible) return null;

  const before = value.slice(0, cursor);
  const at = value[cursor] ?? " ";
  const after = value.slice(cursor + 1);

  return (
    <div className="fixed inset-0 z-[70]">
      <div aria-hidden className="absolute inset-0" onClick={() => ctx.close()} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        className="absolute inset-x-0 top-0 mx-auto flex max-h-[75svh] max-w-4xl flex-col overflow-hidden rounded-b-md border border-t-0 border-rule bg-bg-raised/95 font-mono text-sm shadow-2xl backdrop-blur sm:inset-x-4"
        onClick={() => input.current?.focus({ preventScroll: true })}
      >
        <div className="flex items-center justify-between border-b border-rule px-4 py-2">
          <span className="label-mono">
            <span className="text-term">●</span> terminal — ~/portfolio
          </span>
          <button type="button" onClick={() => ctx.close()} className="label-mono hover:text-accent">
            [ esc ✕ ]
          </button>
        </div>
        <div ref={scroller} data-lenis-prevent className="flex-1 space-y-2 overflow-y-auto overscroll-contain p-4" aria-live="polite">
          {entries.map((entry) => (
            <div key={entry.id}>
              {entry.input !== undefined && (
                <div className="break-all">
                  <span className="text-term">{PROMPT}</span> {entry.input}
                </div>
              )}
              {entry.output !== undefined && <div className="break-words text-ink">{entry.output}</div>}
            </div>
          ))}
          <label className="flex gap-2">
            <span className="shrink-0 text-term">{PROMPT}</span>
            <span className="relative min-w-0 flex-1">
              <input
                ref={input}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setCursor(e.target.selectionStart ?? e.target.value.length);
                }}
                onSelect={(e) => setCursor(e.currentTarget.selectionStart ?? value.length)}
                onKeyDown={onKeyDown}
                aria-label="Terminal command"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className="terminal-input absolute inset-0 w-full bg-transparent text-base text-transparent caret-transparent outline-none sm:text-sm"
              />
              {/* Visible mirror of the input, with a blinking block cursor */}
              <span aria-hidden className="pointer-events-none block break-all whitespace-pre-wrap text-ink">
                {before}
                <span className="caret bg-term text-bg">{at}</span>
                {after}
              </span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

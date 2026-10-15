"use client";

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register the plugins the first screen needs once; components import gsap from here.
// Flip lives with the lazily loaded case file, which registers it itself.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin);

/** matchMedia condition for full motion. Everything animated goes through gsap.matchMedia() with this. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Characters ScrambleText cycles through for mono labels. */
// No < > or &: ScrambleText writes HTML, so those would show up as entity fragments.
export const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_";

export { gsap, ScrollTrigger, SplitText, useGSAP };

"use client";

import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register every plugin once; components import gsap from here.
gsap.registerPlugin(useGSAP, ScrollTrigger, Flip, SplitText, DrawSVGPlugin, MotionPathPlugin, ScrambleTextPlugin);

/** matchMedia condition for full motion. Everything animated goes through gsap.matchMedia() with this. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Characters ScrambleText cycles through for mono labels. */
// No < > or &: ScrambleText writes HTML, so those would show up as entity fragments.
export const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_";

export { gsap, ScrollTrigger, Flip, SplitText, useGSAP };

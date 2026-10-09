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

export { gsap, ScrollTrigger, Flip, SplitText, useGSAP };

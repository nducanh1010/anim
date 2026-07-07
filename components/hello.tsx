"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const STORAGE_KEY = "next_anim:hello-seen";
const TOTAL_MS = 3600;

const greetings = [
  "Xin chào",
  "你好",
  "こんにちは",
  "Bonjour",
  "สวัสดี",
  "Привет",
  "Hola",
  "Sawadee",
];

export default function Hello() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const loaderHeight = () => {
    if (!boxRef.current) return 0;
    return boxRef.current.getBoundingClientRect().height;
  };

  const setPath = (curve: number) => {
    if (typeof window === "undefined") return;
    const width = window.innerWidth;
    const height = loaderHeight();
    if (pathRef.current) {
      pathRef.current.setAttributeNS(
        null,
        "d",
        `M0 0
        L${width} 0
        L${width} ${height}
        Q${width/2} ${height - curve} 0 ${height}
        L0 0`
      );
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    setPath(200);
    const handleResize = () => setPath(200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visible]);

  const skip = () => {
    if (!boxRef.current) return;
    gsap.killTweensOf(boxRef.current);
    gsap.set(boxRef.current, { yPercent: -100, autoAlpha: 0 });
    setVisible(false);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  useGSAP(
    () => {
      if (!visible || !boxRef.current) return;
      const box = boxRef.current;
      const svg = box.querySelector<SVGPathElement>(".hello__path");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }

      if (reduced) {
        if (svg) gsap.set(svg, { strokeDashoffset: 0, fill: "var(--signature)" });
        setIndex(greetings.length - 1);
        gsap.set(box, { yPercent: 0 });
        gsap.to(box, {
          yPercent: -100,
          duration: 0.01,
          delay: 0.4,
          onComplete: () => setVisible(false),
        });
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => setVisible(false),
      });

      const greeting = box.querySelector<HTMLParagraphElement>(".hello__greeting");
      const projectEaseOut = CustomEase.create("projectEaseOut", "M0,0 C0.22,1 0.36,1 1,1");

      tl.fromTo(
        svg,
        { strokeDashoffset: 1200 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: CustomEase.create(
            "custom",
            "M0,0 C0.133,0.031 0.124,0.018 0.171,0.099 0.273,0.278 0.242,0.31 0.309,0.495 0.369,0.664 0.378,0.649 0.47,0.8 0.513,0.872 0.704,1.011 1,1"
          ),
        },
        0
      );

      tl.to(svg, { fill: "var(--signature)", duration: 0.6 }, 1.0);

      // Smooth sliding crossfade for greetings sequence
      greetings.forEach((_, i) => {
        const startOffset = 1.4 + i * 0.22;
        if (i === 0) {
          tl.set(greeting, { opacity: 0, y: 8 }, startOffset);
          tl.call(() => setIndex(i), [], startOffset);
          tl.to(greeting, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, startOffset);
        } else {
          tl.to(greeting, { opacity: 0, y: -6, duration: 0.08, ease: "power2.in" }, startOffset - 0.08);
          tl.call(() => setIndex(i), [], startOffset);
          tl.fromTo(greeting, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" }, startOffset);
        }
      });

      const curveObj = { curve: 400 };

      tl.to(box, {
        yPercent: -100,
        duration: 1.5,
        ease: projectEaseOut,
      });

      tl.to(curveObj, {
        curve: 0,
        duration: 2,
        ease: projectEaseOut,
        onUpdate: () => {
          setPath(curveObj.curve);
        }
      }, "<");
    },
    { dependencies: [visible], scope: boxRef }
  );

  // Safety fallback: if anything stalls, hide the curtain.
  useEffect(() => {
    if (!visible) return;
    const t = window.setTimeout(() => setVisible(false), TOTAL_MS + 800);
    return () => window.clearTimeout(t);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={boxRef}
      className="hello__curtain fixed top-0 left-0 w-full h-[calc(100vh+200px)] z-[var(--z-modal)]"
      role="dialog"
      aria-label="Greeting"
    >
      <div className="absolute inset-0 pointer-events-none z-[-1] w-full h-full">
        <svg className="w-full h-full">
          <path ref={pathRef} className="stroke-black stroke-[1px] fill-[var(--surface-0)]" />
        </svg>
      </div>

      <div className="relative w-full h-[100vh] flex flex-col items-center justify-center">
        <button type="button" onClick={skip} className="hello__skip">
          Skip
        </button>
        <svg
          className="hello__svg"
          viewBox="0 0 600 180"
          aria-hidden="true"
        >
          <text
            className="hello__path"
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="120"
          >
            hello
          </text>
        </svg>
        <p
          className="hello__greeting mt-space-5 font-display text-h3 text-ink"
          aria-live="polite"
        >
          {greetings[index]}
        </p>
      </div>
    </div>
  );
}

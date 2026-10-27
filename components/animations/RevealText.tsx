"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "blockquote";
  delay?: number;
  stagger?: number;
}

export function RevealText({
  children,
  className,
  as: Component = "div",
  delay = 0,
  stagger = 0.07,
}: RevealTextProps) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const element = elementRef.current;
    if (!element) return;

    let splitInstance: SplitType | null = null;
    let ctx: gsap.Context | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let hasAnimated = false;
    let isUnmounted = false;

    const setupSplit = (animate: boolean) => {
      if (isUnmounted || !elementRef.current) return;

      if (ctx) {
        ctx.revert();
      }
      if (splitInstance) {
        splitInstance.revert();
      }

      splitInstance = new SplitType(element, {
        types: "lines",
        lineClass: "reveal-line",
      });

      const lines = splitInstance.lines;
      if (!lines || lines.length === 0) return;

      lines.forEach((line) => {
        const wrapper = document.createElement("span");
        wrapper.className = "block overflow-hidden pb-[0.08em] -mb-[0.08em]";
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
        line.style.display = "block";
      });

      if (animate && !hasAnimated) {
        ctx = gsap.context(() => {
          gsap.fromTo(
            lines,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 1.05,
              stagger,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
                onEnter: () => {
                  hasAnimated = true;
                },
              },
            }
          );
        }, element);
      } else {
        gsap.set(lines, { yPercent: 0 });
      }
    };

    setupSplit(true);

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!isUnmounted) {
          ScrollTrigger.refresh();
        }
      });
    }

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupSplit(!hasAnimated);
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isUnmounted = true;
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (ctx) ctx.revert();
      if (splitInstance) splitInstance.revert();
    };
  }, [delay, stagger]);

  return React.createElement(
    Component,
    {
      ref: elementRef,
      className: cn(className),
    },
    children
  );
}

export default RevealText;

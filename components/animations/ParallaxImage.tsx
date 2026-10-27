"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ParallaxImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  imgClassName?: string;
  speed?: number;
  priority?: boolean;
  children?: React.ReactNode;
}

export function ParallaxImage({
  src,
  alt,
  aspectRatio = "aspect-[4/5]",
  className,
  imgClassName,
  speed = 0.15,
  priority = false,
  children,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const ctx = gsap.context(() => {
      if (priority) {
        gsap.fromTo(
          container,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.35,
            ease: "power4.inOut",
          }
        );
      } else {
        gsap.fromTo(
          container,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.35,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: container,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      const yOffset = Math.min(4, (speed / 0.15) * 4);

      gsap.fromTo(
        image,
        {
          scale: 1.15,
          yPercent: -yOffset,
        },
        {
          scale: 1.08,
          yPercent: yOffset,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, [priority, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-espresso/5 will-change-[clip-path]",
        aspectRatio,
        className
      )}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => ScrollTrigger.refresh()}
        className={cn(
          "h-full w-full object-cover will-change-transform",
          imgClassName
        )}
      />
      {children}
    </div>
  );
}

export default ParallaxImage;

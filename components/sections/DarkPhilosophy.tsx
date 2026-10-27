"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { RevealText } from "@/components/animations/RevealText";

const SHADOW_STUDY_IMAGE = "/images/shadow.jpg";

export function DarkPhilosophy() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: "#292623" },
        {
          backgroundColor: "#1E1C1A",
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 32, opacity: 0.85 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#1E1C1A] text-[#F5F3EF] border-t border-white/10"
    >
      {/* Background Layer: Giant edge-to-edge watermark CREATE HOUSE */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center overflow-hidden select-none pointer-events-none"
      >
        <span className="text-[15vw] font-bold text-white/[0.03] select-none pointer-events-none leading-none tracking-tighter whitespace-nowrap">
          CREATE HOUSE
        </span>
      </div>

      {/* Foreground 12-col Grid */}
      <div
        ref={contentRef}
        className="px-6 md:px-14 py-36 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        {/* Cols 1-5: Square Architectural Shadow Study */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square w-full overflow-hidden bg-[#141413] border border-white/10">
            <ParallaxImage
              src={SHADOW_STUDY_IMAGE}
              alt="Architectural shadow study across unfinished raw travertine and cast concrete surfaces"
              aspectRatio="aspect-square"
              speed={0.1}
              className="h-full w-full"
              imgClassName="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-[#8C7A6B]">
            <span>DETAIL 11 / TACTILITY — UNFINISHED SURFACES</span>
            <span>ISO 400 // F/8</span>
          </div>
        </div>

        {/* Col 6: Spacer */}
        <div className="hidden lg:block lg:col-span-1" />

        {/* Cols 7-12: Editorial Quote + Supporting Prose + Stark White CTA */}
        <div className="lg:col-span-6 space-y-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#8C7A6B]">
            03 / NOCTURNE PHILOSOPHY
          </div>

          <RevealText
            as="blockquote"
            className="text-[clamp(2rem,3.6vw,3.5rem)] font-serif italic font-normal leading-[1.12] tracking-[-0.02em] text-[#F5F3EF]"
          >
            &ldquo;Architecture is not merely inhabited; it is felt. Light is our
            primary building material.&rdquo;
          </RevealText>

          <p className="text-base md:text-[17px] text-[#F5F3EF]/75 leading-[1.68] max-w-[50ch]">
            Where conventional luxury seeks polish, we pursue patina. Raw
            board-formed concrete, cleft basalt, and unlacquered bronze absorb
            the passage of time—transforming every wall into a sundial of quiet
            domestic ritual.
          </p>

          <div className="font-mono text-xs uppercase tracking-[0.12em] text-[#8C7A6B]">
            — AKASH MANE, FOUNDER OF CREATE HOUSE
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-6">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-[#F5F3EF] text-[#141413] px-8 py-4 font-mono text-xs uppercase tracking-[0.12em] font-medium hover:bg-[#8C7A6B] hover:text-[#F5F3EF] transition-colors duration-300"
            >
              INITIATE PRIVATE COMMISSION
            </a>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">
              2026 / 2027 DOSSIER OPEN
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DarkPhilosophy;

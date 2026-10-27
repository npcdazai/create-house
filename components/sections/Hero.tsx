"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ParallaxImage } from "@/components/animations/ParallaxImage";

const HERO_IMAGE_URL = "/images/hero.jpg";

const KIGO_WORDS = ["beautiful", "contemplative", "monolithic", "enduring"] as const;

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const currentWord = KIGO_WORDS[wordIndex];

  useEffect(() => {
    if (!headlineRef.current) return;
    const lines = headlineRef.current.querySelectorAll(".hero-line-inner");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    }, headlineRef);

    return () => ctx.revert();
  }, []);

  const cycleWord = () => {
    setWordIndex((prev) => (prev + 1) % KIGO_WORDS.length);
  };

  return (
    <section className="bg-[#F5F3EF] text-[#141413]">
      {/* Top Container: 78vh Architectural Aperture */}
      <div className="h-[78vh] w-full px-6 md:px-14 pt-6">
        <div className="relative h-full w-full overflow-hidden bg-[#EAE6DF]">
          <ParallaxImage
            src={HERO_IMAGE_URL}
            alt="Casa Alabaster — Brutalist limestone and travertine residence at dusk"
            priority={true}
            speed={0.15}
            className="h-full w-full"
            imgClassName="h-full w-full object-cover"
          />

          {/* Subtle dark vignette for legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />

          {/* Bottom-left coordinate tag */}
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10 flex items-center gap-3 bg-[#141413]/75 backdrop-blur-md px-4 py-2 text-[#F5F3EF] border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8C7A6B]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.08em]">
              Pavilion 04 — Côte d&apos;Azur
            </span>
          </div>

          {/* Floating glassmorphic / editorial caption on the far right */}
          <a
            href="#portfolio"
            className="group absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10 max-w-xs bg-[#F5F3EF]/85 backdrop-blur-md border border-black/10 px-5 py-4 text-[#141413] transition-all duration-300 hover:bg-[#141413] hover:text-[#F5F3EF]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#6E6A64] group-hover:text-[#8C7A6B] transition-colors">
              COMMISSION 04 // MONOGRAPH
            </p>
            <p className="mt-1 text-xs md:text-sm font-medium leading-snug">
              Casa Alabaster — Minimalist Living Sanctuary
            </p>
            <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.08em] inline-flex items-center gap-1.5">
              <span>View Project</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                -&gt;
              </span>
            </p>
          </a>
        </div>
      </div>

      {/* Bottom Editorial Block */}
      <div className="bg-[#F5F3EF] py-14 px-6 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Cols 1-8: Massive Display Headline */}
          <div className="lg:col-span-8 space-y-5">
            <h1
              ref={headlineRef}
              className="text-[clamp(2.8rem,5.8vw,5.75rem)] font-medium tracking-[-0.035em] leading-[1.02] text-[#141413]"
            >
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-inner block">
                  Designing{" "}
                  <button
                    type="button"
                    onClick={cycleWord}
                    title="Click to cycle architectural ethos"
                    className="inline-flex items-baseline font-serif italic font-normal text-[#141413] border-b border-[#8C7A6B]/60 hover:text-[#8C7A6B] transition-colors cursor-pointer focus:outline-none"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={currentWord}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="inline-block"
                      >
                        {currentWord}
                      </motion.span>
                    </AnimatePresence>
                  </button>{" "}
                  homes
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-inner block">
                  that work as well as
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-inner block">they look.</span>
              </span>
            </h1>

            {/* Subtle Kigo selector bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6E6A64]">
                ETHOS LEXICON //
              </span>
              {KIGO_WORDS.map((word, idx) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => setWordIndex(idx)}
                  className={`font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 transition-colors cursor-pointer ${
                    idx === wordIndex
                      ? "bg-[#141413] text-[#F5F3EF]"
                      : "text-[#6E6A64] hover:text-[#141413]"
                  }`}
                >
                  0{idx + 1} {word}
                </button>
              ))}
            </div>
          </div>

          {/* Cols 9-12: Bottom-aligned thesis paragraph */}
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-sm text-[#6E6A64] max-w-[34ch] leading-relaxed">
              We craft contemplative residences defined by untamed light,
              monolithic stone, and enduring spatial calm.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

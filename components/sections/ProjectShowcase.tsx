"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParallaxImage } from "@/components/animations/ParallaxImage";

const COMMISSIONS = [
  {
    id: 1,
    title: "The Travertine Pavilion",
    location: "Porto Rafael, Sardinia",
    year: "2026",
    materiality: "Roman Travertine, Cast Bronze, Low-Iron Glass",
    dimensions: "1,120 SQ.M // COASTAL PROMONTORY",
    image: "/images/pavilion.jpg",
    caption:
      "Cantilevered planes of unsealed Roman travertine hover above Mediterranean granite, capturing the shifting horizon in stillness.",
  },
  {
    id: 2,
    title: "Casa Alabaster Sanctuary",
    location: "Côte d'Azur, France",
    year: "2025",
    materiality: "Honed Limestone, Raw Linen, Weathered Teak",
    dimensions: "940 SQ.M // CLIFFSIDE ENCLAVE",
    image: "/images/hero.jpg",
    caption:
      "Monolithic limestone volumes carved to choreograph twilight reflection across an infinity-edge reflection basin.",
  },
  {
    id: 3,
    title: "Kyoto Moss Courtyard",
    location: "Sakyo-ku, Kyoto",
    year: "2025",
    materiality: "Architectural Concrete, Charred Cedar, Kurama Stone",
    dimensions: "640 SQ.M // FOREST SANCTUARY",
    image: "/images/kyoto.jpg",
    caption:
      "A meditative courtyard residence where rain, moss, and board-formed concrete converge in quiet seasonal cadence.",
  },
];

export function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  const activeProject = COMMISSIONS[activeIndex];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!imageContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageContainerRef.current,
        { width: "86%" },
        {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 85%",
            end: "center center",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + COMMISSIONS.length) % COMMISSIONS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % COMMISSIONS.length);
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-16 md:py-28 border-t border-black/10 bg-[#F5F3EF] text-[#141413] overflow-hidden"
    >
      {/* Header Row */}
      <div className="px-4 sm:px-6 md:px-14 mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
        <div className="space-y-2 sm:space-y-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6A64]">
            02 / ARCHIVE 2026
          </div>
          <h2 className="text-[clamp(1.85rem,4.5vw,4.25rem)] font-medium tracking-[-0.03em] leading-[1.04] text-[#141413]">
            {activeProject.title}
          </h2>
        </div>

        {/* Minimal Carousel Controls: < 1/3 > */}
        <div className="flex items-center justify-between sm:justify-start w-full md:w-auto gap-4 sm:gap-6 self-start md:self-end">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6A64]">
            {activeProject.location} — {activeProject.year}
          </div>
          <div className="inline-flex items-center border border-black/15 bg-[#EAE6DF]/60 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Commission"
              className="px-3.5 py-2 font-mono text-xs text-[#141413] hover:bg-[#141413] hover:text-[#F5F3EF] transition-colors cursor-pointer"
            >
              &lt;
            </button>
            <span className="px-4 py-2 font-mono text-xs tracking-[0.12em] text-[#141413] border-x border-black/15 tabular-nums">
              {activeIndex + 1}/{COMMISSIONS.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Commission"
              className="px-3.5 py-2 font-mono text-xs text-[#141413] hover:bg-[#141413] hover:text-[#F5F3EF] transition-colors cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Expanding 16:9 Showcase Image Container */}
      <div
        ref={imageContainerRef}
        className="w-[92%] sm:w-[86%] mx-auto aspect-[4/3] sm:aspect-[16/9] relative overflow-hidden bg-[#EAE6DF]"
      >
        <ParallaxImage
          key={activeProject.image}
          src={activeProject.image}
          alt={`${activeProject.title} — ${activeProject.location}`}
          aspectRatio="aspect-[4/3] sm:aspect-[16/9]"
          speed={0.1}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover"
        />

        {/* Subtle bottom metadata overlay bar */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 sm:p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 text-[#F5F3EF]">
          <div className="space-y-1 max-w-xl">
            <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-white/80">
              {activeProject.dimensions} // {activeProject.materiality}
            </div>
            <p className="hidden sm:block text-xs md:text-sm text-white/90 leading-relaxed">
              {activeProject.caption}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {COMMISSIONS.map((commission, idx) => (
              <button
                key={commission.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] border transition-colors cursor-pointer ${
                  idx === activeIndex
                    ? "bg-[#F5F3EF] text-[#141413] border-[#F5F3EF]"
                    : "bg-black/40 text-white/75 border-white/20 hover:border-white/60"
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile-only caption below image so it never crowds the photograph */}
      <p className="sm:hidden px-4 pt-4 text-xs text-[#6E6A64] leading-relaxed">
        {activeProject.caption}
      </p>
    </section>
  );
}

export default ProjectShowcase;

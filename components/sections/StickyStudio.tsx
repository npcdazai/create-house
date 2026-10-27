"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { RevealText } from "@/components/animations/RevealText";

const RESIDENCES = [
  {
    index: "RESIDENCE 01 // COURTYARD SANCTUARY",
    location: "KYOTO, JAPAN",
    coordinates: "35.0116° N, 135.7681° E",
    area: "640 SQ.M — BOARD-FORMED CEDAR & BASALT",
    image: "/images/kyoto.jpg",
    alt: "Kyoto Courtyard Sanctuary — Minimalist concrete and timber pavilion framing moss garden",
    commentary:
      "Organized around an open-sky rain court, the residence filters eastern mountain light through charred hinoki screens and hand-honed Kurama stone.",
  },
  {
    index: "RESIDENCE 02 // CULINARY PAVILION",
    location: "LUBERON, FRANCE",
    coordinates: "43.7966° N, 5.2289° E",
    area: "810 SQ.M — QUARRIED LIMESTONE & RAW BRASS",
    image: "/images/provence.jpg",
    alt: "Provence Culinary Pavilion — Monolithic limestone kitchen and cantilevered dining terrace",
    commentary:
      "Carved directly into a terraced limestone ridge, the pavilion anchors communal rituals around a four-meter monolithic travertine hearth.",
  },
];

export function StickyStudio() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const leftEl = leftColRef.current;
      const rightEl = rightColRef.current;
      if (!leftEl || !rightEl) return;

      const trigger = ScrollTrigger.create({
        trigger: leftEl,
        start: "top top+=112",
        end: () =>
          `+=${Math.max(0, rightEl.offsetHeight - leftEl.offsetHeight)}`,
        pin: leftEl,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      const ro = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      ro.observe(leftEl);
      ro.observe(rightEl);

      return () => {
        ro.disconnect();
        trigger.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="relative px-6 md:px-14 py-36 border-t border-black/10 bg-[#F5F3EF] text-[#141413] overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Column (Cols 1-5): Pinned Studio Narrative */}
        <div
          ref={leftColRef}
          className="lg:col-span-5 lg:pr-10 space-y-6"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6A64]">
            01 / OUR STUDIO — CREATE HOUSE
          </div>

          <RevealText
            as="h2"
            className="text-[clamp(2rem,3.4vw,3.25rem)] font-medium tracking-[-0.025em] leading-[1.08] text-[#141413]"
          >
            Every considered home begins with a considered approach to design,
          </RevealText>

          <p className="text-base text-[#6E6A64] leading-[1.65] max-w-[40ch]">
            We reject the disposable. Led by Founder &amp; Principal Architect{" "}
            <span className="text-[#141413] font-medium">Akash Mane</span>, Create
            House treats architecture as an unhurried dialogue between
            geological weight and natural illumination, sculpted for decades
            rather than seasons.
          </p>

          <div className="pt-2 border-t border-black/10 flex items-center justify-between max-w-[40ch]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#6E6A64]">
                FOUNDER &amp; PRINCIPAL
              </div>
              <div className="text-sm font-medium text-[#141413] mt-0.5">
                Akash Mane
              </div>
            </div>
            <a
              href="#atelier"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[#141413] border-b border-[#141413] pb-1 hover:text-[#8C7A6B] hover:border-[#8C7A6B] transition-colors"
            >
              <span>VIEW METHODOLOGY -&gt;</span>
            </a>
          </div>
        </div>

        {/* Right Column (Cols 6-12): Vertical Scrolling Stack */}
        <div ref={rightColRef} className="lg:col-span-7 space-y-28">
          {RESIDENCES.map((item) => (
            <article key={item.index} className="space-y-6">
              {/* Top Index Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-3 font-mono text-[11px] uppercase tracking-[0.08em]">
                <span className="text-[#141413] font-medium">{item.index}</span>
                <span className="text-[#6E6A64]">{item.location}</span>
              </div>

              {/* Tall 4:5 Architectural Photograph */}
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#EAE6DF]">
                <ParallaxImage
                  src={item.image}
                  alt={item.alt}
                  aspectRatio="aspect-[4/5]"
                  speed={0.15}
                  className="h-full w-full"
                  imgClassName="h-full w-full object-cover"
                />
              </div>

              {/* Architectural Metadata & Editorial Commentary */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 items-start">
                <div className="md:col-span-5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6A64] space-y-1">
                  <div>{item.area}</div>
                  <div>{item.coordinates}</div>
                </div>
                <p className="md:col-span-7 text-sm text-[#141413]/85 leading-relaxed">
                  {item.commentary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StickyStudio;

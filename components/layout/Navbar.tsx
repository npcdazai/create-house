"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const NAV_LINKS = [
  { label: "Portfolio", href: "#portfolio", index: "01" },
  { label: "Spatial Atelier", href: "#atelier", index: "02" },
  { label: "Studio", href: "#studio", index: "03" },
  { label: "Contact", href: "#contact", index: "04" },
];

const ARCHIVE_INDEX = [
  {
    code: "ARC—01",
    title: "The Travertine Pavilion",
    location: "Porto Rafael, Sardinia",
    year: "2026",
    href: "#portfolio",
  },
  {
    code: "ARC—02",
    title: "Courtyard Sanctuary",
    location: "Sakyo-ku, Kyoto",
    year: "2025",
    href: "#studio",
  },
  {
    code: "ARC—03",
    title: "Culinary Pavilion",
    location: "Luberon, Provence",
    year: "2025",
    href: "#studio",
  },
  {
    code: "ARC—04",
    title: "Casa Alabaster",
    location: "Côte d'Azur, France",
    year: "2024",
    href: "#portfolio",
  },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [timeString, setTimeString] = useState("14:32 IST");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateClock = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(now);
      setTimeString(`${formatted} IST`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="sticky top-0 h-20 px-6 md:px-14 flex items-center justify-between border-b border-black/10 backdrop-blur-md bg-[#F5F3EF]/85 z-50">
        {/* Left: Transparent Logo Emblem + CREATE HOUSE Brand Lockup */}
        <a
          href="#"
          className="flex items-center gap-3.5 focus:outline-none group"
          aria-label="Create House Home"
        >
          <img
            src="/images/create-house-emblem.png"
            alt="Create House Emblem"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-semibold tracking-[-0.03em] leading-none text-[#141413]">
              CREATE HOUSE
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6E6A64] mt-1">
              BY AKASH MANE
            </span>
          </div>
        </a>

        {/* Center (Desktop): Minimal Studio Telemetry */}
        <div className="hidden xl:flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6A64]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8C7A6B]" />
          <span>19.0760° N, 72.8777° E</span>
          <span className="text-black/20">·</span>
          <span className="tabular-nums text-[#141413]">
            {mounted ? timeString : "00:00 IST"}
          </span>
        </div>

        {/* Right: Clean Editorial Links + Pill Menu Trigger */}
        <nav className="flex items-center gap-8" aria-label="Main Navigation">
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative py-1 text-[13px] font-normal tracking-[-0.01em] text-[#6E6A64] hover:text-[#141413] transition-colors duration-200"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 h-[1px] w-full origin-right scale-x-0 bg-[#141413] transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Toggle Architectural Index Drawer"
            className="rounded-full border border-black/15 px-4 py-1.5 text-xs font-medium tracking-[-0.01em] text-[#141413] hover:bg-[#141413] hover:text-[#F5F3EF] transition-colors duration-300 cursor-pointer"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      {/* Slide-down Architectural Index Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-20 z-40 border-b border-black/15 bg-[#1E1C1A] text-[#F5F3EF] shadow-2xl"
          >
            <div className="px-6 md:px-14 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Column 1: Primary Navigation */}
              <div className="lg:col-span-4 space-y-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#8C7A6B]">
                  00 / DIRECTORY
                </p>
                <ul className="space-y-3">
                  {NAV_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-baseline gap-4 text-2xl md:text-3xl font-medium tracking-tight text-[#F5F3EF]/90 hover:text-white transition-colors"
                      >
                        <span className="font-mono text-xs text-[#8C7A6B]">
                          {link.index}
                        </span>
                        <span className="group-hover:translate-x-2 transition-transform duration-300">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Selected Monograph Index */}
              <div className="lg:col-span-5 space-y-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#8C7A6B]">
                  01 / SELECTED MONOGRAPHS (2024—2026)
                </p>
                <div className="divide-y divide-white/10">
                  {ARCHIVE_INDEX.map((item) => (
                    <a
                      key={item.code}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="py-3.5 flex items-center justify-between gap-4 group text-sm hover:bg-white/[0.03] px-2 -mx-2 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[11px] text-white/40">
                          {item.code}
                        </span>
                        <span className="font-medium text-[#F5F3EF] group-hover:text-[#8C7A6B] transition-colors">
                          {item.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 font-mono text-[11px] text-white/50">
                        <span className="hidden sm:inline">{item.location}</span>
                        <span>{item.year}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 3: Brand Logo & Founder Dispatch */}
              <div className="lg:col-span-3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10 space-y-6">
                <div className="space-y-4">
                  <img
                    src="/images/create-house-logo.png"
                    alt="Create House — Interior and Designs"
                    className="h-24 w-auto object-contain"
                  />
                  <div className="space-y-1">
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#8C7A6B]">
                      FOUNDER &amp; PRINCIPAL ARCHITECT
                    </p>
                    <p className="text-lg font-medium text-[#F5F3EF]">
                      Akash Mane
                    </p>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Our Create House atelier in Mumbai crafts bespoke architectural residences and interiors.
                  </p>
                </div>

                <div className="space-y-2 font-mono text-[11px] text-white/60">
                  <div>19.0760° N, 72.8777° E — MUMBAI</div>
                  <div className="pt-1">
                    <a
                      href="mailto:inquiries@createhouse.arch"
                      className="text-[#F5F3EF] underline underline-offset-4 hover:text-[#8C7A6B]"
                    >
                      inquiries@createhouse.arch
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;

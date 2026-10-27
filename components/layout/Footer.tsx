"use client";

import React from "react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#F5F3EF] text-[#141413] border-t border-black/10 pt-20 overflow-hidden"
    >
      {/* Brand Lockup & Founder Header Row */}
      <div className="px-6 md:px-14 pb-14 mb-14 border-b border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <img
            src="/images/create-house-logo.png"
            alt="Create House — Interior and Designs Logo"
            className="h-24 md:h-28 w-auto object-contain"
          />
          <div className="space-y-1.5">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#8C7A6B]">
              INTERIOR &amp; ARCHITECTURAL DESIGNS
            </div>
            <div className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-[#141413]">
              CREATE HOUSE
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#6E6A64]">
              Founder &amp; Principal Architect —{" "}
              <span className="text-[#141413] font-medium">Akash Mane</span>
            </div>
          </div>
        </div>

        <div className="font-serif italic text-xl md:text-2xl text-[#6E6A64] md:text-right">
          &ldquo;Your dreams come to reality.&rdquo;
        </div>
      </div>

      {/* Top Row: 3-Column Architectural Ledger */}
      <div className="px-6 md:px-14 pb-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Column 1: Tell us about your project */}
        <div className="space-y-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6A64]">
            01 / Tell us about your project
          </div>
          <div className="space-y-2">
            <a
              href="mailto:inquiries@createhouse.arch"
              className="block text-2xl md:text-3xl font-medium tracking-tight text-[#141413] hover:text-[#8C7A6B] transition-colors"
            >
              inquiries@createhouse.arch
            </a>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-[#6E6A64]">
              By Appointment Only — Private Residential Archives
            </p>
          </div>
          <p className="pt-2 text-sm text-[#6E6A64] max-w-[34ch] leading-relaxed">
            Direct consultations with Akash Mane for site acquisition, bespoke
            interiors, and monolithic residential architecture.
          </p>
        </div>

        {/* Column 2: Location */}
        <div className="space-y-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6A64]">
            02 / Location
          </div>
          <div className="text-lg font-medium tracking-tight text-[#141413]">
            Mumbai
          </div>
          <ul className="space-y-3 text-sm text-[#6E6A64]">
            <li className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#141413]">
                MUMBAI — 19.0760° N, 72.8777° E
              </span>
              <span>Ballard Estate, Fort, Mumbai 400001</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Monographs & Archive */}
        <div className="space-y-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6A64]">
            03 / Monographs &amp; Archive
          </div>
          <ul className="space-y-2.5 text-sm font-medium text-[#141413]">
            <li>
              <a
                href="#portfolio"
                className="hover:text-[#8C7A6B] transition-colors inline-flex items-center justify-between w-full border-b border-black/10 pb-2"
              >
                <span>Journal &amp; Critical Essays</span>
                <span className="font-mono text-[11px] text-[#6E6A64]">VOL. XIV</span>
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="hover:text-[#8C7A6B] transition-colors inline-flex items-center justify-between w-full border-b border-black/10 pb-2"
              >
                <span>Spatial Index (1998—2026)</span>
                <span className="font-mono text-[11px] text-[#6E6A64]">042 WORKS</span>
              </a>
            </li>
            <li>
              <a
                href="#atelier"
                className="hover:text-[#8C7A6B] transition-colors inline-flex items-center justify-between w-full border-b border-black/10 pb-2"
              >
                <span>Materiality Catalog</span>
                <span className="font-mono text-[11px] text-[#6E6A64]">STONE / TIMBER</span>
              </a>
            </li>
            <li>
              <a
                href="#studio"
                className="hover:text-[#8C7A6B] transition-colors inline-flex items-center justify-between w-full pb-1"
              >
                <span>Colophon — Akash Mane</span>
                <span className="font-mono text-[11px] text-[#6E6A64]">
                  © 2026 CREATE HOUSE
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Row: Full-bleed Giant Wordmark CREATE HOUSE */}
      <div className="w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="text-[13.5vw] font-semibold tracking-[-0.04em] leading-[0.78] text-black/[0.08] overflow-hidden translate-y-[12%] select-none pointer-events-none text-center whitespace-nowrap"
        >
          CREATE HOUSE
        </div>
      </div>
    </footer>
  );
}

export default Footer;

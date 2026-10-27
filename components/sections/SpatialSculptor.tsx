"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface DiurnalOption {
  id: string;
  index: string;
  codeLabel: string;
  hudLabel: string;
  kelvin: string;
  lux: number;
  azimuth: string;
  atmosphereNote: string;
  filter: string;
  tintGradient: string;
  mixBlend: React.CSSProperties["mixBlendMode"];
  shadowOverlay: string;
  imageScale: number;
  imageOrigin: string;
  indicatorColor: string;
}

interface MaterialOption {
  id: string;
  name: string;
  fig: string;
  archiveRef: string;
  origin: string;
  reflectance: string;
  acousticNrc: string;
  thermalMass: string;
  description: string;
  imageUrl: string;
  swatchHex: string;
  grainOpacity: number;
  materialTint: string;
}

const DIURNAL_CYCLES: DiurnalOption[] = [
  {
    id: "morning-mist",
    index: "01",
    codeLabel: "01. MORNING MIST 5500K",
    hudLabel: "Morning Mist 5500K",
    kelvin: "5500K",
    lux: 640,
    azimuth: "AZM 078° / ALT +18°",
    atmosphereNote: "Cool diffused northern aperture filtration with soft silver-blue shadow edges.",
    filter: "brightness(1.04) contrast(0.95) saturate(0.86) hue-rotate(-8deg) sepia(0.04)",
    tintGradient:
      "linear-gradient(135deg, rgba(214, 228, 240, 0.28) 0%, rgba(186, 206, 225, 0.12) 55%, rgba(20, 20, 19, 0.18) 100%)",
    mixBlend: "soft-light",
    shadowOverlay:
      "linear-gradient(110deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.02) 48%, rgba(16,22,28,0.34) 100%)",
    imageScale: 1.02,
    imageOrigin: "45% 50%",
    indicatorColor: "#B8C7D4",
  },
  {
    id: "high-noon",
    index: "02",
    codeLabel: "02. HIGH NOON ZENITH",
    hudLabel: "High Noon Zenith",
    kelvin: "6500K",
    lux: 1120,
    azimuth: "AZM 180° / ALT +74°",
    atmosphereNote: "Crisp high-contrast architectural shadows carved by direct zenithal daylight.",
    filter: "brightness(1.08) contrast(1.16) saturate(0.98) hue-rotate(0deg) sepia(0.02)",
    tintGradient:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(245, 243, 239, 0.05) 50%, rgba(20, 20, 19, 0.28) 100%)",
    mixBlend: "overlay",
    shadowOverlay:
      "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(20,20,19,0.05) 38%, rgba(20,20,19,0.44) 100%)",
    imageScale: 1.0,
    imageOrigin: "50% 45%",
    indicatorColor: "#F5F3EF",
  },
  {
    id: "golden-hour",
    index: "03",
    codeLabel: "03. GOLDEN HOUR 2700K",
    hudLabel: "Golden Hour 2700K",
    kelvin: "2700K",
    lux: 380,
    azimuth: "AZM 262° / ALT +11°",
    atmosphereNote: "Warm low-angle amber grazing across honed stone and timber soffits.",
    filter: "brightness(0.98) contrast(1.08) saturate(1.18) sepia(0.24) hue-rotate(-6deg)",
    tintGradient:
      "linear-gradient(125deg, rgba(218, 148, 76, 0.34) 0%, rgba(164, 90, 50, 0.22) 52%, rgba(20, 20, 19, 0.38) 100%)",
    mixBlend: "color",
    shadowOverlay:
      "linear-gradient(245deg, rgba(242,178,109,0.22) 0%, rgba(30,22,17,0.18) 52%, rgba(16,14,12,0.56) 100%)",
    imageScale: 1.035,
    imageOrigin: "55% 52%",
    indicatorColor: "#D89A5B",
  },
  {
    id: "midnight-ember",
    index: "04",
    codeLabel: "04. MIDNIGHT EMBER",
    hudLabel: "Midnight Ember",
    kelvin: "2100K",
    lux: 85,
    azimuth: "AZM 314° / ALT -22°",
    atmosphereNote: "Low-key interior warm architectural cove luminescence and hearth reflection.",
    filter: "brightness(0.64) contrast(1.24) saturate(0.92) sepia(0.32) hue-rotate(-12deg)",
    tintGradient:
      "radial-gradient(circle at 62% 58%, rgba(212, 122, 62, 0.28) 0%, rgba(24, 22, 20, 0.62) 65%, rgba(12, 12, 11, 0.85) 100%)",
    mixBlend: "multiply",
    shadowOverlay:
      "linear-gradient(180deg, rgba(12,12,11,0.58) 0%, rgba(20,18,16,0.22) 50%, rgba(10,10,9,0.72) 100%)",
    imageScale: 1.05,
    imageOrigin: "60% 55%",
    indicatorColor: "#A45A32",
  },
];

const MATERIAL_PALETTES: MaterialOption[] = [
  {
    id: "roman-travertine",
    name: "Roman Travertine",
    fig: "FIG. 01",
    archiveRef: "CH—RES—04",
    origin: "TIVOLI QUARRY · VEIN-CUT HONED",
    reflectance: "LRV 58%",
    acousticNrc: "NRC 0.15",
    thermalMass: "1.84 W/m·K",
    description:
      "Unfilled open-pore Tivoli travertine slabs laid in monolithic ashlar courses, capturing oblique solar grazing with soft mineral warmth.",
    imageUrl: "/images/sculptor.jpg",
    swatchHex: "#D4C8B8",
    grainOpacity: 0.12,
    materialTint: "rgba(212, 200, 184, 0.08)",
  },
  {
    id: "rift-sawn-oak",
    name: "Rift-Sawn Oak",
    fig: "FIG. 02",
    archiveRef: "CH—RES—04",
    origin: "DANISH HEARTWOOD · RAW OIL FINISH",
    reflectance: "LRV 42%",
    acousticNrc: "NRC 0.45",
    thermalMass: "0.17 W/m·K",
    description:
      "Linear rift-cut European white oak soffits and bespoke millwork partitions engineered for warm acoustic absorption and tactile grain continuity.",
    imageUrl: "/images/kyoto.jpg",
    swatchHex: "#9C7A56",
    grainOpacity: 0.16,
    materialTint: "rgba(156, 122, 86, 0.12)",
  },
  {
    id: "tadelakt-limewash",
    name: "Tadelakt Limewash",
    fig: "FIG. 03",
    archiveRef: "CH—RES—04",
    origin: "MARRAKECH LIME · RIVER-STONE BURNISHED",
    reflectance: "LRV 71%",
    acousticNrc: "NRC 0.25",
    thermalMass: "0.86 W/m·K",
    description:
      "Hand-troweled mineral lime plaster burnished with olive-oil soap, diffusing zenithal and low-angle light into velvety tonal gradients.",
    imageUrl: "/images/provence.jpg",
    swatchHex: "#E5DFD6",
    grainOpacity: 0.2,
    materialTint: "rgba(229, 223, 214, 0.1)",
  },
];

export default function SpatialSculptor() {
  // Default active states per specification:
  // Diurnal Cycle: 03. GOLDEN HOUR 2700K
  // Material Palette: Roman Travertine
  const [selectedCycleId, setSelectedCycleId] = useState<string>("golden-hour");
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>("roman-travertine");

  const activeCycle =
    DIURNAL_CYCLES.find((item) => item.id === selectedCycleId) ?? DIURNAL_CYCLES[2];
  const activeMaterial =
    MATERIAL_PALETTES.find((item) => item.id === selectedMaterialId) ?? MATERIAL_PALETTES[0];

  return (
    <section id="atelier" className="px-6 md:px-14 py-16 bg-[#F5F3EF]">
      <div className="mx-auto max-w-[1440px]">
        <div className="rounded-none border border-black/15 bg-white/65 backdrop-blur-2xl shadow-[0_32px_80px_rgba(20,20,19,0.08)] p-8 md:p-12">
          {/* 12-Column Interactive Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column (Cols 1-5) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              {/* Top Heading & Narrative */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6A64] flex items-center gap-2">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-none"
                      style={{ backgroundColor: activeCycle.indicatorColor }}
                    />
                    INTERACTIVE ENGINE
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6A64]">
                    {activeCycle.azimuth}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.03em] text-[#141413]">
                  Spatial &amp; Atmospheric Sculptor
                </h2>

                <p className="text-sm leading-relaxed text-[#6E6A64]">
                  Simulate the natural diurnal transition and tactile materiality across our core
                  residential envelopes.
                </p>
              </div>

              {/* Diurnal Cycle Selector (4 Interactive Rows) */}
              <div className="space-y-2.5" role="radiogroup" aria-label="Diurnal Lighting Cycle">
                <div className="flex items-center justify-between pb-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6E6A64]">
                    DIURNAL SOLAR SEQUENCE
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6E6A64]">
                    KELVIN / ILLUMINANCE
                  </span>
                </div>

                <div className="divide-y divide-black/10 border border-black/15 bg-[#EAE6DF]/45">
                  {DIURNAL_CYCLES.map((cycle) => {
                    const isActive = cycle.id === activeCycle.id;
                    return (
                      <button
                        key={cycle.id}
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        onClick={() => setSelectedCycleId(cycle.id)}
                        className={`group relative w-full text-left px-4 py-3.5 transition-colors duration-300 flex items-center justify-between focus:outline-none focus-visible:ring-1 focus-visible:ring-[#141413] ${
                          isActive
                            ? "bg-[#141413] text-[#F5F3EF]"
                            : "bg-transparent text-[#141413] hover:bg-black/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-2 w-2 rounded-none transition-transform duration-300 ${
                              isActive ? "scale-110" : "opacity-60 group-hover:opacity-100"
                            }`}
                            style={{ backgroundColor: cycle.indicatorColor }}
                          />
                          <span className="font-mono text-xs uppercase tracking-[0.08em]">
                            {cycle.codeLabel}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-[11px] uppercase tracking-[0.08em] ${
                              isActive ? "text-[#F5F3EF]/80" : "text-[#6E6A64]"
                            }`}
                          >
                            LUX {cycle.lux}
                          </span>
                          <span
                            className={`font-mono text-[10px] uppercase tracking-[0.08em] px-1.5 py-0.5 border ${
                              isActive
                                ? "border-white/20 text-[#F5F3EF]"
                                : "border-black/10 text-[#6E6A64]"
                            }`}
                          >
                            {cycle.kelvin}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Material Palette Pills / Rectilinear Buttons & Live Telemetry */}
              <div className="space-y-4 pt-2 border-t border-black/10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6E6A64]">
                    TACTILE ENVELOPE SUBSTRATE
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6E6A64]">
                    {activeMaterial.origin}
                  </span>
                </div>

                <div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                  role="radiogroup"
                  aria-label="Material Palette"
                >
                  {MATERIAL_PALETTES.map((material) => {
                    const isSelected = material.id === activeMaterial.id;
                    return (
                      <button
                        key={material.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedMaterialId(material.id)}
                        className={`relative rounded-none border px-3 py-2.5 text-left transition-all duration-300 flex items-center gap-2.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#141413] ${
                          isSelected
                            ? "border-[#141413] bg-[#141413] text-[#F5F3EF]"
                            : "border-black/15 bg-white/50 text-[#141413] hover:border-black/35 hover:bg-white/80"
                        }`}
                      >
                        <span
                          className="h-3 w-3 shrink-0 rounded-none border border-black/20"
                          style={{ backgroundColor: material.swatchHex }}
                        />
                        <span className="text-xs font-medium tracking-[-0.01em] truncate">
                          {material.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Acoustic & Thermal Reflectance Telemetry Strip */}
                <div className="grid grid-cols-3 gap-2 border border-black/10 bg-[#F5F3EF]/80 p-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6E6A64]">
                      REFLECTANCE
                    </div>
                    <div className="font-mono text-xs text-[#141413] mt-0.5">
                      {activeMaterial.reflectance}
                    </div>
                  </div>
                  <div className="border-l border-black/10 pl-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6E6A64]">
                      ACOUSTIC ABS.
                    </div>
                    <div className="font-mono text-xs text-[#141413] mt-0.5">
                      {activeMaterial.acousticNrc}
                    </div>
                  </div>
                  <div className="border-l border-black/10 pl-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6E6A64]">
                      CONDUCTIVITY
                    </div>
                    <div className="font-mono text-xs text-[#141413] mt-0.5">
                      {activeMaterial.thermalMass}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Cols 6-12): Interactive Architectural Viewport */}
            <div className="lg:col-span-7 relative min-h-[420px] lg:min-h-[540px] overflow-hidden border border-black/10 bg-[#141413]">
              {/* Crossfading High-Res Architectural Interior Photograph */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeMaterial.id}-${activeCycle.id}`}
                  initial={{ opacity: 0.15, scale: 1.04 }}
                  animate={{
                    opacity: 1,
                    scale: activeCycle.imageScale,
                  }}
                  exit={{ opacity: 0.15, scale: 1.01 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full"
                  style={{
                    transformOrigin: activeCycle.imageOrigin,
                  }}
                >
                  <img
                    src={activeMaterial.imageUrl}
                    alt={`${activeMaterial.name} architectural envelope under ${activeCycle.hudLabel} illumination`}
                    className="h-full w-full object-cover object-center transition-[filter] duration-700"
                    style={{
                      filter: activeCycle.filter,
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Real-time Atmospheric Color Grading Layer (mix-blend-mode) */}
              <motion.div
                aria-hidden="true"
                animate={{ background: activeCycle.tintGradient }}
                transition={{ duration: 0.7 }}
                className="pointer-events-none absolute inset-0"
                style={{
                  mixBlendMode: activeCycle.mixBlend,
                }}
              />

              {/* Material Substrate Tint & Directional Solar Shadow Vector */}
              <motion.div
                aria-hidden="true"
                animate={{ background: activeCycle.shadowOverlay }}
                transition={{ duration: 0.7 }}
                className="pointer-events-none absolute inset-0"
              />

              {/* Subtle Tactile Mineral / Timber Tint Overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: activeMaterial.grainOpacity,
                  backgroundColor: activeMaterial.materialTint,
                }}
              />

              {/* Subtle Architectural Framing Reticle Lines */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-5 border border-white/15"
              />

              {/* Top-Left Solar Calibration Tag */}
              <div className="pointer-events-none absolute top-8 left-8 hidden sm:flex items-center gap-2 bg-[#141413]/55 backdrop-blur-md border border-white/15 px-3 py-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#F5F3EF]/85">
                  ENVELOPE // {activeMaterial.name.toUpperCase()}
                </span>
              </div>

              {/* Top-Right Live Frosted Telemetry HUD Badge */}
              <div className="absolute top-8 right-8 z-10">
                <motion.div
                  key={`${activeCycle.id}-${activeMaterial.fig}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-[#141413]/70 backdrop-blur-xl border border-white/20 px-3.5 py-2 flex items-center gap-2.5 shadow-lg"
                >
                  <span
                    className="h-2 w-2 rounded-none"
                    style={{ backgroundColor: activeCycle.indicatorColor }}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#F5F3EF]">
                    {activeCycle.hudLabel} — LUX {activeCycle.lux} / {activeMaterial.fig}
                  </span>
                </motion.div>
              </div>

              {/* Bottom Monograph Bar */}
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#141413]/95 via-[#141413]/80 to-transparent pt-12 pb-6 px-6 md:px-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeMaterial.id}-${activeCycle.id}-monograph`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="border-t border-white/20 pt-4 flex flex-col md:flex-row md:items-end justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#F5F3EF]/70">
                          STUDIO ARCHIVE REF: {activeMaterial.archiveRef}
                        </span>
                        <span className="text-white/30 font-mono text-[11px]">•</span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#F5F3EF]">
                          {activeCycle.hudLabel} ({activeCycle.kelvin})
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-[#F5F3EF]/90 leading-relaxed">
                        {activeMaterial.description}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-3 border border-white/15 bg-white/5 backdrop-blur-md px-3 py-2">
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#F5F3EF]/60">
                          SUBSTRATE SPEC
                        </div>
                        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#F5F3EF]">
                          {activeMaterial.name} · {activeMaterial.reflectance}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

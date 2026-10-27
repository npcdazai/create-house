"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface DiurnalOption {
  id: string;
  index: string;
  codeLabel: string;
  shortLabel: string;
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
  shortName: string;
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
    shortLabel: "01. MORNING MIST",
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
    indicatorColor: "#8FAEC7",
  },
  {
    id: "high-noon",
    index: "02",
    codeLabel: "02. HIGH NOON ZENITH",
    shortLabel: "02. HIGH NOON",
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
    indicatorColor: "#E8C56B",
  },
  {
    id: "golden-hour",
    index: "03",
    codeLabel: "03. GOLDEN HOUR 2700K",
    shortLabel: "03. GOLDEN HOUR",
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
    shortLabel: "04. MIDNIGHT",
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
    shortName: "Travertine",
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
    shortName: "Rift Oak",
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
    shortName: "Limewash",
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

const AUTO_CYCLE_MS = 3500;

export default function SpatialSculptor() {
  const [selectedCycleId, setSelectedCycleId] = useState<string>("golden-hour");
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>("roman-travertine");
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoCycling) return;

    const timer = setInterval(() => {
      setSelectedCycleId((prevId) => {
        const currentIndex = DIURNAL_CYCLES.findIndex((item) => item.id === prevId);
        const nextIndex = (currentIndex + 1) % DIURNAL_CYCLES.length;
        return DIURNAL_CYCLES[nextIndex].id;
      });
    }, AUTO_CYCLE_MS);

    return () => clearInterval(timer);
  }, [isAutoCycling, selectedCycleId]);

  const activeCycle =
    DIURNAL_CYCLES.find((item) => item.id === selectedCycleId) ?? DIURNAL_CYCLES[2];
  const activeMaterial =
    MATERIAL_PALETTES.find((item) => item.id === selectedMaterialId) ?? MATERIAL_PALETTES[0];

  return (
    <section id="atelier" className="px-4 sm:px-6 md:px-14 py-10 md:py-16 bg-[#F5F3EF]">
      <div className="mx-auto max-w-[1440px]">
        <div className="rounded-none border border-black/15 bg-white/65 backdrop-blur-2xl shadow-[0_32px_80px_rgba(20,20,19,0.08)] p-5 sm:p-8 md:p-12">
          {/* Mobile-only Top Header so the Title sits above the Viewport on phones */}
          <div className="lg:hidden space-y-2.5 pb-5">
            <div className="flex items-center justify-between border-b border-black/10 pb-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6E6A64] flex items-center gap-2">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-none"
                  style={{ backgroundColor: activeCycle.indicatorColor }}
                />
                INTERACTIVE ENGINE
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6E6A64]">
                {activeCycle.azimuth}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-medium tracking-[-0.03em] text-[#141413]">
              Spatial &amp; Atmospheric Sculptor
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#6E6A64]">
              Simulate the natural diurnal transition and tactile materiality across our core
              residential envelopes.
            </p>
          </div>

          {/* 12-Column Interactive Split (Viewport first on mobile so users see live changes as they tap!) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
            {/* Left Column (Cols 1-5 on Desktop, Order 2 on Mobile) */}
            <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between space-y-6 lg:space-y-8">
              {/* Desktop Heading & Narrative */}
              <div className="hidden lg:block space-y-4">
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
              <div className="space-y-2" role="radiogroup" aria-label="Diurnal Lighting Cycle">
                <div className="flex items-center justify-between pb-1 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6E6A64]">
                      DIURNAL SOLAR SEQUENCE
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAutoCycling((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-black/15 font-mono text-[9px] uppercase tracking-[0.08em] text-[#141413] hover:bg-black/5 transition-colors cursor-pointer"
                      title={
                        isAutoCycling
                          ? "Pause automatic solar sequence"
                          : "Resume automatic solar sequence"
                      }
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isAutoCycling ? "bg-[#4A6B53] animate-pulse" : "bg-[#6E6A64]"
                        }`}
                      />
                      <span>{isAutoCycling ? "AUTO" : "PAUSED"}</span>
                    </button>
                  </div>
                  <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.08em] text-[#6E6A64]">
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
                        className={`group relative w-full text-left px-3.5 sm:px-4 py-3 sm:py-3.5 transition-colors duration-300 flex items-center justify-between gap-2 overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-[#141413] cursor-pointer ${
                          isActive
                            ? "bg-[#141413] text-[#F5F3EF]"
                            : "bg-transparent text-[#141413] hover:bg-black/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`h-2.5 w-2.5 shrink-0 rounded-none border border-black/20 transition-transform duration-300 ${
                              isActive ? "scale-110 border-white/30" : "opacity-85 group-hover:opacity-100"
                            }`}
                            style={{ backgroundColor: cycle.indicatorColor }}
                          />
                          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.06em] sm:tracking-[0.08em] truncate">
                            <span className="sm:hidden">{cycle.shortLabel}</span>
                            <span className="hidden sm:inline">{cycle.codeLabel}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                          <span
                            className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.06em] whitespace-nowrap ${
                              isActive ? "text-[#F5F3EF]/80" : "text-[#6E6A64]"
                            }`}
                          >
                            LUX {cycle.lux}
                          </span>
                          <span
                            className={`font-mono text-[10px] uppercase tracking-[0.06em] px-1.5 py-0.5 border whitespace-nowrap ${
                              isActive
                                ? "border-white/20 text-[#F5F3EF]"
                                : "border-black/10 text-[#6E6A64]"
                            }`}
                          >
                            {cycle.kelvin}
                          </span>
                        </div>

                        {/* Animated Auto-Cycle Progress Line */}
                        {isActive && isAutoCycling && (
                          <motion.span
                            key={`progress-${cycle.id}`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: AUTO_CYCLE_MS / 1000, ease: "linear" }}
                            style={{ backgroundColor: cycle.indicatorColor }}
                            className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Material Palette Selector & Live Telemetry */}
              <div className="space-y-3.5 pt-2 border-t border-black/10">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6E6A64] shrink-0">
                    TACTILE SUBSTRATE
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#6E6A64] truncate text-right">
                    {activeMaterial.origin}
                  </span>
                </div>

                {/* 3-Column Horizontal Grid on both Mobile and Desktop so all 3 fit on one row */}
                <div
                  className="grid grid-cols-3 gap-1.5 sm:gap-2"
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
                        className={`relative rounded-none border px-2.5 sm:px-3 py-2.5 text-left transition-all duration-300 flex items-center gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#141413] cursor-pointer ${
                          isSelected
                            ? "border-[#141413] bg-[#141413] text-[#F5F3EF]"
                            : "border-black/15 bg-white/50 text-[#141413] hover:border-black/35 hover:bg-white/80"
                        }`}
                      >
                        <span
                          className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 rounded-none border border-black/20"
                          style={{ backgroundColor: material.swatchHex }}
                        />
                        <span className="text-[11px] sm:text-xs font-medium tracking-[-0.01em] truncate">
                          <span className="sm:hidden">{material.shortName}</span>
                          <span className="hidden sm:inline">{material.name}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Acoustic & Thermal Reflectance Telemetry Strip */}
                <div className="grid grid-cols-3 gap-2 border border-black/10 bg-[#F5F3EF]/80 p-2.5 sm:p-3">
                  <div>
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.06em] text-[#6E6A64] truncate">
                      REFLECTANCE
                    </div>
                    <div className="font-mono text-[11px] sm:text-xs text-[#141413] mt-0.5 whitespace-nowrap">
                      {activeMaterial.reflectance}
                    </div>
                  </div>
                  <div className="border-l border-black/10 pl-2.5 sm:pl-3">
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.06em] text-[#6E6A64] truncate">
                      ACOUSTIC
                    </div>
                    <div className="font-mono text-[11px] sm:text-xs text-[#141413] mt-0.5 whitespace-nowrap">
                      {activeMaterial.acousticNrc}
                    </div>
                  </div>
                  <div className="border-l border-black/10 pl-2.5 sm:pl-3">
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.06em] text-[#6E6A64] truncate">
                      THERMAL
                    </div>
                    <div className="font-mono text-[11px] sm:text-xs text-[#141413] mt-0.5 whitespace-nowrap">
                      {activeMaterial.thermalMass}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Cols 6-12 on Desktop, Order 1 on Mobile): Interactive Architectural Viewport */}
            <div className="order-1 lg:order-2 lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[540px] overflow-hidden border border-black/10 bg-[#141413]">
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

              {/* Subtle Architectural Framing Reticle Lines (Desktop/Tablet) */}
              <div
                aria-hidden="true"
                className="pointer-events-none hidden sm:block absolute inset-5 border border-white/15"
              />

              {/* Top-Left Solar Calibration Tag */}
              <div className="pointer-events-none absolute top-4 left-4 sm:top-8 sm:left-8 hidden md:flex items-center gap-2 bg-[#141413]/55 backdrop-blur-md border border-white/15 px-3 py-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#F5F3EF]/85">
                  ENVELOPE // {activeMaterial.name.toUpperCase()}
                </span>
              </div>

              {/* Top-Right Live Frosted Telemetry HUD Badge */}
              <div className="absolute top-3 right-3 sm:top-8 sm:right-8 z-10">
                <motion.div
                  key={`${activeCycle.id}-${activeMaterial.fig}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-[#141413]/75 backdrop-blur-xl border border-white/20 px-2.5 py-1.5 sm:px-3.5 sm:py-2 flex items-center gap-2 shadow-lg"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-none"
                    style={{ backgroundColor: activeCycle.indicatorColor }}
                  />
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.06em] sm:tracking-[0.08em] text-[#F5F3EF] whitespace-nowrap">
                    {activeCycle.hudLabel} — LUX {activeCycle.lux} / {activeMaterial.fig}
                  </span>
                </motion.div>
              </div>

              {/* Bottom Monograph Bar (Compact on Mobile so the image remains unobstructed) */}
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#141413]/95 via-[#141413]/70 to-transparent pt-8 sm:pt-12 pb-3.5 sm:pb-6 px-4 sm:px-6 md:px-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeMaterial.id}-${activeCycle.id}-monograph`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="border-t border-white/20 pt-2.5 sm:pt-4 flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
                        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-[#F5F3EF]/75">
                          REF: {activeMaterial.archiveRef}
                        </span>
                        <span className="text-white/30 font-mono text-[10px]">•</span>
                        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-[#F5F3EF]">
                          {activeMaterial.name}
                        </span>
                      </div>
                      <p className="hidden sm:block text-xs md:text-sm text-[#F5F3EF]/90 leading-relaxed">
                        {activeMaterial.description}
                      </p>
                    </div>

                    <div className="hidden sm:flex shrink-0 items-center gap-3 border border-white/15 bg-white/5 backdrop-blur-md px-3 py-2">
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

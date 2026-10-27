import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import SpatialSculptor from "@/components/sections/SpatialSculptor";
import StickyStudio from "@/components/sections/StickyStudio";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import DarkPhilosophy from "@/components/sections/DarkPhilosophy";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-alabaster text-carbon relative">
      <Navbar />
      <main>
        <Hero />
        <SpatialSculptor />
        <StickyStudio />
        <ProjectShowcase />
        <DarkPhilosophy />
      </main>
      <Footer />
    </div>
  );
}


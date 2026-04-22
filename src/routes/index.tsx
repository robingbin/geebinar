import { createFileRoute } from "@tanstack/react-router";
import { CursorGlow } from "@/components/site/CursorGlow";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Showreel } from "@/components/site/Showreel";
import { FeaturedFilms } from "@/components/site/FeaturedFilms";
import { AllProjects } from "@/components/site/AllProjects";
import { Reels } from "@/components/site/Reels";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-site-cinematic text-foreground overflow-x-hidden">
      {/* Global cinematic 3D backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Aurora blobs */}
        <div
          className="absolute -top-40 -left-40 w-[55vw] h-[55vw] rounded-full blur-3xl opacity-50 animate-aurora"
          style={{ background: "radial-gradient(circle, oklch(0.78 0.16 65 / 0.35), transparent 60%)" }}
        />
        <div
          className="absolute top-[30%] -right-40 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-40 animate-aurora-2"
          style={{ background: "radial-gradient(circle, oklch(0.7 0.14 200 / 0.32), transparent 60%)" }}
        />
        <div
          className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] rounded-full blur-3xl opacity-35 animate-aurora"
          style={{ background: "radial-gradient(circle, oklch(0.62 0.18 30 / 0.3), transparent 60%)" }}
        />
        {/* Mesh / dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(var(--foreground) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        {/* Large rotating wireframe rings */}
        <div
          className="absolute top-[10%] left-[8%] w-[40vw] h-[40vw] rounded-full border border-primary/15 animate-spin-slow"
        />
        <div
          className="absolute bottom-[5%] right-[6%] w-[34vw] h-[34vw] rounded-full border border-accent/15 animate-spin-slower"
        />
        <div
          className="absolute top-[40%] left-[40%] w-[18vw] h-[18vw] rounded-full border border-primary/10 animate-spin-slow"
        />
        {/* Diagonal light streaks */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "repeating-linear-gradient(115deg, transparent 0 80px, oklch(from var(--primary) l c h / 0.04) 80px 82px)",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, oklch(from var(--background) l c h / 0.85) 100%)",
          }}
        />
      </div>

      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Showreel />
        <FeaturedFilms />
        <AllProjects />
        <Reels />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

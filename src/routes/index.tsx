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
        {/* 3D wireframe cubes — left & right */}
        <div className="absolute top-[14%] left-[4%] w-40 h-40 opacity-60" style={{ perspective: "800px" }}>
          <div className="w-full h-full animate-spin-slow" style={{ transformStyle: "preserve-3d", transform: "rotateX(45deg) rotateY(45deg)" }}>
            {[
              "translateZ(80px)",
              "translateZ(-80px) rotateY(180deg)",
              "rotateY(90deg) translateZ(80px)",
              "rotateY(-90deg) translateZ(80px)",
              "rotateX(90deg) translateZ(80px)",
              "rotateX(-90deg) translateZ(80px)",
            ].map((t, i) => (
              <div key={i} className="absolute inset-0 border border-primary/30" style={{ transform: t }} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-[18%] right-[5%] w-52 h-52 opacity-50" style={{ perspective: "1000px" }}>
          <div className="w-full h-full animate-spin-slower" style={{ transformStyle: "preserve-3d", transform: "rotateX(35deg) rotateY(-25deg)" }}>
            {[
              "translateZ(104px)",
              "translateZ(-104px) rotateY(180deg)",
              "rotateY(90deg) translateZ(104px)",
              "rotateY(-90deg) translateZ(104px)",
              "rotateX(90deg) translateZ(104px)",
              "rotateX(-90deg) translateZ(104px)",
            ].map((t, i) => (
              <div key={i} className="absolute inset-0 border border-accent/30" style={{ transform: t }} />
            ))}
          </div>
        </div>
        {/* Twinkling stars / particles */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20% 30%, var(--primary), transparent 50%), radial-gradient(1px 1px at 70% 60%, var(--accent), transparent 50%), radial-gradient(1px 1px at 40% 80%, var(--primary), transparent 50%), radial-gradient(1.5px 1.5px at 85% 20%, var(--accent), transparent 50%), radial-gradient(1px 1px at 10% 70%, var(--primary), transparent 50%), radial-gradient(1px 1px at 60% 15%, var(--accent), transparent 50%)",
            backgroundSize: "100% 100%",
            animation: "glow-pulse 5s ease-in-out infinite",
          }}
        />
        {/* Hex grid pattern (light shows in light theme, subtle in dark) */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(60deg, var(--foreground) 1px, transparent 1px), linear-gradient(-60deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "48px 84px",
            maskImage: "radial-gradient(ellipse at 70% 30%, black 10%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 70% 30%, black 10%, transparent 70%)",
          }}
        />
        {/* Floating film frames */}
        <div
          className="absolute top-[55%] left-[2%] w-24 h-40 border-2 border-primary/20 rounded-sm rotate-12 animate-float"
          style={{ background: "linear-gradient(180deg, oklch(from var(--primary) l c h / 0.08), transparent)" }}
        />
        <div
          className="absolute top-[8%] right-[18%] w-20 h-32 border-2 border-accent/20 rounded-sm -rotate-6 animate-float-slow"
          style={{ background: "linear-gradient(180deg, oklch(from var(--accent) l c h / 0.08), transparent)" }}
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

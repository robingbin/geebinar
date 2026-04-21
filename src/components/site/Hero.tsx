import { BeforeAfterSlider } from "./BeforeAfterSlider";
import beforeImg from "@/assets/before-vfx.jpg";
import afterImg from "@/assets/after-vfx.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Atmospheric blurred background of after-image */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <img
          src={afterImg}
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
          style={{ filter: "blur(40px)", transform: "scale(1.2)" }}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-background/60" />

      <div className="relative mx-auto max-w-7xl w-full grid lg:grid-cols-12 gap-10 items-center">
        {/* Left: Text */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-[10px] tracking-[0.35em] uppercase text-muted-foreground animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-glow-pulse" />
            VFX Compositor · Available for projects
          </div>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-[6.5rem] leading-[0.9] tracking-tight text-foreground">
            <span className="block animate-letter-rise" style={{ animationDelay: "0.1s" }}>
              GEEBIN
            </span>
            <span
              className="block text-gradient-amber animate-letter-rise"
              style={{ animationDelay: "0.3s" }}
            >
              A R
            </span>
          </h1>

          <div
            className="font-display text-lg sm:text-xl tracking-[0.4em] text-muted-foreground animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            VFX COMPOSITOR
          </div>

          <p
            className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.8s" }}
          >
            Crafting cinematic reality — frame by frame. Blending raw footage with
            visual storytelling for India's biggest films.
          </p>

          <div
            className="flex flex-wrap items-center gap-4 pt-2 animate-fade-up"
            style={{ animationDelay: "1s" }}
          >
            <a
              href="#featured"
              className="group relative inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 rounded-full font-medium text-sm uppercase tracking-widest hover:scale-105 transition-transform duration-500 glow-amber"
            >
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#reels"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-foreground border-b border-foreground/30 hover:border-primary hover:text-primary transition-colors py-2"
            >
              ▶ Watch Showreel
            </a>
          </div>
        </div>

        {/* Right: Before/After slider */}
        <div
          className="lg:col-span-7 aspect-[16/10] w-full animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <BeforeAfterSlider
            beforeSrc={beforeImg}
            afterSrc={afterImg}
            beforeLabel="Before · Raw Plate"
            afterLabel="After · Final VFX"
          />
        </div>
      </div>

      {/* Tagline strip */}
      <div className="relative mx-auto max-w-7xl w-full mt-16 pt-8 border-t border-border/50 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
        {[
          { k: "16+", v: "Feature Films" },
          { k: "120+", v: "VFX Shots" },
          { k: "5+", v: "Years Experience" },
          { k: "∞", v: "Cinematic Frames" },
        ].map((s) => (
          <div key={s.v}>
            <div className="font-display text-3xl sm:text-4xl text-gradient-amber">{s.k}</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">
              {s.v}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-glow-pulse" />
      </div>
    </section>
  );
}
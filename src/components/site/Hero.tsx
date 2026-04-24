export function Hero() {
  const title = "GEEBIN A R";
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Static background layer (grid, scanlines, film strip) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Perspective grid floor */}
        <div
          className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[200%] h-[70%] opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: "perspective(800px) rotateX(65deg)",
            maskImage: "linear-gradient(to top, black 10%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 80%)",
          }}
        />
        {/* Film strip */}
        <div
          className="absolute -left-10 top-1/4 w-32 h-[120%] opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, var(--foreground) 0 6px, transparent 6px 28px)",
            transform: "rotate(-12deg)",
            maskImage: "radial-gradient(ellipse at center, black, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 70%)",
          }}
        />
        {/* Scanlines */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, var(--foreground) 0 1px, transparent 1px 4px)",
          }}
        />
      </div>

      {/* 3D feature objects layer — placed in corner/edge empty zones only */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Floating glow orbs — pushed to far corners, away from centered text */}
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-50 animate-float"
          style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-40 animate-float-slow"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)", animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-[60%] -left-40 w-80 h-80 rounded-full blur-3xl opacity-30 animate-float"
          style={{
            background: "radial-gradient(circle, oklch(0.62 0.18 30 / 0.55), transparent 70%)",
            animationDelay: "0.8s",
          }}
        />

        {/* Floating 3D cubes — only in left/right edge gutters, never under headline */}
        <FloatingCube className="absolute top-[14%] left-[3%] w-20 h-20 animate-float" />
        <FloatingCube className="absolute top-[16%] right-[4%] w-24 h-24 animate-float-slow" delay="1.2s" />
        <FloatingCube className="absolute bottom-[28%] left-[5%] w-16 h-16 animate-float" delay="2s" />
        <FloatingCube className="absolute bottom-[30%] right-[6%] w-14 h-14 animate-float-slow" delay="2.6s" />

        {/* Big rotating rings — anchored off-canvas right, away from centered text */}
        <div className="absolute -right-72 top-1/4 w-[40rem] h-[40rem] rounded-full border border-primary/20 animate-spin-slow" />
        <div className="absolute -left-72 top-1/3 w-[32rem] h-[32rem] rounded-full border border-accent/20 animate-spin-slower" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-[10px] tracking-[0.35em] uppercase text-muted-foreground animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-glow-pulse" />
          PORTFOLIO 2026
        </div>

        <h1 className="font-display leading-[0.85] tracking-tight text-foreground">
          <span className="block text-[3.2rem] sm:text-7xl md:text-8xl lg:text-[10rem] char-stagger">
            {title.split("").map((c, i) => (
              <span
                key={i}
                style={{ animationDelay: `${0.05 * i + 0.1}s` }}
                className={c === " " ? "inline-block w-[0.4em]" : ""}
              >
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
          <span
            className="block mt-3 text-xl sm:text-2xl md:text-3xl tracking-[0.4em] text-shimmer animate-fade-up"
            style={{ animationDelay: "1.2s" }}
          >
            {"VFX COMPOSITOR \u00B7 VIDEO EDITOR"}
          </span>
        </h1>

        <p
          className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed animate-fade-up"
          style={{ animationDelay: "1.4s" }}
        >
          Crafting cinematic reality — frame by frame. Blending raw footage with
          visual storytelling for India's biggest films.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-4 pt-2 animate-fade-up"
          style={{ animationDelay: "1.6s" }}
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

      {/* Stats strip */}
      <div className="relative z-10 mx-auto max-w-7xl w-full mt-24 sm:mt-28 pt-8 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {[
          { k: "16+", v: "Feature Films" },
          { k: "120+", v: "VFX Shots" },
          { k: "5+", v: "Years Experience" },
          { k: "∞", v: "Cinematic Frames" },
        ].map((s, i) => (
          <div
            key={s.v}
            className="animate-fade-up"
            style={{ animationDelay: `${1.8 + i * 0.1}s` }}
          >
            <div className="font-display text-3xl sm:text-5xl text-gradient-amber">{s.k}</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">
              {s.v}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute z-10 bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-glow-pulse" />
      </div>
    </section>
  );
}

function FloatingCube({ className = "", delay = "0s" }: { className?: string; delay?: string }) {
  return (
    <div
      className={`${className}`}
      style={{ animationDelay: delay, perspective: "600px" }}
    >
      <div
        className="w-full h-full animate-spin-slow"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(45deg) rotateY(45deg)",
        }}
      >
        {[
          { t: "translateZ(50%)" },
          { t: "translateZ(-50%) rotateY(180deg)" },
          { t: "rotateY(90deg) translateZ(50%)" },
          { t: "rotateY(-90deg) translateZ(50%)" },
          { t: "rotateX(90deg) translateZ(50%)" },
          { t: "rotateX(-90deg) translateZ(50%)" },
        ].map((f, i) => (
          <div
            key={i}
            className="absolute inset-0 border border-primary/40"
            style={{
              transform: f.t,
              background:
                "linear-gradient(135deg, oklch(from var(--primary) l c h / 0.05), oklch(from var(--accent) l c h / 0.05))",
            }}
          />
        ))}
      </div>
    </div>
  );
}

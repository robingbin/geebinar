import { useEffect, useState } from "react";
import logoGeebin from "@/assets/logo-geebin.png";

export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Hold the loader for ~2.2s, then play the curtain exit
    const leaveTimer = setTimeout(() => setLeaving(true), 2200);
    const hideTimer = setTimeout(() => setHidden(true), 3300);
    // Lock body scroll while loader is up
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = original;
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[10000] pointer-events-none"
    >
      {/* Top curtain */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-background ${
          leaving ? "animate-curtain-up" : ""
        }`}
        style={{
          background:
            "linear-gradient(180deg, var(--background) 0%, oklch(from var(--background) calc(l + 0.02) c h) 100%)",
        }}
      />
      {/* Bottom curtain */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-background ${
          leaving ? "animate-curtain-down" : ""
        }`}
        style={{
          background:
            "linear-gradient(0deg, var(--background) 0%, oklch(from var(--background) calc(l + 0.02) c h) 100%)",
        }}
      />

      {/* Center content */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-8 transition-opacity duration-500 ${
          leaving ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Pulsing glow behind logo */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-80 animate-glow-pulse"
            style={{
              background:
                "radial-gradient(circle, var(--primary), transparent 70%)",
            }}
          />
          <img
            src={logoGeebin}
            alt="Geebin A R"
            className="relative w-28 h-28 sm:w-36 sm:h-36 object-contain animate-logo-zoom-in drop-shadow-[0_0_30px_oklch(0.78_0.16_65/0.7)]"
          />
        </div>

        {/* Brand name with light sweep */}
        <div
          className="font-display text-3xl sm:text-5xl tracking-[0.3em] text-light-sweep animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          GEEBIN<span className="text-primary mx-2">·</span>A R
        </div>

        {/* Loader bar */}
        <div
          className="relative w-48 sm:w-64 h-[2px] overflow-hidden bg-foreground/10 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div
            className="absolute inset-y-0 w-1/2 animate-loader-bar"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--primary), var(--accent), transparent)",
            }}
          />
        </div>

        {/* Caption */}
        <div
          className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0.8s" }}
        >
          Loading Cinematic Experience
        </div>
      </div>
    </div>
  );
}

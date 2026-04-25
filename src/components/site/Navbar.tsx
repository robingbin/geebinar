import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import logoGeebin from "@/assets/logo-geebin.png";

const links = [
  { label: "Work", href: "#featured" },
  { label: "Projects", href: "#projects" },
  { label: "Reels", href: "#reels" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      {/* Blur bar behind logo / nav / toggle */}
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 -z-10 transition-all duration-500 ${
          scrolled ? "h-20" : "h-28"
        } bg-background/30 backdrop-blur-2xl backdrop-saturate-150 border-b border-border/40`}
        style={{
          WebkitBackdropFilter: "blur(28px) saturate(150%)",
          maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between gap-4">
        <a href="#top" className="group font-display text-xl tracking-widest text-foreground shrink-0 inline-flex items-center gap-2.5">
          <img
            src={logoGeebin}
            alt="Geebin A R logo"
            className="w-9 h-9 object-contain animate-tilt-3d drop-shadow-[0_0_12px_oklch(0.7_0.18_50/0.5)] group-hover:scale-110 transition-transform"
          />
          <span>GEEBIN<span className="text-primary mx-1">·</span>A R</span>
        </a>
        {/* Center pill nav with strong blur */}
        <nav
          className={`hidden md:flex items-center gap-2 rounded-full px-2 py-2 border border-border/60 bg-background/40 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_-12px_oklch(0_0_0/0.5)] transition-all duration-500 ${
            scrolled ? "scale-95" : ""
          }`}
          style={{ WebkitBackdropFilter: "blur(24px) saturate(150%)" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors px-4 py-2 rounded-full"
            >
              {l.label}
            </a>
          ))}
        </nav>
        {/* Outside the navigation: theme toggle + Hire Me */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-foreground border border-primary/40 hover:border-primary hover:bg-primary/10 px-4 py-2 rounded-full transition-all backdrop-blur-md"
          >
            Let's Talk
          </a>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="text-foreground p-2 rounded-full bg-background/40 backdrop-blur-xl border border-border/60"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden mx-6 mt-2 rounded-2xl p-6 flex flex-col gap-4 animate-fade-up bg-background/70 backdrop-blur-2xl backdrop-saturate-150 border border-border/60 shadow-[0_8px_32px_-12px_oklch(0_0_0/0.5)]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="text-sm uppercase tracking-widest text-primary font-medium pt-2 border-t border-border"
          >
          Let's Talk →
          </a>
        </div>
      )}
    </header>
  );
}
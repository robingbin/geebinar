import logoGeebin from "@/assets/logo-geebin.png";

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-display text-2xl tracking-widest text-foreground inline-flex items-center gap-3">
          <img
            src={logoGeebin}
            alt="Geebin A R logo"
            className="w-10 h-10 object-contain animate-spin-slow drop-shadow-[0_0_14px_oklch(0.7_0.18_50/0.55)]"
          />
          GEEBIN<span className="text-primary"> </span>A R
        </div>
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground text-center">
          © {new Date().getFullYear()} · Portfolio
        </div>
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <a href="#top" className="hover:text-primary transition-colors">↑ Back to top</a>
        </div>
      </div>
    </footer>
  );
}
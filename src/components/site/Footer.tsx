export function Footer() {
  return (
    <footer className="relative border-t border-border/40 py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-display text-2xl tracking-widest text-foreground">
          GEEBIN<span className="text-primary"> </span>A R
        </div>
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground text-center">
          © {new Date().getFullYear()} · Crafting Cinematic Reality
        </div>
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <a href="#top" className="hover:text-primary transition-colors">↑ Back to top</a>
        </div>
      </div>
    </footer>
  );
}
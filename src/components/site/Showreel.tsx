import { useEffect, useRef } from "react";

export function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="showreel"
      ref={sectionRef}
      className="relative py-32 px-6 border-t border-border/40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-3">
              · Showreel 2025
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-foreground leading-none">
              THE <span className="text-gradient-amber">REEL</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A cinematic cut of my latest VFX compositing work — from invisible
            integration to full CG environments.
          </p>
        </div>

        <div className="reveal">
          <div className="relative aspect-video rounded-2xl overflow-hidden cinematic-shadow ring-1 ring-inset ring-foreground/10 group">
            <iframe
              src="https://www.youtube.com/embed/y9YbLOg6gdQ?rel=0&modestbranding=1"
              title="VFX Showreel"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/0 group-hover:ring-primary/40 transition-colors duration-500 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useRef } from "react";

const reels = [
  "DXbzpLxjdek",
  "DXWooq6gWRc",
  "DUBG437kZJf",
  "DW1Qt78k2lj",
  "DXCBwguErFx",
  "DXEmoo8jxdg",
  "DW6TZa-FAXQ",
  "DW3u9q2Fmrc",
];

export function Reels() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="reels"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-3">
              · Showreel
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-foreground leading-none">
              LATEST <span className="text-gradient-amber">REELS WORKED</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Creative video solutions · High-quality reels & storytelling · Delivering results that matter.
          </p>
        </div>
      </div>

      <div className="reveal">
        <div className="flex gap-6 overflow-x-auto scroll-snap-x snap-x snap-mandatory px-6 sm:px-12 pb-8 hide-scrollbar">
          {reels.map((id, i) => (
            <div
              key={id}
              className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden cinematic-shadow relative group"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <iframe
                src={`https://www.instagram.com/reel/${id}/embed/`}
                title={`Instagram reel ${i + 1}`}
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0 bg-card"
                scrolling="no"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 group-hover:ring-primary/40 transition-colors pointer-events-none rounded-2xl" />
            </div>
          ))}
          {/* Spacer */}
          <div className="flex-shrink-0 w-6" />
        </div>
      </div>

      <div className="text-center mt-8 reveal">
        <a
          href="https://www.instagram.com/robin_gbin/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm uppercase tracking-widest font-medium text-primary-foreground bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-500 glow-amber shadow-lg hover:scale-105"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          Follow @robin_gbin on Instagram
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>

      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { scrollbar-width: none; }`}</style>
    </section>
  );
}
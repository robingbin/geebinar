import { useEffect, useRef } from "react";
import idly from "@/assets/film-idly-kadai.jpg";
import indian2 from "@/assets/film-indian2.jpg";
import raayan from "@/assets/film-raayan.jpg";
import vidamuyarchi from "@/assets/film-vidamuyarchi.jpg";
import nilavuku from "@/assets/film-nilavuku.jpg";
import thuglife from "@/assets/film-thuglife.jpg";

const films = [
  { title: "Indian 2", role: "VFX Compositor", year: "2024", image: indian2, accent: "from-orange-500/30 to-red-600/30" },
  { title: "Thug Life", role: "VFX Compositor", year: "2025", image: thuglife, accent: "from-amber-500/30 to-yellow-700/30" },
  { title: "Raayan", role: "VFX Compositor", year: "2024", image: raayan, accent: "from-emerald-500/30 to-teal-700/30" },
  { title: "Vidamuyarchi", role: "VFX Compositor", year: "2025", image: vidamuyarchi, accent: "from-orange-500/30 to-rose-600/30" },
  { title: "Idly Kadai", role: "VFX Compositor", year: "2025", image: idly, accent: "from-amber-600/30 to-red-700/30" },
  { title: "Nilavuku En Mel Ennadi Kobam", role: "VFX Compositor", year: "2024", image: nilavuku, accent: "from-blue-500/30 to-indigo-700/30" },
];

export function FeaturedFilms() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 reveal">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-3">
              · Featured Films
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-foreground leading-none">
              SELECTED <span className="text-gradient-amber">WORK</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A curated reel of feature films I've contributed VFX compositing to —
            from green-screen integration to atmospheric world-building.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {films.map((f, i) => (
            <article
              key={f.title}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cinematic-shadow reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img
                src={f.image}
                alt={f.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              {/* Color glow on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay`}
              />
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              {/* Border glow */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/5 group-hover:ring-primary/40 transition-colors duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="text-[10px] tracking-[0.35em] uppercase text-primary mb-2 opacity-80">
                  {f.year} · {f.role}
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-foreground leading-tight transition-transform duration-500 group-hover:-translate-y-1">
                  {f.title}
                </h3>
                <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/0 group-hover:text-foreground transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  View Project
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-glow-pulse" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
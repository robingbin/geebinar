import { useEffect, useRef, useState } from "react";

type Category = "All" | "Film" | "Ad" | "News";

const projects: { title: string; category: Category }[] = [
  { title: "Idly Kadai", category: "Film" },
  { title: "UI", category: "Film" },
  { title: "Local News", category: "News" },
  { title: "Padaiyanda Maaveeraa", category: "Film" },
  { title: "Genie", category: "Film" },
  { title: "Nilavuku En Mel Ennadi Kobam", category: "Film" },
  { title: "Arjun Son of Vyjayanthi", category: "Film" },
  { title: "Vidamuyarchi", category: "Film" },
  { title: "Max", category: "Film" },
  { title: "Thug Life", category: "Film" },
  { title: "Raayan", category: "Film" },
  { title: "Unnil Kadhala", category: "Ad" },
  { title: "Chutney Sambar", category: "Film" },
  { title: "PT Sir", category: "Film" },
  { title: "Indian 2", category: "Film" },
  { title: "Train", category: "Ad" },
];

const filters: Category[] = ["All", "Film", "Ad", "News"];

export function AllProjects() {
  const [active, setActive] = useState<Category>("All");
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

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
  }, [filtered.length]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6 border-t border-border/40"
      style={{
        background:
          "linear-gradient(180deg, var(--background) 0%, oklch(0.06 0.005 260) 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 reveal">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-3">
              · Filmography
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-foreground leading-none">
              ALL <span className="text-gradient-amber">PROJECTS</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${
                  active === f
                    ? "bg-primary text-primary-foreground glow-amber"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-border/30 rounded-2xl overflow-hidden cinematic-shadow">
          {filtered.map((p, i) => (
            <div
              key={p.title}
              className="group relative bg-card/80 hover:bg-card p-8 transition-all duration-500 cursor-pointer reveal"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  0{(i % 9) + 1}
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary/70">
                  {p.category}
                </span>
              </div>
              <h3 className="font-display text-2xl text-foreground leading-tight group-hover:text-primary transition-colors duration-500 min-h-[3.5rem]">
                {p.title}
              </h3>
              <div className="mt-4 text-xs text-muted-foreground">VFX Compositor</div>
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </div>
              {/* Hover glow line */}
              <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent w-0 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
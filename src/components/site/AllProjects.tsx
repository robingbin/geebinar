import { useEffect, useRef } from "react";
import idly from "@/assets/film-idly-kadai.jpg";
import indian2 from "@/assets/film-indian2.jpg";
import raayan from "@/assets/film-raayan.jpg";
import vidamuyarchi from "@/assets/film-vidamuyarchi.jpg";
import nilavuku from "@/assets/film-nilavuku.jpg";
import thuglife from "@/assets/film-thuglife.jpg";

// Arranged by release date (newest first). Films without dedicated artwork
// fall back to a tasteful gradient placeholder so no poster is repeated.
type Project = {
  title: string;
  category: "Film" | "Ad" | "News";
  year: string;
  date: string; // ISO for sorting
  poster?: string;
};

const projects: Project[] = [
  { title: "Indian 2", category: "Film", year: "2024", date: "2024-07-12", poster: indian2 },
  { title: "Raayan", category: "Film", year: "2024", date: "2024-07-26", poster: raayan },
  { title: "Nilavuku En Mel Ennadi Kobam", category: "Film", year: "2024", date: "2024-10-25", poster: nilavuku },
  { title: "Thug Life", category: "Film", year: "2025", date: "2025-06-05", poster: thuglife },
  { title: "Vidamuyarchi", category: "Film", year: "2025", date: "2025-02-06", poster: vidamuyarchi },
  { title: "Idly Kadai", category: "Film", year: "2025", date: "2025-10-01", poster: idly },
  { title: "Arjun Son of Vyjayanthi", category: "Film", year: "2025", date: "2025-12-01" },
  { title: "Padaiyanda Maaveeraa", category: "Film", year: "2025", date: "2025-11-01" },
  { title: "Genie", category: "Film", year: "2025", date: "2025-09-01" },
  { title: "Max", category: "Film", year: "2024", date: "2024-12-25" },
  { title: "Chutney Sambar", category: "Film", year: "2024", date: "2024-08-15" },
  { title: "PT Sir", category: "Film", year: "2024", date: "2024-05-10" },
  { title: "UI", category: "Film", year: "2024", date: "2024-12-20" },
  { title: "Unnil Kadhala", category: "Ad", year: "2023", date: "2023-09-01" },
  { title: "Train", category: "Ad", year: "2023", date: "2023-06-01" },
  { title: "Local News", category: "News", year: "2022", date: "2022-01-01" },
]
  .slice()
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const placeholderGradients = [
  "linear-gradient(135deg, oklch(0.25 0.08 30), oklch(0.12 0.02 260))",
  "linear-gradient(135deg, oklch(0.22 0.1 200), oklch(0.1 0.02 260))",
  "linear-gradient(135deg, oklch(0.28 0.12 65), oklch(0.1 0.02 260))",
  "linear-gradient(135deg, oklch(0.2 0.08 280), oklch(0.1 0.02 260))",
  "linear-gradient(135deg, oklch(0.24 0.1 140), oklch(0.1 0.02 260))",
  "linear-gradient(135deg, oklch(0.26 0.11 15), oklch(0.1 0.02 260))",
];

export function AllProjects() {
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
      id="projects"
      ref={sectionRef}
      className="relative py-32 border-t border-border/40 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--background) 0%, oklch(0.06 0.005 260) 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 reveal">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-3">
              · Filmography
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-foreground leading-none">
              ALL <span className="text-gradient-amber">PROJECTS</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Swipe through the complete filmography — every poster, every shot
            crafted with cinematic precision.
          </p>
        </div>
      </div>

      <div className="reveal">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 sm:px-12 pb-8 hide-scrollbar-projects">
          {projects.map((p, i) => {
            const fallback = placeholderGradients[i % placeholderGradients.length];
            return (
              <article
                key={p.title}
                className="snap-start flex-shrink-0 w-[240px] sm:w-[280px] aspect-[2/3] rounded-2xl overflow-hidden cinematic-shadow relative group cursor-pointer"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {p.poster ? (
                  <img
                    src={p.poster}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0 w-full h-full transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    style={{ background: fallback }}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, oklch(1 0 0 / 0.06) 0 2px, transparent 2px 14px)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-6xl text-foreground/15 tracking-widest">
                        {p.title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                      </span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 group-hover:ring-primary/40 transition-colors duration-500 rounded-2xl" />

                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="text-[10px] tracking-[0.35em] uppercase text-primary mb-2 opacity-80">
                    {p.category} · {p.year}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl text-foreground leading-tight transition-transform duration-500 group-hover:-translate-y-1">
                    {p.title}
                  </h3>
                  <div className="mt-2 text-[11px] text-muted-foreground">
                    VFX Compositor
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-glow-pulse" />
              </article>
            );
          })}
          <div className="flex-shrink-0 w-6" />
        </div>
      </div>

      <style>{`.hide-scrollbar-projects::-webkit-scrollbar { display: none; } .hide-scrollbar-projects { scrollbar-width: none; }`}</style>
    </section>
  );
}
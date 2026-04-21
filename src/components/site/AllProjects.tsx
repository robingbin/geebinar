import { useEffect, useRef } from "react";
import idly from "@/assets/film-idly-kadai.jpg";
import indian2 from "@/assets/film-indian2.jpg";
import raayan from "@/assets/film-raayan.jpg";
import vidamuyarchi from "@/assets/film-vidamuyarchi.jpg";
import nilavuku from "@/assets/film-nilavuku.jpg";
import thuglife from "@/assets/film-thuglife.jpg";

const posters = [indian2, thuglife, raayan, vidamuyarchi, idly, nilavuku];

const projects: { title: string; category: string }[] = [
  { title: "Indian 2", category: "Film" },
  { title: "Thug Life", category: "Film" },
  { title: "Raayan", category: "Film" },
  { title: "Vidamuyarchi", category: "Film" },
  { title: "Idly Kadai", category: "Film" },
  { title: "Nilavuku En Mel Ennadi Kobam", category: "Film" },
  { title: "Arjun Son of Vyjayanthi", category: "Film" },
  { title: "Padaiyanda Maaveeraa", category: "Film" },
  { title: "Genie", category: "Film" },
  { title: "Max", category: "Film" },
  { title: "Chutney Sambar", category: "Film" },
  { title: "PT Sir", category: "Film" },
  { title: "UI", category: "Film" },
  { title: "Unnil Kadhala", category: "Ad" },
  { title: "Train", category: "Ad" },
  { title: "Local News", category: "News" },
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
            const poster = posters[i % posters.length];
            return (
              <article
                key={p.title}
                className="snap-start flex-shrink-0 w-[240px] sm:w-[280px] aspect-[2/3] rounded-2xl overflow-hidden cinematic-shadow relative group cursor-pointer"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <img
                  src={poster}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 group-hover:ring-primary/40 transition-colors duration-500 rounded-2xl" />

                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="text-[10px] tracking-[0.35em] uppercase text-primary mb-2 opacity-80">
                    {p.category} · 0{(i % 9) + 1}
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
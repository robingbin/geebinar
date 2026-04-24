import { useEffect, useRef } from "react";
import idly from "@/assets/film-idly-kadai.jpg";
import indian2 from "@/assets/film-indian2.jpg";
import raayan from "@/assets/film-raayan.jpg";
import vidamuyarchi from "@/assets/film-vidamuyarchi.jpg";
import nilavuku from "@/assets/film-nilavuku.jpg";
import thuglife from "@/assets/film-thuglife.jpg";
import arjun from "@/assets/film-arjun.jpg";
import max from "@/assets/film-max.jpg";
import ptsir from "@/assets/film-ptsir.webp";
import ui from "@/assets/film-ui.jpg";
import chutney from "@/assets/film-chutney.jpg";
import padaiyanda from "@/assets/film-padaiyanda.jpg";
import localtimes from "@/assets/film-localtimes.png";
import kondal from "@/assets/film-kondal.jpg";
import gymkhana from "@/assets/film-gymkhana.jpg";
import jenma from "@/assets/film-jenma.jpg";
import gugan from "@/assets/film-gugan.jpg";

type Project = {
  title: string;
  category: "Film" | "Series" | "Short Film";
  year: string;
  date: string;
  poster: string;
};

const projects: Project[] = ([
  { title: "Local Times", category: "Series", year: "2026", date: "2026-01-15", poster: localtimes },
  { title: "Alappuzha Gymkhana", category: "Film", year: "2025", date: "2025-04-10", poster: gymkhana },
  { title: "Jenma Natchathiram", category: "Film", year: "2025", date: "2025-03-15", poster: jenma },
  { title: "Gugan", category: "Short Film", year: "2025", date: "2025-02-20", poster: gugan },
  { title: "Arjun Son of Vyjayanthi", category: "Film", year: "2025", date: "2025-04-17", poster: arjun },
  { title: "Padaiyanda Maaveeraa", category: "Film", year: "2025", date: "2025-11-01", poster: padaiyanda },
  { title: "Idly Kadai", category: "Film", year: "2025", date: "2025-10-01", poster: idly },
  { title: "Thug Life", category: "Film", year: "2025", date: "2025-06-05", poster: thuglife },
  { title: "Vidamuyarchi", category: "Film", year: "2025", date: "2025-02-06", poster: vidamuyarchi },
  { title: "Nilavuku En Mel Ennadi Kobam", category: "Film", year: "2025", date: "2025-01-10", poster: nilavuku },
  { title: "Max", category: "Film", year: "2024", date: "2024-12-25", poster: max },
  { title: "UI", category: "Film", year: "2024", date: "2024-12-20", poster: ui },
  { title: "Chutney Sambar", category: "Film", year: "2024", date: "2024-08-15", poster: chutney },
  { title: "Raayan", category: "Film", year: "2024", date: "2024-07-26", poster: raayan },
  { title: "Indian 2", category: "Film", year: "2024", date: "2024-07-12", poster: indian2 },
  { title: "PT Sir", category: "Film", year: "2024", date: "2024-05-10", poster: ptsir },
  { title: "Kondal", category: "Film", year: "2024", date: "2024-09-05", poster: kondal },
] as Project[]).sort((a, b) => (a.date < b.date ? 1 : -1));

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
      className="relative py-32 border-t border-border overflow-hidden"
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
          {projects.map((p, i) => (
            <article
              key={p.title}
              className="snap-start flex-shrink-0 w-[240px] sm:w-[280px] aspect-[2/3] rounded-2xl overflow-hidden cinematic-shadow relative group cursor-pointer"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <img
                src={p.poster}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
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
          ))}
          <div className="flex-shrink-0 w-6" />
        </div>
      </div>

      <style>{`.hide-scrollbar-projects::-webkit-scrollbar { display: none; } .hide-scrollbar-projects { scrollbar-width: none; }`}</style>
    </section>
  );
}

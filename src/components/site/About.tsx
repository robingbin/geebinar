import { useEffect, useRef } from "react";

const disciplines = [
  {
    title: "Compositing",
    sub: "Nuke · Fusion · After Effects",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12 2 22 8.5 12 15 2 8.5 12 2" />
        <polyline points="2 15.5 12 22 22 15.5" />
        <polyline points="2 12 12 18.5 22 12" />
      </svg>
    ),
  },
  {
    title: "Video Editing",
    sub: "Adobe Premier · DaVinci Resolve",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="7" y1="4" x2="7" y2="20" />
        <line x1="17" y1="4" x2="17" y2="20" />
        <line x1="2" y1="9" x2="7" y2="9" />
        <line x1="2" y1="15" x2="7" y2="15" />
        <line x1="17" y1="9" x2="22" y2="9" />
        <line x1="17" y1="15" x2="22" y2="15" />
      </svg>
    ),
  },
  {
    title: "2D/3D Tracking",
    sub: "3D Equalizer · Mocha",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    title: "CG Integration",
    sub: "Nuke · Unreal Engine",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Poster Design",
    sub: "Photoshop · Illustrator",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3l1.6 3.6L17 8l-2.6 2.4.8 3.6L12 12l-3.2 2 .8-3.6L7 8l3.4-1.4L12 3z" />
        <path d="M19 4l.6 1.4L21 6l-1.4.6L19 8l-.6-1.4L17 6l1.4-.6L19 4z" />
        <path d="M5 15l.6 1.4L7 17l-1.4.6L5 19l-.6-1.4L3 17l1.4-.6L5 15z" />
      </svg>
    ),
  },
  {
    title: "Color Correction",
    sub: "DaVinci Resolve",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <circle cx="8" cy="10" r="1.2" />
        <circle cx="12" cy="8" r="1.2" />
        <circle cx="16" cy="10" r="1.2" />
        <circle cx="15" cy="14" r="1.2" />
      </svg>
    ),
  },
];

const experience = [
  {
    period: "2025 — Present",
    role: "VFX Compositor",
    place: "Freelance — VFX Artist & Video Editor",
  },
  {
    period: "2023 — 2025",
    role: "Junior VFX Compositor",
    place: "AJAX VFX, Chennai",
  },
  {
    period: "2022 — 2023",
    role: "VFX Intern",
    place: "Maac Studio, Chennai",
  },
];

export function About() {
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
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 border-t border-border overflow-hidden"
    >
      {/* Decorative orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 animate-float"
        style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-1/4 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-25 animate-float-slow"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center reveal">
          <div className="text-[10px] tracking-[0.45em] uppercase text-accent mb-4">
            · Background ·
          </div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-[5.5rem] text-foreground leading-none">
            About <span className="text-gradient-amber">Geebin A R</span>
          </h2>
          <div className="mt-5 text-[11px] tracking-[0.4em] uppercase">
            <span className="text-accent">VFX Artist</span>
            <span className="text-muted-foreground mx-3">·</span>
            <span className="text-accent">Video Editor</span>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-12 max-w-3xl mx-auto text-center text-base sm:text-lg text-muted-foreground leading-relaxed reveal">
          VFX Compositor with years of experience delivering invisible visual
          effects for feature films, episodic television, and high-end advertising.
          Specializing in seamless CG integration, advanced compositing workflows,
          and photorealistic environmental extensions that elevate the narrative
          without drawing attention to the craft.
        </p>

        {/* Disciplines */}
        <div className="mt-24 reveal">
          <div className="text-center text-[10px] tracking-[0.45em] uppercase text-primary mb-10">
            Core Disciplines
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {disciplines.map((d, i) => (
              <div
                key={d.title}
                className="group relative rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-500 inline-flex">
                  {d.icon}
                </div>
                <div className="font-medium text-foreground text-base">{d.title}</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
                  {d.sub}
                </div>
                <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Experience timeline */}
        <div className="mt-24 reveal">
          <div className="text-center text-[10px] tracking-[0.45em] uppercase text-accent mb-10">
            Experience
          </div>
          <div className="max-w-2xl mx-auto space-y-1">
            {experience.map((e, i) => (
              <div
                key={e.period}
                className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_24px_1fr] gap-4 sm:gap-6 items-start py-5 border-b border-border last:border-b-0"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-primary/80 pt-1">
                  {e.period}
                </div>
                <div className="hidden sm:flex justify-center pt-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-glow-pulse" />
                </div>
                <div>
                  <div className="text-foreground font-medium">{e.role}</div>
                  <div className="text-sm text-muted-foreground mt-1">{e.place}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

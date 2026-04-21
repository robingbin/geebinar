import { useEffect, useRef } from "react";
import portrait from "@/assets/about-portrait.jpg";

export function About() {
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
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 border-t border-border/40"
    >
      <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 reveal">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden cinematic-shadow">
            <img
              src={portrait}
              alt="GEEBIN A R, VFX Compositor"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 glass px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.3em] text-foreground">
              In the Suite · 2025
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8 reveal">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-3">
              · About
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-foreground leading-none">
              CRAFTING<br />
              <span className="text-gradient-amber">CINEMATIC</span><br />
              REALITY
            </h2>
          </div>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            I am a VFX Compositor specializing in high-quality visual storytelling
            for films and digital media. My work blends technical precision with
            creative vision to bring cinematic scenes to life.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-border/40">
            {[
              { k: "Compositing", v: "Nuke · After Effects" },
              { k: "Specialties", v: "Keying · Roto · Comp" },
              { k: "Based In", v: "Chennai, India" },
            ].map((s) => (
              <div key={s.k}>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  {s.k}
                </div>
                <div className="text-sm text-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
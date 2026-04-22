import { useEffect, useRef, useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Message too short").max(1000),
});

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [error, setError] = useState("");

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setStatus("err");
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    const subject = encodeURIComponent(`New project inquiry from ${parsed.data.name}`);
    const body = encodeURIComponent(`${parsed.data.message}\n\n— ${parsed.data.name}\n${parsed.data.email}`);
    window.location.href = `mailto:geebinar@gmail.com?subject=${subject}&body=${body}`;
    setStatus("ok");
    setError("");
    e.currentTarget.reset();
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden border-t border-border/40"
    >
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.78 0.16 65 / 0.15), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8 reveal">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-3">
              · Contact
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-foreground leading-none">
              READY TO BRING<br />
              <span className="text-gradient-amber">YOUR VISION</span><br />
              TO LIFE?
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md">
              From concept to final composite — delivering invisible artistry that elevates every frame.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <a href="mailto:geebinar@gmail.com" className="group flex items-center gap-4 hover:text-primary transition-colors">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground w-20">Email</span>
              <span className="text-foreground group-hover:text-primary">geebinar@gmail.com</span>
            </a>
            <a href="tel:+919486916959" className="group flex items-center gap-4 hover:text-primary transition-colors">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground w-20">Phone</span>
              <span className="text-foreground group-hover:text-primary">+91 94869 16959</span>
            </a>
            <a
              href="https://www.instagram.com/robin_gbin/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 hover:text-primary transition-colors"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground w-20">Social</span>
              <span className="text-foreground group-hover:text-primary">@robin_gbin</span>
            </a>
          </div>

          <div className="flex items-center gap-3 pt-6">
            <SocialIcon
              href="https://www.instagram.com/robin_gbin/"
              label="Instagram"
              path="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.5-.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
            />
            <SocialIcon
              href="https://wa.me/919486916959"
              label="WhatsApp"
              path="M20.52 3.48A11.85 11.85 0 0 0 12.06 0C5.5 0 .17 5.32.17 11.88c0 2.1.55 4.14 1.6 5.95L0 24l6.34-1.66a11.86 11.86 0 0 0 5.72 1.46h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.16-3.43-8.44zM12.07 21.6h-.01a9.74 9.74 0 0 1-4.96-1.36l-.36-.21-3.76.99 1-3.66-.23-.38a9.71 9.71 0 0 1-1.5-5.2c0-5.38 4.38-9.76 9.76-9.76 2.6 0 5.05 1.02 6.89 2.86a9.69 9.69 0 0 1 2.86 6.9c0 5.39-4.38 9.82-9.69 9.82zm5.36-7.32c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.93 1.16-.17.2-.34.22-.64.07-.29-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.18-.24-.58-.49-.5-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43 0 1.43 1.05 2.81 1.2 3.01.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.74-.71 1.99-1.4.24-.69.24-1.27.17-1.4-.07-.13-.27-.2-.56-.34z"
            />
            <SocialIcon
              href="mailto:geebinar@gmail.com"
              label="Email"
              path="M2 4h20v16H2V4zm10 9L2.5 5h19L12 13zm0 2L2 7v13h20V7l-10 8z"
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 glass rounded-2xl p-8 sm:p-10 space-y-6 reveal"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <Field name="name" label="Name" placeholder="Your name" />
            <Field name="email" label="Email" placeholder="you@studio.com" type="email" />
          </div>
          <Field name="message" label="Message" placeholder="Tell me about your project..." textarea />

          {status === "err" && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          {status === "ok" && (
            <p className="text-sm text-primary">Opening your email client…</p>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 rounded-full font-medium text-sm uppercase tracking-widest hover:scale-105 transition-transform glow-amber"
            >
              Send Message
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href="https://wa.me/919486916959?text=Hi%20Geebin%2C%20I%27d%20like%20to%20discuss%20a%20VFX%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-foreground hover:text-primary transition-colors"
            >
              Or chat on WhatsApp →
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  textarea = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2 block">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required
          rows={5}
          maxLength={1000}
          placeholder={placeholder}
          className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-foreground placeholder:text-muted-foreground/50 transition-colors resize-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          required
          maxLength={255}
          placeholder={placeholder}
          className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-foreground placeholder:text-muted-foreground/50 transition-colors"
        />
      )}
    </label>
  );
}

function SocialIcon({ href, label, path }: { href: string; label: string; path: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-11 h-11 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:border-primary/40 transition-all hover:scale-110"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  );
}
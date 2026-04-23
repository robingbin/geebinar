import { useEffect, useRef } from "react";

/**
 * InteractiveMesh
 * Canvas-based 3D wireframe sphere with:
 *  - Mouse parallax / tilt (follows cursor in 3D space)
 *  - Smooth easing + idle floating motion
 *  - Glassmorphism / neon glow + gradient lighting
 *  - Subtle wave distortion on hover
 */
export function InteractiveMesh() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Build a UV sphere of points
    const LAT = 22;
    const LON = 36;
    const R = () => Math.min(W, H) * 0.32;
    type P = { x: number; y: number; z: number };
    const points: P[] = [];
    for (let i = 0; i <= LAT; i++) {
      const theta = (i / LAT) * Math.PI;
      for (let j = 0; j < LON; j++) {
        const phi = (j / LON) * Math.PI * 2;
        points.push({
          x: Math.sin(theta) * Math.cos(phi),
          y: Math.cos(theta),
          z: Math.sin(theta) * Math.sin(phi),
        });
      }
    }

    // State
    const target = { rx: 0, ry: 0 };
    const cur = { rx: 0, ry: 0 };
    let hover = 0; // 0..1
    let hoverTarget = 0;
    let mx = 0;
    let my = 0;

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      target.ry = px * 1.2;
      target.rx = -py * 1.0;
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onEnter = () => (hoverTarget = 1);
    const onLeave = () => {
      hoverTarget = 0;
      target.rx = 0;
      target.ry = 0;
    };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const start = performance.now();

    const css = (name: string, fb: string) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || fb;
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      // Ease towards target
      cur.rx += (target.rx + Math.sin(t * 0.6) * 0.08 - cur.rx) * 0.06;
      cur.ry += (target.ry + Math.cos(t * 0.5) * 0.1 - cur.ry) * 0.06;
      hover += (hoverTarget - hover) * 0.08;

      ctx.clearRect(0, 0, W, H);

      // Background radial glow
      const cx = W / 2;
      const cy = H / 2;
      const primary = css("--primary", "oklch(0.75 0.15 60)");
      const accent = css("--accent", "oklch(0.7 0.14 200)");

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.7);
      bg.addColorStop(0, `color-mix(in oklab, ${primary} 18%, transparent)`);
      bg.addColorStop(0.5, `color-mix(in oklab, ${accent} 10%, transparent)`);
      bg.addColorStop(1, "transparent");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const r = R();
      const cosX = Math.cos(cur.rx);
      const sinX = Math.sin(cur.rx);
      const cosY = Math.cos(cur.ry);
      const sinY = Math.sin(cur.ry);
      const focal = r * 2.4;

      // Project points
      type Proj = { x: number; y: number; z: number; s: number };
      const proj: Proj[] = new Array(points.length);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        // wave distortion (stronger on hover)
        const wave =
          1 +
          (0.04 + hover * 0.12) *
            Math.sin(t * 1.6 + p.x * 3 + p.y * 4 + p.z * 2);
        let x = p.x * r * wave;
        let y = p.y * r * wave;
        let z = p.z * r * wave;
        // rotate Y
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        // rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const s = focal / (focal + z2);
        proj[i] = { x: cx + x1 * s, y: cy + y2 * s, z: z2, s };
      }

      // Draw connecting lines (latitude + longitude)
      ctx.lineWidth = 1;
      for (let i = 0; i <= LAT; i++) {
        for (let j = 0; j < LON; j++) {
          const a = proj[i * LON + j];
          // longitude (next column same row)
          const b = proj[i * LON + ((j + 1) % LON)];
          // latitude (next row same column)
          const c = i < LAT ? proj[(i + 1) * LON + j] : null;
          const depth = (a.z + r) / (2 * r); // 0 back .. 1 front
          const alpha = 0.15 + depth * 0.55;
          ctx.strokeStyle = `color-mix(in oklab, ${primary} ${Math.round(
            alpha * 100,
          )}%, transparent)`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          if (c) {
            ctx.strokeStyle = `color-mix(in oklab, ${accent} ${Math.round(
              alpha * 80,
            )}%, transparent)`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(c.x, c.y);
            ctx.stroke();
          }
        }
      }

      // Draw glowing vertex points
      for (let i = 0; i < proj.length; i++) {
        const p = proj[i];
        const depth = (p.z + r) / (2 * r);
        const size = 0.6 + depth * 2.2;
        ctx.fillStyle = `color-mix(in oklab, ${primary} ${Math.round(
          (0.4 + depth * 0.6) * 100,
        )}%, transparent)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Specular highlight that follows cursor
      if (hover > 0.01) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, r * 0.8);
        g.addColorStop(0, `color-mix(in oklab, ${accent} ${Math.round(hover * 30)}%, transparent)`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-[420px] sm:h-[520px] md:h-[600px] rounded-3xl overflow-hidden border border-border/40 backdrop-blur-xl"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, oklch(from var(--primary) l c h / 0.15), transparent 60%), radial-gradient(ellipse at 70% 80%, oklch(from var(--accent) l c h / 0.18), transparent 60%), linear-gradient(135deg, oklch(from var(--background) l c h / 0.6), oklch(from var(--background) l c h / 0.2))",
        boxShadow:
          "inset 0 1px 0 oklch(from var(--foreground) l c h / 0.08), 0 30px 80px -30px oklch(from var(--primary) l c h / 0.35)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block" />
      {/* Corner labels for "spline-like" UI feel */}
      <div className="pointer-events-none absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80">
        ◐ Live · 3D Composite
      </div>
      <div className="pointer-events-none absolute top-4 right-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80">
        Move cursor →
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80">
        GEEBIN · CINEMATIC ENGINE
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80">
        v0.1 / RT-Mesh
      </div>
    </div>
  );
}

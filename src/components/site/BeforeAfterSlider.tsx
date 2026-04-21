import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  // Auto subtle animation on load
  useEffect(() => {
    let frame = 0;
    let mounted = true;
    const start = performance.now();
    const target1 = 75;
    const target2 = 30;
    const target3 = 50;
    const duration = 2800;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const animate = (now: number) => {
      if (!mounted) return;
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      let value: number;
      if (t < 0.4) value = 50 + (target1 - 50) * ease(t / 0.4);
      else if (t < 0.7) value = target1 + (target2 - target1) * ease((t - 0.4) / 0.3);
      else value = target2 + (target3 - target2) * ease((t - 0.7) / 0.3);
      setPos(value);
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
    };
  }, []);

  const updateFromClient = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent | TouchEvent) => {
      const clientX =
        e instanceof TouchEvent ? e.touches[0]?.clientX ?? 0 : (e as MouseEvent).clientX;
      updateFromClient(clientX);
    };
    const stop = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [dragging, updateFromClient]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-2xl cinematic-shadow select-none touch-none"
      onMouseDown={(e) => {
        setDragging(true);
        updateFromClient(e.clientX);
      }}
      onTouchStart={(e) => {
        setDragging(true);
        updateFromClient(e.touches[0].clientX);
      }}
    >
      {/* After image (full) */}
      <img
        src={afterSrc}
        alt="After VFX"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={beforeSrc}
          alt="Before VFX"
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <div className="absolute top-6 left-6 glass px-4 py-1.5 rounded-full text-[10px] tracking-[0.3em] uppercase text-foreground font-medium">
        {beforeLabel}
      </div>
      <div className="absolute top-6 right-6 glass px-4 py-1.5 rounded-full text-[10px] tracking-[0.3em] uppercase text-primary font-medium">
        {afterLabel}
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-primary pointer-events-none"
        style={{ left: `${pos}%`, boxShadow: "0 0 30px var(--primary)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-grab active:cursor-grabbing animate-glow-pulse">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
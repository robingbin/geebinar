import { useEffect, useRef, useState } from "react";

/**
 * CameraScene
 * Split layout that mimics a 3D software workspace:
 *  - LEFT: a perspective "scene view" with objects placed in 3D space and a
 *    camera gizmo. The camera orbits around the origin based on mouse drag /
 *    movement (like a 3D viewport).
 *  - RIGHT: a "camera view" — what the camera actually sees from its current
 *    position, re-rendered every frame.
 */

type V3 = { x: number; y: number; z: number };

type SceneObject = {
  type: "cube" | "sphere" | "pyramid";
  pos: V3;
  size: number;
  color: string; // css var ref string
};

const OBJECTS: SceneObject[] = [
  { type: "cube",    pos: { x: -1.6, y: -0.3, z:  0.4 }, size: 1.2, color: "var(--primary)" },
  { type: "sphere",  pos: { x:  1.6, y: -0.4, z: -0.2 }, size: 0.9, color: "var(--accent)" },
  { type: "pyramid", pos: { x:  0.0, y:  0.4, z:  1.6 }, size: 1.1, color: "var(--primary)" },
  { type: "cube",    pos: { x:  2.0, y:  0.9, z:  1.8 }, size: 0.6, color: "var(--accent)" },
  { type: "sphere",  pos: { x: -1.4, y: -0.7, z: -1.6 }, size: 0.65, color: "var(--primary)" },
];

// rotate a vector around Y then X (yaw, pitch)
function rotateYX(p: V3, yaw: number, pitch: number): V3 {
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  const x1 = p.x * cy + p.z * sy;
  const z1 = -p.x * sy + p.z * cy;
  const cx = Math.cos(pitch), sx = Math.sin(pitch);
  const y2 = p.y * cx - z1 * sx;
  const z2 = p.y * sx + z1 * cx;
  return { x: x1, y: y2, z: z2 };
}

function sub(a: V3, b: V3): V3 { return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }; }
function len(a: V3): number { return Math.hypot(a.x, a.y, a.z); }

export function CameraScene() {
  const sceneRef = useRef<HTMLCanvasElement>(null);
  const camRef = useRef<HTMLCanvasElement>(null);
  const sceneWrap = useRef<HTMLDivElement>(null);

  // Camera state — orbiting around origin
  const cam = useRef({
    yaw: 0.7,    // around Y
    pitch: -0.25,// around X
    dist: 4.2,
  });
  const target = useRef({ yaw: 0.7, pitch: -0.25, dist: 4.2 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [hint, setHint] = useState("Drag to orbit");

  useEffect(() => {
    const sceneCanvas = sceneRef.current;
    const camCanvas = camRef.current;
    const wrap = sceneWrap.current;
    if (!sceneCanvas || !camCanvas || !wrap) return;
    const sCtx = sceneCanvas.getContext("2d");
    const cCtx = camCanvas.getContext("2d");
    if (!sCtx || !cCtx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const sizeCanvas = (cv: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      const rect = cv.getBoundingClientRect();
      cv.width = rect.width * dpr;
      cv.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w: rect.width, h: rect.height };
    };

    let sceneSize = sizeCanvas(sceneCanvas, sCtx);
    let camSize = sizeCanvas(camCanvas, cCtx);

    const onResize = () => {
      sceneSize = sizeCanvas(sceneCanvas, sCtx);
      camSize = sizeCanvas(camCanvas, cCtx);
    };
    window.addEventListener("resize", onResize);

    // ---- Mouse interaction on scene viewport ----
    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      last.current = { x: e.clientX, y: e.clientY };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      setHint("Orbiting…");
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      last.current = { x: e.clientX, y: e.clientY };
      target.current.yaw += dx * 0.008;
      target.current.pitch = Math.max(-1.2, Math.min(1.2, target.current.pitch + dy * 0.006));
    };
    const onUp = () => {
      dragging.current = false;
      setHint("Drag to orbit");
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target.current.dist = Math.max(2.2, Math.min(8, target.current.dist + e.deltaY * 0.003));
    };
    // Subtle hover-follow when not dragging
    const onHover = (e: PointerEvent) => {
      if (dragging.current) return;
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      target.current.yaw = 0.7 + px * 0.6;
      target.current.pitch = -0.25 + -py * 0.4;
    };

    wrap.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    wrap.addEventListener("wheel", onWheel, { passive: false });
    wrap.addEventListener("pointermove", onHover);

    const css = (name: string, fb: string) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || fb;
    };

    // ---- Geometry helpers ----
    const cubeVerts = (s: number): V3[] => {
      const h = s / 2;
      return [
        { x: -h, y: -h, z: -h }, { x:  h, y: -h, z: -h },
        { x:  h, y:  h, z: -h }, { x: -h, y:  h, z: -h },
        { x: -h, y: -h, z:  h }, { x:  h, y: -h, z:  h },
        { x:  h, y:  h, z:  h }, { x: -h, y:  h, z:  h },
      ];
    };
    const cubeEdges = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7],
    ];
    const pyramidVerts = (s: number): V3[] => {
      const h = s / 2;
      return [
        { x: -h, y: -h, z: -h }, { x: h, y: -h, z: -h },
        { x:  h, y: -h, z:  h }, { x: -h, y: -h, z:  h },
        { x:  0, y:  h, z:  0 },
      ];
    };
    const pyramidEdges = [
      [0,1],[1,2],[2,3],[3,0],
      [0,4],[1,4],[2,4],[3,4],
    ];

    // Project a world point into a viewport
    function project(
      p: V3,
      camPos: V3,
      camYaw: number,
      camPitch: number,
      w: number,
      h: number,
      fov: number,
    ) {
      // translate
      const t = sub(p, camPos);
      // rotate inverse of camera (so world is viewed from camera local frame)
      const yawed = rotateYX(t, -camYaw, 0);
      const pitched = rotateYX(yawed, 0, -camPitch);
      const z = pitched.z;
      if (z >= -0.05) return null; // behind camera
      const focal = (Math.min(w, h) / 2) / Math.tan(fov / 2);
      const s = -focal / z;
      return {
        x: w / 2 + pitched.x * s,
        y: h / 2 - pitched.y * s,
        z: -z,
        s,
      };
    }

    // Draw helpers
    function drawGrid(
      ctx: CanvasRenderingContext2D,
      w: number, h: number,
      camPos: V3, camYaw: number, camPitch: number,
      fov: number,
      color: string,
    ) {
      ctx.strokeStyle = `color-mix(in oklab, ${color} 22%, transparent)`;
      ctx.lineWidth = 1;
      const N = 8;
      for (let i = -N; i <= N; i++) {
        const a = project({ x: i * 0.6, y: -1.2, z: -N * 0.6 }, camPos, camYaw, camPitch, w, h, fov);
        const b = project({ x: i * 0.6, y: -1.2, z:  N * 0.6 }, camPos, camYaw, camPitch, w, h, fov);
        if (a && b) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        const c = project({ x: -N * 0.6, y: -1.2, z: i * 0.6 }, camPos, camYaw, camPitch, w, h, fov);
        const d = project({ x:  N * 0.6, y: -1.2, z: i * 0.6 }, camPos, camYaw, camPitch, w, h, fov);
        if (c && d) { ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(d.x, d.y); ctx.stroke(); }
      }
    }

    function drawAxes(
      ctx: CanvasRenderingContext2D,
      w: number, h: number,
      camPos: V3, camYaw: number, camPitch: number,
      fov: number,
    ) {
      const o = project({ x: 0, y: -1.2, z: 0 }, camPos, camYaw, camPitch, w, h, fov);
      const x = project({ x: 1.5, y: -1.2, z: 0 }, camPos, camYaw, camPitch, w, h, fov);
      const y = project({ x: 0, y:  0.3, z: 0 }, camPos, camYaw, camPitch, w, h, fov);
      const z = project({ x: 0, y: -1.2, z: 1.5 }, camPos, camYaw, camPitch, w, h, fov);
      const lines: [typeof o, typeof o, string][] = [
        [o, x, "oklch(0.72 0.22 30)"],
        [o, y, "oklch(0.82 0.22 140)"],
        [o, z, "oklch(0.72 0.22 250)"],
      ];
      lines.forEach(([a, b, col]) => {
        if (!a || !b) return;
        ctx.strokeStyle = col;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      });
    }

    function drawObject(
      ctx: CanvasRenderingContext2D,
      obj: SceneObject,
      w: number, h: number,
      camPos: V3, camYaw: number, camPitch: number,
      fov: number,
      colorOverride?: string,
    ) {
      const col = colorOverride ?? css(obj.color.replace("var(", "").replace(")", ""), "#fff");
      if (obj.type === "sphere") {
        // Build wireframe sphere
        const LAT = 8, LON = 12;
        const verts: V3[] = [];
        for (let i = 0; i <= LAT; i++) {
          const th = (i / LAT) * Math.PI;
          for (let j = 0; j < LON; j++) {
            const ph = (j / LON) * Math.PI * 2;
            verts.push({
              x: obj.pos.x + Math.sin(th) * Math.cos(ph) * obj.size,
              y: obj.pos.y + Math.cos(th) * obj.size,
              z: obj.pos.z + Math.sin(th) * Math.sin(ph) * obj.size,
            });
          }
        }
        ctx.strokeStyle = `color-mix(in oklab, ${col} 70%, transparent)`;
        ctx.lineWidth = 1;
        for (let i = 0; i <= LAT; i++) {
          for (let j = 0; j < LON; j++) {
            const a = project(verts[i * LON + j], camPos, camYaw, camPitch, w, h, fov);
            const b = project(verts[i * LON + ((j + 1) % LON)], camPos, camYaw, camPitch, w, h, fov);
            const c = i < LAT ? project(verts[(i + 1) * LON + j], camPos, camYaw, camPitch, w, h, fov) : null;
            if (a && b) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
            if (a && c) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(c.x, c.y); ctx.stroke(); }
          }
        }
        return;
      }
      const local = obj.type === "cube" ? cubeVerts(obj.size) : pyramidVerts(obj.size);
      const edges = obj.type === "cube" ? cubeEdges : pyramidEdges;
      const world = local.map(v => ({ x: v.x + obj.pos.x, y: v.y + obj.pos.y, z: v.z + obj.pos.z }));
      const projected = world.map(v => project(v, camPos, camYaw, camPitch, w, h, fov));
      ctx.strokeStyle = `color-mix(in oklab, ${col} 80%, transparent)`;
      ctx.lineWidth = 1.4;
      edges.forEach(([a, b]) => {
        const A = projected[a], B = projected[b];
        if (A && B) { ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke(); }
      });
    }

    // Draw a camera gizmo at world position camPos pointing toward origin
    function drawCameraGizmo(
      ctx: CanvasRenderingContext2D,
      w: number, h: number,
      sceneCamPos: V3, sceneYaw: number, scenePitch: number,
      fov: number,
      gizmoCamPos: V3, gizmoYaw: number, gizmoPitch: number,
      color: string,
    ) {
      // Body cube + lens cone in gizmoCam local space → transform to world
      const size = 0.18;
      const lensLen = 0.32;
      // Local vertices (camera looking down -Z in its own frame)
      const local: V3[] = [
        { x: -size, y: -size, z:  size }, // back face
        { x:  size, y: -size, z:  size },
        { x:  size, y:  size, z:  size },
        { x: -size, y:  size, z:  size },
        { x: -size * 0.6, y: -size * 0.6, z: -lensLen }, // front (lens)
        { x:  size * 0.6, y: -size * 0.6, z: -lensLen },
        { x:  size * 0.6, y:  size * 0.6, z: -lensLen },
        { x: -size * 0.6, y:  size * 0.6, z: -lensLen },
      ];
      // Transform each local point: rotateX(pitch), rotateY(yaw), translate by gizmoCamPos
      const world = local.map(p => {
        const r1 = rotateYX(p, 0, gizmoPitch);
        const r2 = rotateYX(r1, gizmoYaw, 0);
        return { x: r2.x + gizmoCamPos.x, y: r2.y + gizmoCamPos.y, z: r2.z + gizmoCamPos.z };
      });
      const proj = world.map(v => project(v, sceneCamPos, sceneYaw, scenePitch, w, h, fov));
      const edges = [
        [0,1],[1,2],[2,3],[3,0], // back
        [4,5],[5,6],[6,7],[7,4], // front
        [0,4],[1,5],[2,6],[3,7],
      ];
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      edges.forEach(([a, b]) => {
        const A = proj[a], B = proj[b];
        if (A && B) { ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke(); }
      });
      // View frustum lines from front face toward origin direction
      const dir = sub({ x: 0, y: 0, z: 0 }, gizmoCamPos);
      const dl = len(dir) || 1;
      const fwd: V3 = { x: dir.x / dl, y: dir.y / dl, z: dir.z / dl };
      const tip: V3 = {
        x: gizmoCamPos.x + fwd.x * 1.2,
        y: gizmoCamPos.y + fwd.y * 1.2,
        z: gizmoCamPos.z + fwd.z * 1.2,
      };
      const tipP = project(tip, sceneCamPos, sceneYaw, scenePitch, w, h, fov);
      ctx.strokeStyle = `color-mix(in oklab, ${color} 55%, transparent)`;
      ctx.setLineDash([4, 4]);
      [4,5,6,7].forEach(i => {
        const A = proj[i];
        if (A && tipP) { ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(tipP.x, tipP.y); ctx.stroke(); }
      });
      ctx.setLineDash([]);
    }

    let raf = 0;
    const loop = () => {
      // Ease towards target
      cam.current.yaw   += (target.current.yaw   - cam.current.yaw)   * 0.08;
      cam.current.pitch += (target.current.pitch - cam.current.pitch) * 0.08;
      cam.current.dist  += (target.current.dist  - cam.current.dist)  * 0.08;

      // Movable camera position derived from yaw/pitch/dist (orbit around origin)
      const camPos: V3 = {
        x: Math.sin(cam.current.yaw) * Math.cos(cam.current.pitch) * cam.current.dist,
        y: -Math.sin(cam.current.pitch) * cam.current.dist,
        z: Math.cos(cam.current.yaw) * Math.cos(cam.current.pitch) * cam.current.dist,
      };

      const primary = css("--primary", "#e0a060");
      const accent = css("--accent", "#60c0e0");
      const fg = css("--foreground", "#fff");

      // ===== SCENE VIEW =====
      // Fixed overview camera looking at origin from a stationary angle
      const sCamPos: V3 = { x: 4.2, y: 2.8, z: 5.0 };
      // Compute yaw/pitch toward origin
      const dir = sub({ x: 0, y: 0, z: 0 }, sCamPos);
      const sYaw = Math.atan2(dir.x, dir.z);
      const sPitch = Math.atan2(-dir.y, Math.hypot(dir.x, dir.z));
      const sFov = (50 * Math.PI) / 180;

      sCtx.clearRect(0, 0, sceneSize.w, sceneSize.h);
      // background gradient
      const sg = sCtx.createLinearGradient(0, 0, 0, sceneSize.h);
      sg.addColorStop(0, `color-mix(in oklab, ${primary} 8%, transparent)`);
      sg.addColorStop(1, `color-mix(in oklab, ${accent} 5%, transparent)`);
      sCtx.fillStyle = sg;
      sCtx.fillRect(0, 0, sceneSize.w, sceneSize.h);

      drawGrid(sCtx, sceneSize.w, sceneSize.h, sCamPos, sYaw, sPitch, sFov, fg);
      drawAxes(sCtx, sceneSize.w, sceneSize.h, sCamPos, sYaw, sPitch, sFov);
      OBJECTS.forEach(o => drawObject(sCtx, o, sceneSize.w, sceneSize.h, sCamPos, sYaw, sPitch, sFov));
      drawCameraGizmo(
        sCtx, sceneSize.w, sceneSize.h,
        sCamPos, sYaw, sPitch, sFov,
        camPos, cam.current.yaw + Math.PI, cam.current.pitch,
        primary,
      );

      // ===== CAMERA VIEW =====
      cCtx.clearRect(0, 0, camSize.w, camSize.h);
      const cg = cCtx.createRadialGradient(camSize.w / 2, camSize.h / 2, 0, camSize.w / 2, camSize.h / 2, Math.max(camSize.w, camSize.h) * 0.7);
      cg.addColorStop(0, `color-mix(in oklab, ${accent} 12%, transparent)`);
      cg.addColorStop(1, "transparent");
      cCtx.fillStyle = cg;
      cCtx.fillRect(0, 0, camSize.w, camSize.h);

      // The movable camera looks toward origin
      const cFov = (55 * Math.PI) / 180;
      drawGrid(cCtx, camSize.w, camSize.h, camPos, cam.current.yaw + Math.PI, cam.current.pitch, cFov, fg);
      drawAxes(cCtx, camSize.w, camSize.h, camPos, cam.current.yaw + Math.PI, cam.current.pitch, cFov);
      OBJECTS.forEach(o => drawObject(cCtx, o, camSize.w, camSize.h, camPos, cam.current.yaw + Math.PI, cam.current.pitch, cFov));

      // Crosshair + safe area on camera view
      cCtx.strokeStyle = `color-mix(in oklab, ${fg} 25%, transparent)`;
      cCtx.lineWidth = 1;
      cCtx.setLineDash([4, 6]);
      cCtx.strokeRect(camSize.w * 0.08, camSize.h * 0.08, camSize.w * 0.84, camSize.h * 0.84);
      cCtx.setLineDash([]);
      cCtx.beginPath();
      cCtx.moveTo(camSize.w / 2 - 8, camSize.h / 2);
      cCtx.lineTo(camSize.w / 2 + 8, camSize.h / 2);
      cCtx.moveTo(camSize.w / 2, camSize.h / 2 - 8);
      cCtx.lineTo(camSize.w / 2, camSize.h / 2 + 8);
      cCtx.stroke();

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      wrap.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("wheel", onWheel);
      wrap.removeEventListener("pointermove", onHover);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">
      {/* SCENE VIEWPORT */}
      <div
        ref={sceneWrap}
        className="relative h-[360px] sm:h-[460px] md:h-[540px] rounded-3xl overflow-hidden border border-border/50 cursor-grab active:cursor-grabbing select-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, oklch(from var(--primary) l c h / 0.10), transparent 60%), linear-gradient(135deg, oklch(from var(--background) l c h / 0.7), oklch(from var(--background) l c h / 0.3))",
          boxShadow:
            "inset 0 1px 0 oklch(from var(--foreground) l c h / 0.08), 0 30px 80px -30px oklch(from var(--primary) l c h / 0.3)",
        }}
      >
        <canvas ref={sceneRef} className="absolute inset-0 block w-full h-full" />
        <div className="pointer-events-none absolute top-3 left-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/90">
          ◎ Scene View · Perspective
        </div>
        <div className="pointer-events-none absolute top-3 right-3 text-[10px] uppercase tracking-[0.3em] text-primary/90">
          {hint}
        </div>
        <div className="pointer-events-none absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80">
          X · Y · Z
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80">
          Scroll = Zoom
        </div>
      </div>

      {/* CAMERA VIEW */}
      <div
        className="relative h-[360px] sm:h-[460px] md:h-[540px] rounded-3xl overflow-hidden border border-border/50"
        style={{
          background:
            "radial-gradient(ellipse at 70% 80%, oklch(from var(--accent) l c h / 0.12), transparent 60%), linear-gradient(135deg, oklch(from var(--background) l c h / 0.7), oklch(from var(--background) l c h / 0.3))",
          boxShadow:
            "inset 0 1px 0 oklch(from var(--foreground) l c h / 0.08), 0 30px 80px -30px oklch(from var(--accent) l c h / 0.35)",
        }}
      >
        <canvas ref={camRef} className="absolute inset-0 block w-full h-full" />
        <div className="pointer-events-none absolute top-3 left-3 text-[10px] uppercase tracking-[0.3em] text-accent/90">
          ● REC · Camera View
        </div>
        <div className="pointer-events-none absolute top-3 right-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80">
          55mm · f/2.8
        </div>
        <div className="pointer-events-none absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80">
          GEEBIN · CAM_01
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80">
          LIVE
        </div>
      </div>
    </div>
  );
}

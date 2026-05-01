"use client";

import { useEffect, useRef } from "react";

const IMAGES = [
  "/img/imageCollage/1.png",
  "/img/imageCollage/2.png",
  "/img/imageCollage/3.png",
  "/img/imageCollage/4.png",
  "/img/imageCollage/5.png",
  "/img/imageCollage/6.png",
  "/img/imageCollage/7.png",
  "/img/imageCollage/8.png",
  "/img/imageCollage/9.png",
  "/img/imageCollage/10.png",
  "/img/imageCollage/11.png",
  "/img/imageCollage/12.png",
  "/img/imageCollage/13.png",
  "/img/imageCollage/14.png",
  "/img/imageCollage/15.png",
  "/img/imageCollage/16.png",
  "/img/imageCollage/17.png",
  "/img/imageCollage/18.png",
  "/img/imageCollage/19.png",
];

// 30% zoom — square tiles, feels like a zooomed-out gallery overview
const TILE = 240;   // px — square (~30 visible on screen)
const GAP  = 12;    // px
const TILE_W = TILE + GAP;
const TILE_H = TILE + GAP;
const COLS = 8;
const ROWS = 6;
const PAGE_W = TILE_W * COLS;
const PAGE_H = TILE_H * ROWS;
const RADIUS = 8;   // border-radius in px

// Draw a rounded rectangle path
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Draw one image cropped to a square (object-fit: cover)
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number, dy: number,
  dw: number, dh: number,
) {
  const { naturalWidth: iw, naturalHeight: ih } = img;
  if (!iw || !ih) return;
  const scale = Math.max(dw / iw, dh / ih);
  const sw = iw * scale;
  const sh = ih * scale;
  const sx = dx + (dw - sw) / 2;
  const sy = dy + (dh - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh);
}

export function GraphicDesignSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas  = canvasRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Load images ──────────────────────────────────────────────
    const imgs: HTMLImageElement[] = IMAGES.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    // ── Canvas resize ─────────────────────────────────────────────
    let W = 0, H = 0;
    const resize = () => {
      W = wrapper.offsetWidth;
      H = wrapper.offsetHeight;
      // Respect device pixel ratio for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // ── State ─────────────────────────────────────────────────────
    let ox = 0, oy = 0;   // world offset
    let vx = 0, vy = 0;   // velocity
    let dragging = false;
    let lastX = 0, lastY = 0;
    let rafId: number;

    // ── Draw ──────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Normalise offset so it stays within one page period
      const nx = ((ox % PAGE_W) + PAGE_W) % PAGE_W;
      const ny = ((oy % PAGE_H) + PAGE_H) % PAGE_H;

      // Calculate which tile columns / rows are visible
      const colStart = Math.floor(-nx / TILE_W);
      const colEnd   = Math.ceil((W - nx) / TILE_W);
      const rowStart = Math.floor(-ny / TILE_H);
      const rowEnd   = Math.ceil((H - ny) / TILE_H);

      for (let row = rowStart; row <= rowEnd; row++) {
        for (let col = colStart; col <= colEnd; col++) {
          // Map to image index (wrapping both col and row)
          const imgRow = ((row % ROWS) + ROWS) % ROWS;
          const imgCol = ((col % COLS) + COLS) % COLS;
          const imgIdx = (imgRow * COLS + imgCol) % imgs.length;
          const img = imgs[imgIdx];

          const x = nx + col * TILE_W;
          const y = ny + row * TILE_H;

          // Background fill (dark placeholder while loading)
          ctx.save();
          roundRect(ctx, x, y, TILE, TILE, RADIUS);
          ctx.fillStyle = "#1c1c1c";
          ctx.fill();

          if (img.complete && img.naturalWidth > 0) {
            ctx.save();
            roundRect(ctx, x, y, TILE, TILE, RADIUS);
            ctx.clip();
            drawCover(ctx, img, x, y, TILE, TILE);
            ctx.restore();
          }
          ctx.restore();
        }
      }
    };

    // ── Animation loop ────────────────────────────────────────────
    let isTouch = false; // track if last interaction was touch
    const tick = () => {
      if (!dragging) {
        // Touch flicks need longer glide; mouse/trackpad can be snappier
        const decay = isTouch ? 0.95 : 0.91;
        vx *= decay;
        vy *= decay;
        ox += vx;
        oy += vy;
      }
      draw();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Re-draw when each image loads
    imgs.forEach((img) => { img.onload = draw; });

    // ── Pointer events ────────────────────────────────────────────
    const onDown = (e: PointerEvent) => {
      dragging = true;
      isTouch = e.pointerType === "touch";
      lastX = e.clientX;
      lastY = e.clientY;
      vx = vy = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const raw_dx = e.clientX - lastX;
      const raw_dy = e.clientY - lastY;
      // Touch fingers move in small deltas per event — boost to match desktop feel
      const speed = e.pointerType === "touch" ? 1.8 : 1;
      const dx = raw_dx * speed;
      const dy = raw_dy * speed;
      ox += dx; oy += dy;
      vx = dx;  vy = dy;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = "grab";
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      vx -= e.deltaX * 0.5;
      vy -= e.deltaY * 0.5;
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.style.cursor = "grab";

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0e0d0c 0%, #1a1814 100%)",
      }}
    >
      {/* Canvas — touch-action:none stops browser scroll interception on mobile */}
      <canvas
        ref={canvasRef}
        style={{ display: "block", touchAction: "none" }}
      />




      {/* ── Heavy 4-edge vignette ── */}
      {/* Top */}
      <div style={{ position:"absolute", inset:0, zIndex:5, pointerEvents:"none",
        background:"linear-gradient(to bottom, rgba(14,13,12,1) 0%, rgba(14,13,12,0.7) 8%, transparent 22%)" }} />
      {/* Bottom */}
      <div style={{ position:"absolute", inset:0, zIndex:5, pointerEvents:"none",
        background:"linear-gradient(to top, rgba(14,13,12,1) 0%, rgba(14,13,12,0.7) 8%, transparent 22%)" }} />
      {/* Left */}
      <div style={{ position:"absolute", inset:0, zIndex:5, pointerEvents:"none",
        background:"linear-gradient(to right, rgba(14,13,12,1) 0%, rgba(14,13,12,0.6) 6%, transparent 18%)" }} />
      {/* Right */}
      <div style={{ position:"absolute", inset:0, zIndex:5, pointerEvents:"none",
        background:"linear-gradient(to left, rgba(14,13,12,1) 0%, rgba(14,13,12,0.6) 6%, transparent 18%)" }} />
    </div>
  );
}

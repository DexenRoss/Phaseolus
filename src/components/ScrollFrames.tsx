"use client";
import React, { useEffect, useMemo, useRef } from "react";

export default function ScrollFrames({ frameCount = 60 }: { frameCount?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedFrames = useRef<HTMLImageElement[]>([]);
  const lastDrawn = useRef(-1);

  const framePaths = useMemo(
    () =>
      Array.from({ length: frameCount }, (_, i) =>
        `/seedance_frames/frame_${String(i + 1).padStart(2, "0")}.png`
      ),
    [frameCount]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Preload all frames into Image objects
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const drawFrame = (idx: number) => {
      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      if (idx === lastDrawn.current) return;
      lastDrawn.current = idx;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // object-cover logic
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const dx = (cw - sw) / 2;
      const dy = (ch - sh) / 2;

      ctx.drawImage(img, dx, dy, sw, sh);
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      lastDrawn.current = -1; // force redraw on resize
    };

    resizeCanvas();

    framePaths.forEach((src, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      img.onload = () => {
        loaded++;
        // Draw the first frame as soon as it's ready
        if (i === 0) drawFrame(0);
      };
      images[i] = img;
    });

    loadedFrames.current = images;

    // Scroll handler — maps scroll position to frame index
    let ticking = false;
    const update = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? scrollTop / maxScroll : 0;
      const idx = Math.min(
        framePaths.length - 1,
        Math.max(0, Math.round(pct * (framePaths.length - 1)))
      );
      drawFrame(idx);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const onResize = () => {
      resizeCanvas();
      // Redraw current frame after resize
      const scrollTop = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? scrollTop / maxScroll : 0;
      const idx = Math.min(
        framePaths.length - 1,
        Math.max(0, Math.round(pct * (framePaths.length - 1)))
      );
      drawFrame(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [framePaths]);

  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}

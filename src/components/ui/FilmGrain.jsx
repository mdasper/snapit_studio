import React, { useEffect, useRef } from 'react';

/**
 * FilmGrain — Lightweight, high-performance animated noise overlay
 * Uses a small offscreen noise tile rendered to pattern, 6% opacity, pointer-events:none
 */
export default function FilmGrain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const tileSize = 160;

    // Create small offscreen noise tiles
    const tiles = [0, 1, 2, 3].map(() => {
      const offscreen = document.createElement('canvas');
      offscreen.width = tileSize;
      offscreen.height = tileSize;
      const offCtx = offscreen.getContext('2d');
      const imgData = offCtx.createImageData(tileSize, tileSize);
      const { data } = imgData;

      for (let i = 0; i < data.length; i += 4) {
        const val = (Math.random() * 255) | 0;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 30; // subtle opacity baked in
      }
      offCtx.putImageData(imgData, 0, 0);
      return ctx.createPattern(offscreen, 'repeat');
    });

    let frame = 0;
    let animId;
    let lastTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const render = (time) => {
      // Throttle noise shift to ~15fps for cinema film grain effect and 0% CPU
      if (time - lastTime > 65) {
        lastTime = time;
        frame = (frame + 1) % tiles.length;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = tiles[frame];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      animId = requestAnimationFrame(render);
    };

    resize();
    animId = requestAnimationFrame(render);

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        opacity: 0.07,
        zIndex: 990,
        pointerEvents: 'none',
      }}
    />
  );
}

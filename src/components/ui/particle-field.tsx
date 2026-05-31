"use client";

import { useEffect, useRef } from "react";

/**
 * Lamplight dust. Sparse, slow warm motes that drift upward and sway,
 * the way dust catches a bedside lamp. Calm by design — low count, low
 * speed, low opacity. Frozen for anyone who prefers reduced motion.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio, 1.5);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    type Tone = "amber" | "cream" | "lavender";
    const tones: Record<Tone, [number, number, number]> = {
      amber: [212, 165, 116],
      cream: [242, 237, 228],
      lavender: [168, 163, 199],
    };

    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      drift: number;
      phase: number;
      twinkle: number;
      tone: Tone;
      isOrb: boolean;
    }[] = [];

    const pick = (): Tone =>
      Math.random() > 0.55 ? "amber" : Math.random() > 0.5 ? "cream" : "lavender";

    // Fine drifting motes
    for (let i = 0; i < 34; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.1 + 0.3,
        speed: Math.random() * 0.028 + 0.006,
        drift: Math.random() * 0.14 + 0.04,
        phase: Math.random() * Math.PI * 2,
        twinkle: Math.random() * Math.PI * 2,
        tone: pick(),
        isOrb: false,
      });
    }

    // A few soft glowing orbs, like light pooling in the air
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 3,
        speed: Math.random() * 0.012 + 0.004,
        drift: Math.random() * 0.1 + 0.03,
        phase: Math.random() * Math.PI * 2,
        twinkle: Math.random() * Math.PI * 2,
        tone: Math.random() > 0.5 ? "amber" : "lavender",
        isOrb: true,
      });
    }

    const paint = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        const [r, g, b] = tones[p.tone];
        const sway = Math.sin(p.phase) * p.drift * 6;
        if (p.isOrb) {
          const alpha = 0.03 + Math.sin(p.twinkle) * 0.02;
          const gradient = ctx.createRadialGradient(
            p.x + sway,
            p.y,
            0,
            p.x + sway,
            p.y,
            p.size * 7
          );
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 2.5})`);
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x + sway, p.y, p.size * 7, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const alpha = 0.1 + (Math.sin(p.twinkle) + 1) * 0.07;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x + sway, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    if (reduceMotion) {
      paint();
      return () => window.removeEventListener("resize", resize);
    }

    let frame = 0;
    let animId: number;
    const draw = () => {
      frame++;
      if (frame % 3 !== 0) {
        animId = requestAnimationFrame(draw);
        return;
      }
      particles.forEach((p) => {
        p.twinkle += 0.008;
        p.phase += 0.004;
        p.y -= p.speed;
        if (p.y < -10) {
          p.y = window.innerHeight + 10;
          p.x = Math.random() * window.innerWidth;
        }
      });
      paint();
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none" />
  );
}

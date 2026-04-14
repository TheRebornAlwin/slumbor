"use client";

import { useEffect, useRef } from "react";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 1.5);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      twinkle: number;
      color: "gold" | "purple" | "white";
      isOrb: boolean;
    }[] = [];

    // Tiny star-like particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.2 + 0.3,
        speed: Math.random() * 0.05 + 0.01,
        twinkle: Math.random() * Math.PI * 2,
        color: Math.random() > 0.6 ? "gold" : Math.random() > 0.5 ? "purple" : "white",
        isOrb: false,
      });
    }

    // Larger glowing orbs
    for (let i = 0; i < 4; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 3,
        speed: Math.random() * 0.02 + 0.005,
        twinkle: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? "gold" : "purple",
        isOrb: true,
      });
    }

    let frame = 0;
    let animId: number;

    const draw = () => {
      frame++;
      if (frame % 3 !== 0) {
        animId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((p) => {
        p.twinkle += 0.01;
        p.y -= p.speed;

        if (p.y < -10) {
          p.y = window.innerHeight + 10;
          p.x = Math.random() * window.innerWidth;
        }

        if (p.isOrb) {
          const alpha = 0.03 + Math.sin(p.twinkle) * 0.02;
          const r = p.color === "gold" ? 226 : 139;
          const g = p.color === "gold" ? 184 : 108;
          const b = p.color === "gold" ? 85 : 192;

          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 2.5})`);
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const alpha = 0.15 + Math.sin(p.twinkle) * 0.15;
          if (p.color === "gold") {
            ctx.fillStyle = `rgba(226, 184, 85, ${alpha * 0.4})`;
          } else if (p.color === "purple") {
            ctx.fillStyle = `rgba(139, 108, 192, ${alpha * 0.3})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.2})`;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}

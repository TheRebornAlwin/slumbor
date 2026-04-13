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
      color: "gold" | "purple";
      isOrb: boolean;
    }[] = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.08 + 0.02,
        twinkle: Math.random() * Math.PI * 2,
        color: Math.random() > 0.4 ? "gold" : "purple",
        isOrb: false,
      });
    }

    for (let i = 0; i < 5; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 2,
        speed: Math.random() * 0.03 + 0.01,
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
        p.twinkle += 0.015;
        p.y -= p.speed;

        if (p.y < -10) {
          p.y = window.innerHeight + 10;
          p.x = Math.random() * window.innerWidth;
        }

        if (p.isOrb) {
          const alpha = 0.04 + Math.sin(p.twinkle) * 0.03;
          const r = p.color === "gold" ? 201 : 123;
          const g = p.color === "gold" ? 168 : 94;
          const b = p.color === "gold" ? 76 : 167;

          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 2})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const alpha = 0.04 + Math.sin(p.twinkle) * 0.04;
          if (p.color === "gold") {
            ctx.fillStyle = `rgba(201, 168, 76, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(123, 94, 167, ${alpha})`;
          }
          ctx.fillRect(p.x, p.y, p.size, p.size);
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

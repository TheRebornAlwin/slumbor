"use client";

/**
 * The SlowWave Method, drawn. A warm glow (heat) sitting behind an eye-mask
 * band, pulse rings emanating from the center, and sound arcs from the temples.
 * Pure SVG so it needs no photography, and it makes the three-signal mechanism
 * a thing you can see, not just read.
 */
export default function SlowWaveDiagram() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <svg
        viewBox="0 0 360 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-label="The SlowWave Method: warmth, pulse, and sound around the eyes"
      >
        <defs>
          <radialGradient id="sw-warm" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4A574" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#D4A574" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sw-eye" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBF1DF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#E8C79A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Warmth: a breathing glow */}
        <g
          className="motion-safe:animate-[breathe-glow_11s_ease-in-out_infinite]"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx="180" cy="150" r="118" fill="url(#sw-warm)" />
        </g>

        {/* Pulse: rings emanating from the center, mask sits over the middle */}
        <circle cx="180" cy="150" r="128" stroke="#D4A574" strokeOpacity="0.16" strokeWidth="1.5" />
        <circle cx="180" cy="150" r="104" stroke="#D4A574" strokeOpacity="0.28" strokeWidth="1.5" />
        <circle cx="180" cy="150" r="80" stroke="#D4A574" strokeOpacity="0.45" strokeWidth="1.5" />

        {/* Sound: arcs from the temples */}
        <g stroke="#D4A574" fill="none" strokeLinecap="round">
          <path d="M296 124 Q322 150 296 176" strokeOpacity="0.5" strokeWidth="1.5" />
          <path d="M308 108 Q346 150 308 192" strokeOpacity="0.28" strokeWidth="1.5" />
          <path d="M64 124 Q38 150 64 176" strokeOpacity="0.5" strokeWidth="1.5" />
          <path d="M52 108 Q14 150 52 192" strokeOpacity="0.28" strokeWidth="1.5" />
        </g>

        {/* Heat rising off the top of the mask */}
        <g stroke="#D4A574" strokeOpacity="0.5" fill="none" strokeLinecap="round" strokeWidth="1.5">
          <path d="M150 112 q6 -8 0 -16 q-6 -8 0 -16" />
          <path d="M180 108 q6 -8 0 -16 q-6 -8 0 -16" />
          <path d="M210 112 q6 -8 0 -16 q-6 -8 0 -16" />
        </g>

        {/* The mask band */}
        <rect
          x="64"
          y="118"
          width="232"
          height="64"
          rx="32"
          fill="#F2EDE4"
          fillOpacity="0.05"
          stroke="#D4A574"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        {/* Two soft eye glows on the mask */}
        <ellipse cx="132" cy="150" rx="22" ry="16" fill="url(#sw-eye)" />
        <ellipse cx="228" cy="150" rx="22" ry="16" fill="url(#sw-eye)" />
      </svg>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-5 text-xs tracking-[0.15em] uppercase text-foreground/70">
        {["Warmth", "Pulse", "Sound"].map((label) => (
          <span key={label} className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

/**
 * The room. A fixed, full-page atmosphere that sits behind everything:
 * a warm midnight base, a slow-drifting hypnagogic aurora, a single lamp
 * that breathes, and a warm vignette. The grain layer is rendered last,
 * above content, so the whole site reads like analog film, not a screen.
 *
 * All layers are pointer-events-none and decorative.
 */
export default function Atmosphere() {
  return (
    <>
      {/* Behind all content */}
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep base wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-10%,#16233f_0%,#0E1626_45%,#0A0F1C_100%)]" />

        {/* Drifting hypnagogic aurora */}
        <div className="atmosphere-aurora absolute -inset-[20%]" />

        {/* The breathing lamp, high and slightly right, like a bedside light */}
        <div className="atmosphere-lamp absolute left-1/2 top-[6%] h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full" />

        {/* Warm vignette drawing the eye inward */}
        <div className="atmosphere-vignette absolute inset-0" />
      </div>

      {/* Film grain, above content (decorative, never blocks clicks) */}
      <div
        aria-hidden
        className="atmosphere-grain fixed inset-0 z-[100] pointer-events-none"
      />
    </>
  );
}

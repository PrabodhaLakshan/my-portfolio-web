"use client";

/* ─── AnimatedBackground ──────────────────────────────────────────────────────
 * Renders large, slow-drifting colour orbs that float behind all content.
 * Purely decorative – pointer-events: none, z-index: 0.
 * ─────────────────────────────────────────────────────────────────────────── */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Orb 1 – top-left cyan */}
      <div
        className="ambient-blob ambient-blob-1"
        style={{
          top: "-12%",
          left: "-8%",
          width: "55vw",
          height: "55vw",
          maxWidth: 700,
          maxHeight: 700,
        }}
      />

      {/* Orb 2 – bottom-right violet */}
      <div
        className="ambient-blob ambient-blob-2"
        style={{
          bottom: "-15%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          maxWidth: 650,
          maxHeight: 650,
        }}
      />

      {/* Orb 3 – centre subtle accent */}
      <div
        className="ambient-blob ambient-blob-3"
        style={{
          top: "35%",
          left: "30%",
          width: "40vw",
          height: "40vw",
          maxWidth: 520,
          maxHeight: 520,
        }}
      />
    </div>
  );
}

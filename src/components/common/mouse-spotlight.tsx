"use client";

import { useEffect, useRef } from "react";

export function MouseSpotlight() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // target / current positions for smooth lerp
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Show on first real move
      if (!isVisible) {
        isVisible = true;
        if (glowRef.current) glowRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }

      // Ring follows exactly
      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      // Glow lerps toward cursor (smooth lag)
      const lerpFactor = 0.09;
      currentX += (targetX - currentX) * lerpFactor;
      currentY += (targetY - currentY) * lerpFactor;

      // Update CSS vars for the glow div
      if (glowRef.current) {
        glowRef.current.style.setProperty("--mx", `${currentX}px`);
        glowRef.current.style.setProperty("--my", `${currentY}px`);
      }

      // Also update the documentElement vars (used by other elements if needed)
      document.documentElement.style.setProperty("--mouse-x", `${targetX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${targetY}px`);

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Smooth-lagging radial glow blob */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transition: "opacity 0.6s ease",
          background: `radial-gradient(
            280px circle at var(--mx, 50%) var(--my, 50%),
            hsl(187 90% 45% / 0.13),
            hsl(187 90% 45% / 0.05) 45%,
            transparent 80%
          )`,
        }}
        className="mouse-glow"
      />

      {/* Precise cursor ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid hsl(187 90% 45% / 0.45)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transition:
            "opacity 0.6s ease, width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
          backdropFilter: "none",
          mixBlendMode: "normal",
          left: "-100px",
          top: "-100px",
        }}
        id="cursor-ring"
      />
    </>
  );
}

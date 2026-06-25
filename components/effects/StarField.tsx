"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
  animationDuration: number;
}

export function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stars: Star[] = [];
    const count = 120;

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        animationDelay: Math.random() * 5,
        animationDuration: Math.random() * 3 + 2,
      });
    }

    stars.forEach((star) => {
      const el = document.createElement("div");
      el.className = "absolute rounded-full bg-white";
      el.style.cssText = `
        left: ${star.x}%;
        top: ${star.y}%;
        width: ${star.size}px;
        height: ${star.size}px;
        opacity: ${star.opacity};
        animation: twinkle ${star.animationDuration}s ease-in-out ${star.animationDelay}s infinite;
      `;
      container.appendChild(el);
    });

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

"use client";

import { motion } from "framer-motion";

interface GlowEffectProps {
  className?: string;
}

export function GlowEffect({ className }: GlowEffectProps) {
  return (
    <motion.div
      className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${className ?? ""}`}
      style={{
        background:
          "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)",
      }}
    />
  );
}

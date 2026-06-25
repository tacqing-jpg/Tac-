"use client";

import { useNavStore } from "@/store/navStore";
import { BookOpen, Brain, Palette, Heart } from "lucide-react";
import { motion } from "framer-motion";

const CABINS = [
  { id: "study", label: "学习舱", icon: BookOpen },
  { id: "memory", label: "记忆舱", icon: Brain },
  { id: "create", label: "创造舱", icon: Palette },
  { id: "life", label: "生活舱", icon: Heart },
] as const;

export function Dock() {
  const { activeSection, setActiveSection } = useNavStore();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 glass-strong rounded-2xl px-3 py-2.5 shadow-2xl glow-purple">
        {CABINS.map((cabin) => {
          const Icon = cabin.icon;
          const isActive = activeSection === cabin.id;
          return (
            <button
              key={cabin.id}
              onClick={() => setActiveSection(cabin.id)}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 group"
            >
              {isActive && (
                <motion.div
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-xl bg-white/8"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`relative h-5 w-5 transition-colors ${
                  isActive
                    ? "text-accent-purple"
                    : "text-text-tertiary group-hover:text-text-secondary"
                }`}
              />
              <span
                className={`relative text-[10px] transition-colors ${
                  isActive
                    ? "text-text-primary"
                    : "text-text-tertiary group-hover:text-text-secondary"
                }`}
              >
                {cabin.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

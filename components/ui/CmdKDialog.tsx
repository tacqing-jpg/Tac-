"use client";

import { useNavStore } from "@/store/navStore";
import { useCmdK } from "@/hooks/useCmdK";
import { SECTIONS } from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CmdKDialog() {
  const { cmdKOpen, setCmdKOpen } = useNavStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useCmdK();

  useEffect(() => {
    if (cmdKOpen) {
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [cmdKOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!cmdKOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % SECTIONS.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + SECTIONS.length) % SECTIONS.length
        );
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const section = SECTIONS[selectedIndex];
        document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
        setCmdKOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cmdKOpen, selectedIndex, setCmdKOpen]);

  const handleSelect = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setCmdKOpen(false);
  };

  return (
    <AnimatePresence>
      {cmdKOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setCmdKOpen(false)}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-md glass rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="border-b border-white/10 px-4 py-3">
              <input
                ref={inputRef}
                type="text"
                placeholder="Jump to section..."
                className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
                readOnly
              />
            </div>
            <div className="py-2">
              {SECTIONS.map((section, i) => (
                <button
                  key={section.id}
                  onClick={() => handleSelect(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    i === selectedIndex
                      ? "bg-white/8 text-text-primary"
                      : "text-text-tertiary hover:text-text-secondary"
                  }`}
                >
                  <span className="text-text-tertiary text-xs w-5 tabular-nums">
                    {i + 1}
                  </span>
                  {section.label}
                </button>
              ))}
            </div>
            <div className="border-t border-white/10 px-4 py-2 flex items-center gap-4 text-xs text-text-tertiary">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>Esc Close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

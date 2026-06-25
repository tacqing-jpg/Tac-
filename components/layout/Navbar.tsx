"use client";

import { useNavStore } from "@/store/navStore";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export function Navbar() {
  const activeSection = useNavStore((s) => s.activeSection);
  const [scrolled, setScrolled] = useState(false);

  useScrollSpy(SECTIONS.map((s) => s.id));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollTo("home")}
          className="text-lg font-semibold text-text-primary tracking-tight"
        >
          Portfolio OS
        </button>

        <div className="hidden md:flex items-center gap-1">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={cn(
                "relative px-3 py-1.5 text-sm rounded-lg transition-colors duration-200",
                activeSection === section.id
                  ? "text-text-primary"
                  : "text-text-tertiary hover:text-text-secondary"
              )}
            >
              {activeSection === section.id && (
                <span className="absolute inset-0 rounded-lg bg-white/8" />
              )}
              <span className="relative">{section.label}</span>
            </button>
          ))}
        </div>

        <div className="md:hidden text-text-tertiary text-xs">
          {SECTIONS.find((s) => s.id === activeSection)?.label}
        </div>
      </div>
    </nav>
  );
}

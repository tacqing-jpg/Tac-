"use client";

import profile from "@/data/profile";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SECTIONS } from "@/components/layout/Navbar";
import { ArrowDown, Mail } from "lucide-react";

export function Home() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatedSection
      id="home"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <div className="space-y-1 mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-text-secondary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          {profile.status}
        </span>
      </div>

      <h1 className="text-5xl font-bold text-text-primary tracking-tight md:text-7xl">
        {profile.name}
      </h1>

      <p className="mt-4 text-xl text-text-secondary md:text-2xl">
        {profile.title}
      </p>

      <p className="mt-3 max-w-md text-text-tertiary text-lg">
        {profile.tagline}
      </p>

      <div className="mt-10 flex items-center gap-4">
        <button
          onClick={() => scrollTo("projects")}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-white/90 hover:scale-105"
        >
          查看作品
          <ArrowDown className="h-4 w-4" />
        </button>
        <button
          onClick={() => scrollTo("contact")}
          className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-medium text-text-secondary transition-all hover:scale-105 hover:border-white/20"
        >
          <Mail className="h-4 w-4" />
          联系我
        </button>
      </div>

      <button
        onClick={() => scrollTo("about")}
        className="absolute bottom-10 animate-bounce text-text-tertiary hover:text-text-secondary transition-colors"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-6 w-6" />
      </button>
    </AnimatedSection>
  );
}

"use client";

import profile from "@/data/profile";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowEffect } from "@/components/effects/GlowEffect";
import { ExternalLink, Github } from "lucide-react";
import { type MouseEvent, useCallback } from "react";

function ProjectCard({
  project,
}: {
  project: (typeof profile.projects)[number];
}) {
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  return (
    <GlassCard
      className="group relative overflow-hidden flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Glow */}
      <GlowEffect />

      {/* Thumbnail placeholder */}
      <div className="mb-4 aspect-video rounded-xl bg-white/5 flex items-center justify-center text-text-tertiary text-sm border border-white/5">
        {project.name}
      </div>

      <h3 className="text-lg font-semibold text-text-primary">
        {project.name}
      </h3>
      <p className="mt-2 text-sm text-text-tertiary leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Highlights */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.highlights.map((h) => (
          <span
            key={h}
            className="rounded-md bg-white/8 px-2 py-0.5 text-xs text-text-secondary"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Tech stack */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-white/8 px-2 py-0.5 text-xs text-text-tertiary"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="mt-4 flex items-center gap-3 pt-2 border-t border-white/6">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-secondary transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            Source
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-secondary transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Demo
          </a>
        )}
      </div>
    </GlassCard>
  );
}

export function Projects() {
  return (
    <AnimatedSection id="projects" className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Projects"
          subtitle="Things I've built that I'm proud of."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

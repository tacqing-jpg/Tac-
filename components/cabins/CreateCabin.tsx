"use client";

import profile from "@/data/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SkillBar } from "@/components/ui/SkillBar";
import { ExternalLink, Github } from "lucide-react";
import { type MouseEvent, useCallback } from "react";

export function CreateCabin() {
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  return (
    <div className="space-y-12">
      {/* Projects */}
      <div>
        <SectionTitle title="创造舱" subtitle="项目作品 · 技术能力" />

        <div className="grid gap-5 sm:grid-cols-2">
          {profile.projects.map((project) => (
            <GlassCard
              key={project.id}
              className="group relative overflow-hidden flex flex-col"
              onMouseMove={handleMouseMove}
            >
              {/* Glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(167,139,250,0.08), transparent 40%)",
                }}
              />

              {/* Thumbnail */}
              <div className="mb-3 aspect-video rounded-xl bg-white/5 flex items-center justify-center text-text-tertiary text-xs border border-white/5">
                {project.name}
              </div>

              <h3 className="text-base font-semibold text-text-primary">
                {project.name}
              </h3>
              <p className="mt-1.5 text-xs text-text-tertiary leading-relaxed flex-1">
                {project.description}
              </p>

              {/* Highlights */}
              <div className="mt-3 flex flex-wrap gap-1">
                {project.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-md bg-accent-purple/10 px-2 py-0.5 text-[10px] text-accent-purple"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Tech */}
              <div className="mt-2 flex flex-wrap gap-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/8 px-2 py-0.5 text-[10px] text-text-tertiary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-3 flex items-center gap-3 pt-2 border-t border-white/6">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-text-tertiary hover:text-accent-purple transition-colors"
                  >
                    <Github className="h-3 w-3" />
                    Source
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-text-tertiary hover:text-accent-cyan transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Demo
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-6">
          技能面板
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((group) => (
            <GlassCard key={group.category} hover={false}>
              <h4 className="text-sm font-semibold text-text-primary mb-4">
                {group.category}
              </h4>
              <div className="space-y-3">
                {group.items.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import profile from "@/data/profile";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { SkillBar } from "@/components/ui/SkillBar";

export function Skills() {
  return (
    <AnimatedSection id="skills" className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Skills"
          subtitle="Technologies and tools I work with."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((group) => (
            <GlassCard key={group.category} hover={false}>
              <h3 className="text-lg font-semibold text-text-primary mb-6">
                {group.category}
              </h3>
              <div className="space-y-4">
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
    </AnimatedSection>
  );
}

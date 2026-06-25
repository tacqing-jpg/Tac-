"use client";

import profile from "@/data/profile";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { Sparkles, Zap, Gauge } from "lucide-react";

const icons = [Sparkles, Zap, Gauge];

export function About() {
  return (
    <AnimatedSection id="about" className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="About"
          subtitle="Who I am and how I work."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Bio */}
          <div className="space-y-4">
            {profile.about.bio.map((paragraph, i) => (
              <p key={i} className="text-text-secondary leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 pt-4">
              {profile.about.workStyle.map((style) => (
                <span
                  key={style}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-text-tertiary"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div className="space-y-4">
            {profile.about.strengths.map((strength, i) => {
              const Icon = icons[i] || Sparkles;
              return (
                <GlassCard key={strength.label} hover={false}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8">
                      <Icon className="h-5 w-5 text-text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        {strength.label}
                      </h3>
                      <p className="mt-1 text-sm text-text-tertiary leading-relaxed">
                        {strength.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

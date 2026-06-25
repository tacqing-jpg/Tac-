"use client";

import profile from "@/data/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Mail, Github, Heart, Sparkles } from "lucide-react";

export function LifeCabin() {
  return (
    <div className="space-y-8">
      <SectionTitle title="生活舱" subtitle="兴趣爱好 · 性格 · 联系" />

      {/* Hobbies */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.life.hobbies.map((hobby) => (
          <GlassCard key={hobby.name} hover={true}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{hobby.emoji}</span>
              <div>
                <h3 className="font-semibold text-sm text-text-primary">
                  {hobby.name}
                </h3>
                <p className="mt-1 text-xs text-text-tertiary leading-relaxed">
                  {hobby.description}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Personality + Quote */}
      <div className="grid gap-4 sm:grid-cols-2">
        <GlassCard hover={false}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-accent-pink" />
            <h3 className="text-sm font-semibold text-text-primary">
              性格标签
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {profile.life.personality.map((trait) => (
              <span
                key={trait}
                className="rounded-full bg-accent-pink/10 px-3 py-1 text-xs text-accent-pink"
              >
                {trait}
              </span>
            ))}
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-4 w-4 text-accent-pink" />
            <h3 className="text-sm font-semibold text-text-primary">
              座右铭
            </h3>
          </div>
          <p className="text-text-secondary italic text-sm">
            &ldquo;{profile.life.quote}&rdquo;
          </p>
        </GlassCard>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          联系我
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <GlassCard hover={false}>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-purple/10">
                <Mail className="h-4 w-4 text-accent-purple" />
              </div>
              <a
                href={`mailto:${profile.contact.email}`}
                className="text-sm text-text-secondary hover:text-accent-purple transition-colors"
              >
                {profile.contact.email}
              </a>
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-cyan/10">
                <Github className="h-4 w-4 text-accent-cyan" />
              </div>
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-accent-cyan transition-colors"
              >
                GitHub
              </a>
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-pink/10">
                <span className="text-accent-pink font-bold text-sm">X</span>
              </div>
              <a
                href={profile.contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-accent-pink transition-colors"
              >
                Twitter
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

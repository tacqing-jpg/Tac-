"use client";

import type { Experience as ExperienceType } from "@/data/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

interface TimelineItemProps {
  experience: ExperienceType;
  index: number;
}

export function TimelineItem({ experience, index }: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex w-full ${isLeft ? "lg:justify-start" : "lg:justify-end"}`}
    >
      <div className="w-full lg:w-[calc(50%-2rem)]">
        <GlassCard hover={false}>
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {experience.role}
                </h3>
                <p className="text-text-secondary">{experience.company}</p>
              </div>
              <span className="shrink-0 text-sm text-text-tertiary">
                {experience.period}
              </span>
            </div>

            <p className="text-text-secondary text-sm leading-relaxed">
              {experience.description}
            </p>

            <ul className="space-y-1.5">
              {experience.results.map((result, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-text-secondary"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                  {result}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {experience.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/8 bg-white/5 px-2 py-0.5 text-xs text-text-tertiary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
}

"use client";

import profile from "@/data/profile";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TimelineItem } from "@/components/ui/TimelineItem";

export function Experience() {
  return (
    <AnimatedSection id="experience" className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Experience"
          subtitle="Where I've made an impact."
        />

        {/* Timeline line */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px bg-white/8 lg:block" />

          <div className="space-y-12">
            {profile.experience.map((exp, i) => (
              <TimelineItem key={exp.id} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

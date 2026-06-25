"use client";

import profile from "@/data/profile";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, Github, Twitter, Send } from "lucide-react";
import { type FormEvent, useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <AnimatedSection id="contact" className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Contact"
          subtitle="Let's work together."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: contact info */}
          <div className="space-y-6">
            <GlassCard hover={false}>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8">
                  <Mail className="h-5 w-5 text-text-primary" />
                </div>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  {profile.contact.email}
                </a>
              </div>
            </GlassCard>

            <GlassCard hover={false}>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8">
                  <Github className="h-5 w-5 text-text-primary" />
                </div>
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  {profile.contact.github}
                </a>
              </div>
            </GlassCard>

            <GlassCard hover={false}>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8">
                  <Twitter className="h-5 w-5 text-text-primary" />
                </div>
                <a
                  href={profile.contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  {profile.contact.twitter}
                </a>
              </div>
            </GlassCard>
          </div>

          {/* Right: simple form */}
          <GlassCard hover={false}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-text-tertiary mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-white/20 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-text-tertiary mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-white/20 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-text-tertiary mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-white/20 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition-all hover:bg-white/90 hover:scale-105"
              >
                {sent ? "Sent!" : "Send Message"}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </AnimatedSection>
  );
}

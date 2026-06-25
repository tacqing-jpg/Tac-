# Personal Portfolio OS — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page interactive portfolio website with glassmorphism OS-style UI, 6 scrollable sections, Framer Motion animations, and Zustand state management.

**Architecture:** Next.js 15 App Router single-page app. All sections on `/`. Zustand manages nav state via Intersection Observer. Mock data in `data/profile.ts`. Glassmorphism encapsulated in shared UI components. Framer Motion handles section reveals and card hover effects.

**Tech Stack:** Next.js 15, TypeScript (strict), TailwindCSS, Framer Motion, Shadcn UI, Zustand, pnpm

## Global Constraints

- Next.js 15 with App Router — no Pages Router
- TypeScript strict mode
- Dark mode only — no light mode toggle
- No backend, no API routes, no database
- No background images or videos
- No OS-like desktop/windows/icons
- All content from `data/profile.ts` — single source of truth
- Glassmorphism: `backdrop-filter: blur(18px); background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12)`
- Colors: BG `#0F1115`, BG-secondary `#161A22`, BG-tertiary `#1D2433`, Text `#FFFFFF`/`#D0D5DD`/`#98A2B3`
- Section padding: `py-24` to `py-32`, max-width: `max-w-6xl`
- Card hover: `scale(1.03)`, soft glow, border lighten, 0.3s ease-out
- Section reveal: opacity 0→1, blur(4px)→0, y: 20→0, viewport trigger once
- Font: Inter (headings), system mono (code)
- Responsive: Desktop ≥1024px, Tablet 640-1023px, Mobile <640px
- Package manager: pnpm

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `lib/utils.ts`

**Interfaces:**
- Produces: `cn(...inputs: ClassValue[]): string` from `lib/utils.ts`
- Produces: TailwindCSS theme with custom colors, Inter font, glass utilities
- Produces: Next.js project ready to run with `pnpm dev`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "portfolio-os",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^12.0.0",
    "zustand": "^5.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^3.0.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "postcss": "^8.5.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `cd D:\简介\portfolio-os && pnpm install`
Expected: dependencies installed, `pnpm-lock.yaml` created

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create next.config.ts**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 5: Create postcss.config.mjs**

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 6: Create lib/utils.ts**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 7: Create tailwind.config.ts — N/A with Tailwind v4, use CSS-based config. Skip this file, configure in globals.css instead.**

- [ ] **Step 8: Create app/globals.css**

```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #0f1115;
  --color-bg-secondary: #161a22;
  --color-bg-tertiary: #1d2433;
  --color-text-primary: #ffffff;
  --color-text-secondary: #d0d5dd;
  --color-text-tertiary: #98a2b3;
  --color-glass-bg: rgba(255, 255, 255, 0.06);
  --color-glass-border: rgba(255, 255, 255, 0.12);
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    monospace;
}

@layer base {
  * {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-bg-primary);
    color: var(--color-text-secondary);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background-color: rgba(255, 255, 255, 0.15);
    color: var(--color-text-primary);
  }
}

@layer utilities {
  .glass {
    backdrop-filter: blur(18px);
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
}
```

- [ ] **Step 9: Create app/layout.tsx**

```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio OS",
  description: "Personal portfolio — interactive resume",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-secondary antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 10: Create placeholder app/page.tsx**

```typescript
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-text-primary text-2xl">Portfolio OS</p>
    </main>
  );
}
```

- [ ] **Step 11: Verify project runs**

Run: `cd D:\简介\portfolio-os && pnpm dev`
Expected: dev server starts on localhost:3000, page renders "Portfolio OS"

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 project with TailwindCSS and glass theme"
```

---

### Task 2: Mock Data + Zustand Store

**Files:**
- Create: `data/profile.ts`
- Create: `store/navStore.ts`

**Interfaces:**
- Produces: `profile: Profile` from `data/profile.ts` — exported default object
- Produces: `useNavStore` from `store/navStore.ts` — Zustand hook with `activeSection: string`, `cmdKOpen: boolean`, `setActiveSection(section: string): void`, `setCmdKOpen(open: boolean): void`

- [ ] **Step 1: Create data/profile.ts**

```typescript
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  results: string[];
  techStack: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export interface SkillGroup {
  category: string;
  items: { name: string; level: number }[];
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  status: string;
  about: {
    bio: string[];
    strengths: { label: string; description: string }[];
    workStyle: string[];
  };
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  contact: {
    email: string;
    github: string;
    twitter: string;
  };
}

const profile: Profile = {
  name: "Alex Chen",
  title: "Frontend Developer & UI Designer",
  tagline:
    "Building beautiful, performant web experiences with product thinking.",
  status: "Available for work",
  about: {
    bio: [
      "I'm a frontend developer with a designer's eye. I care deeply about the details — the spacing between elements, the timing of an animation, the way a hover state feels.",
      "Over 5 years of experience building products from zero to launch. I believe great interfaces come from understanding both the user and the code.",
      "Currently focused on React, Next.js, and design systems. I love turning complex problems into simple, elegant interfaces.",
    ],
    strengths: [
      {
        label: "Product Thinking",
        description:
          "I don't just build UI — I understand the product context and user needs behind every interface decision.",
      },
      {
        label: "Design Engineering",
        description:
          "Comfortable in Figma and in code. I bridge the gap between design and development.",
      },
      {
        label: "Performance Obsession",
        description:
          "Core Web Vitals, bundle optimization, and buttery-smooth 60fps animations are non-negotiable.",
      },
    ],
    workStyle: [
      "Remote-first",
      "Async communication",
      "Write things down",
      "Ship early, iterate fast",
    ],
  },
  experience: [
    {
      id: "exp-1",
      company: "TechCorp",
      role: "Senior Frontend Engineer",
      period: "2023 — Present",
      description:
        "Led the frontend architecture for the company's flagship product — a SaaS platform serving 50K+ users.",
      results: [
        "Redesigned the core dashboard, improving user engagement by 35%",
        "Built a shared component library adopted by 3 teams, cutting UI development time by 40%",
        "Migrated from Pages Router to App Router with zero downtime",
      ],
      techStack: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    },
    {
      id: "exp-2",
      company: "StartupXYZ",
      role: "Frontend Developer",
      period: "2021 — 2023",
      description:
        "First frontend hire. Built the entire customer-facing product from scratch.",
      results: [
        "Shipped the MVP in 3 months, securing seed funding",
        "Grew the frontend codebase from 0 to 50K lines with consistent patterns",
        "Established CI/CD pipeline and testing infrastructure",
      ],
      techStack: ["React", "TypeScript", "Styled Components", "Cypress"],
    },
    {
      id: "exp-3",
      company: "DesignStudio",
      role: "UI Developer",
      period: "2019 — 2021",
      description:
        "Worked at the intersection of design and engineering, turning Figma designs into production interfaces.",
      results: [
        "Delivered 20+ client projects with pixel-perfect implementation",
        "Introduced component-driven development to the engineering team",
        "Built internal tools that reduced QA feedback cycles by 50%",
      ],
      techStack: ["React", "JavaScript", "Sass", "Storybook"],
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Design System",
      description:
        "A comprehensive component library with 50+ accessible, themeable UI components. Used across 3 product teams.",
      techStack: ["React", "TypeScript", "Storybook", "TailwindCSS"],
      highlights: [
        "50+ components",
        "Full accessibility",
        "Tree-shakeable",
      ],
      github: "https://github.com",
      demo: "https://demo.example.com",
    },
    {
      id: "proj-2",
      name: "Analytics Dashboard",
      description:
        "Real-time analytics dashboard with interactive charts, customizable widgets, and role-based access control.",
      techStack: ["Next.js", "D3.js", "WebSocket", "PostgreSQL"],
      highlights: ["Real-time updates", "Drag-and-drop layout", "Export to PDF"],
      github: "https://github.com",
    },
    {
      id: "proj-3",
      name: "E-commerce Platform",
      description:
        "Full-featured e-commerce platform with cart, checkout, payment integration, and admin dashboard.",
      techStack: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
      highlights: ["SSR optimized", "SEO score 98", "3s time-to-interactive"],
      github: "https://github.com",
      demo: "https://demo.example.com",
    },
    {
      id: "proj-4",
      name: "Developer CLI Tool",
      description:
        "A CLI tool for scaffolding projects, generating components, and managing config — used by 200+ developers.",
      techStack: ["Node.js", "TypeScript", "Commander.js"],
      highlights: ["200+ weekly downloads", "Plugin system", "Auto-completion"],
      github: "https://github.com",
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "TypeScript", level: 90 },
        { name: "TailwindCSS", level: 95 },
        { name: "Framer Motion", level: 85 },
      ],
    },
    {
      category: "Tools",
      items: [
        { name: "Git", level: 90 },
        { name: "Figma", level: 80 },
        { name: "Storybook", level: 85 },
        { name: "CI/CD", level: 80 },
      ],
    },
    {
      category: "Design",
      items: [
        { name: "UI Design", level: 85 },
        { name: "Design Systems", level: 90 },
        { name: "Prototyping", level: 75 },
        { name: "Motion Design", level: 80 },
      ],
    },
  ],
  contact: {
    email: "alex@example.com",
    github: "https://github.com/alexchen",
    twitter: "https://x.com/alexchen",
  },
};

export default profile;
```

- [ ] **Step 2: Create store/navStore.ts**

```typescript
import { create } from "zustand";

interface NavState {
  activeSection: string;
  cmdKOpen: boolean;
  setActiveSection: (section: string) => void;
  setCmdKOpen: (open: boolean) => void;
}

export const useNavStore = create<NavState>((set) => ({
  activeSection: "home",
  cmdKOpen: false,
  setActiveSection: (section) => set({ activeSection: section }),
  setCmdKOpen: (open) => set({ cmdKOpen: open }),
}));
```

- [ ] **Step 3: Commit**

```bash
git add data/profile.ts store/navStore.ts
git commit -m "feat: add mock profile data and Zustand nav store"
```

---

### Task 3: UI Primitives (GlassCard, SectionTitle, AnimatedSection)

**Files:**
- Create: `components/ui/GlassCard.tsx`
- Create: `components/ui/SectionTitle.tsx`
- Create: `components/ui/AnimatedSection.tsx`

**Interfaces:**
- Consumes: `cn` from `lib/utils`
- Produces: `<GlassCard>` — wrapper with glassmorphism, accepts `className`, `hover` (boolean), `as` (element type), `children`
- Produces: `<SectionTitle>` — section heading, accepts `title`, `subtitle?`
- Produces: `<AnimatedSection>` — Framer Motion wrapper, accepts `children`, `className`, `delay?`

- [ ] **Step 1: Create components/ui/GlassCard.tsx**

```typescript
"use client";

import { cn } from "@/lib/utils";
import { type ElementType, type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: ElementType;
}

export function GlassCard({
  children,
  className,
  hover = true,
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300",
        hover &&
          "hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/20",
        className
      )}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Create components/ui/SectionTitle.tsx**

```typescript
interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-16 space-y-3">
      <h2 className="text-4xl font-bold text-text-primary md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-tertiary max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create components/ui/AnimatedSection.tsx**

```typescript
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  id,
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, filter: "blur(4px)", y: 20 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/GlassCard.tsx components/ui/SectionTitle.tsx components/ui/AnimatedSection.tsx
git commit -m "feat: add UI primitives — GlassCard, SectionTitle, AnimatedSection"
```

---

### Task 4: Hooks (useScrollSpy, useCmdK)

**Files:**
- Create: `hooks/useScrollSpy.ts`
- Create: `hooks/useCmdK.ts`

**Interfaces:**
- Consumes: `useNavStore` from `store/navStore`
- Produces: `useScrollSpy(sectionIds: string[]): void` — sets active section in navStore via IntersectionObserver
- Produces: `useCmdK(): void` — binds Cmd+K/Ctrl+K to toggle cmdKOpen in navStore, Esc to close

- [ ] **Step 1: Create hooks/useScrollSpy.ts**

```typescript
"use client";

import { useEffect } from "react";
import { useNavStore } from "@/store/navStore";

export function useScrollSpy(sectionIds: string[]) {
  const setActiveSection = useNavStore((s) => s.setActiveSection);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [sectionIds, setActiveSection]);
}
```

- [ ] **Step 2: Create hooks/useCmdK.ts**

```typescript
"use client";

import { useEffect } from "react";
import { useNavStore } from "@/store/navStore";

export function useCmdK() {
  const { cmdKOpen, setCmdKOpen } = useNavStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdKOpen(!cmdKOpen);
      }
      if (e.key === "Escape" && cmdKOpen) {
        setCmdKOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cmdKOpen, setCmdKOpen]);
}
```

- [ ] **Step 3: Commit**

```bash
git add hooks/useScrollSpy.ts hooks/useCmdK.ts
git commit -m "feat: add scroll spy and Cmd+K keyboard hooks"
```

---

### Task 5: Navbar + Footer

**Files:**
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `useNavStore` from `store/navStore`, `useScrollSpy` from `hooks/useScrollSpy`
- Produces: `<Navbar>` — fixed top glass nav with 6 links, scroll-spy highlight, transparent→glass on scroll
- Produces: `<Footer>` — minimal footer with copyright

**SECTIONS constant (shared, define in Navbar.tsx and export):**
```typescript
export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
```

- [ ] **Step 1: Create components/layout/Navbar.tsx**

```typescript
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
```

- [ ] **Step 2: Create components/layout/Footer.tsx**

```typescript
export function Footer() {
  return (
    <footer className="border-t border-white/8 py-8">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-text-tertiary">
        <p>© {new Date().getFullYear()} Alex Chen. Built with care.</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx components/layout/Footer.tsx
git commit -m "feat: add Navbar with scroll spy and Footer"
```

---

### Task 6: Home Section

**Files:**
- Create: `components/sections/Home.tsx`

**Interfaces:**
- Consumes: `profile` from `data/profile.ts`, `AnimatedSection`, `SECTIONS` from `Navbar`
- Produces: `<Home>` — full-viewport hero with name, title, tagline, status badge, CTAs

- [ ] **Step 1: Create components/sections/Home.tsx**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Home.tsx
git commit -m "feat: add Home hero section"
```

---

### Task 7: About Section

**Files:**
- Create: `components/sections/About.tsx`

**Interfaces:**
- Consumes: `profile` from `data/profile.ts`, `AnimatedSection`, `SectionTitle`, `GlassCard`

- [ ] **Step 1: Create components/sections/About.tsx**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: add About section with bio and strengths"
```

---

### Task 8: Experience Section

**Files:**
- Create: `components/ui/TimelineItem.tsx`
- Create: `components/sections/Experience.tsx`

**Interfaces:**
- Consumes: `profile` from `data/profile.ts`, `AnimatedSection`, `SectionTitle`, `GlassCard`
- Produces: `<TimelineItem>` — single timeline entry with company, role, period, description, results, tech tags
- Produces: `<Experience>` — vertical timeline layout

- [ ] **Step 1: Create components/ui/TimelineItem.tsx**

```typescript
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
```

- [ ] **Step 2: Create components/sections/Experience.tsx**

```typescript
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
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/TimelineItem.tsx components/sections/Experience.tsx
git commit -m "feat: add Experience section with alternating timeline"
```

---

### Task 9: Projects Section

**Files:**
- Create: `components/effects/GlowEffect.tsx`
- Create: `components/sections/Projects.tsx`

**Interfaces:**
- Consumes: `profile` from `data/profile.ts`, `AnimatedSection`, `SectionTitle`, `GlassCard`, `GlowEffect`
- Produces: `<GlowEffect>` — decorative glow behind hovered card
- Produces: `<Projects>` — 2-3 column responsive card grid with hover effects

- [ ] **Step 1: Create components/effects/GlowEffect.tsx**

```typescript
"use client";

import { motion } from "framer-motion";

interface GlowEffectProps {
  className?: string;
}

export function GlowEffect({ className }: GlowEffectProps) {
  return (
    <motion.div
      className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${className ?? ""}`}
      style={{
        background:
          "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)",
      }}
    />
  );
}
```

- [ ] **Step 2: Create components/sections/Projects.tsx**

```typescript
"use client";

import profile from "@/data/profile";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
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
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

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
```

- [ ] **Step 3: Commit**

```bash
git add components/effects/GlowEffect.tsx components/sections/Projects.tsx
git commit -m "feat: add Projects section with card grid and mouse-tracking glow"
```

---

### Task 10: Skills Section

**Files:**
- Create: `components/ui/SkillBar.tsx`
- Create: `components/sections/Skills.tsx`

**Interfaces:**
- Consumes: `profile` from `data/profile.ts`, `AnimatedSection`, `SectionTitle`, `GlassCard`

- [ ] **Step 1: Create components/ui/SkillBar.tsx**

```typescript
"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-secondary">{name}</span>
        <span className="text-text-tertiary tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-white/30"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create components/sections/Skills.tsx**

```typescript
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
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/SkillBar.tsx components/sections/Skills.tsx
git commit -m "feat: add Skills section with animated proficiency bars"
```

---

### Task 11: Contact Section + CmdKDialog

**Files:**
- Create: `components/sections/Contact.tsx`
- Create: `components/ui/CmdKDialog.tsx`

**Interfaces:**
- Consumes: `profile`, `AnimatedSection`, `SectionTitle`, `GlassCard`, `useNavStore`, `SECTIONS`
- Produces: `<Contact>` — email, social links, simple form
- Produces: `<CmdKDialog>` — glass modal command palette

- [ ] **Step 1: Create components/sections/Contact.tsx**

```typescript
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
```

- [ ] **Step 2: Create components/ui/CmdKDialog.tsx**

```typescript
"use client";

import { useNavStore } from "@/store/navStore";
import { useCmdK } from "@/hooks/useCmdK";
import { SECTIONS } from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CmdKDialog() {
  const { cmdKOpen, setCmdKOpen } = useNavStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useCmdK();

  useEffect(() => {
    if (cmdKOpen) {
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [cmdKOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!cmdKOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % SECTIONS.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + SECTIONS.length) % SECTIONS.length
        );
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const section = SECTIONS[selectedIndex];
        document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
        setCmdKOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cmdKOpen, selectedIndex, setCmdKOpen]);

  const handleSelect = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setCmdKOpen(false);
  };

  return (
    <AnimatePresence>
      {cmdKOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setCmdKOpen(false)}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-md glass rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="border-b border-white/10 px-4 py-3">
              <input
                ref={inputRef}
                type="text"
                placeholder="Jump to section..."
                className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
                readOnly
              />
            </div>
            <div className="py-2">
              {SECTIONS.map((section, i) => (
                <button
                  key={section.id}
                  onClick={() => handleSelect(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    i === selectedIndex
                      ? "bg-white/8 text-text-primary"
                      : "text-text-tertiary hover:text-text-secondary"
                  }`}
                >
                  <span className="text-text-tertiary text-xs w-5 tabular-nums">
                    {i + 1}
                  </span>
                  {section.label}
                </button>
              ))}
            </div>
            <div className="border-t border-white/10 px-4 py-2 flex items-center gap-4 text-xs text-text-tertiary">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>Esc Close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Contact.tsx components/ui/CmdKDialog.tsx
git commit -m "feat: add Contact section and Cmd+K command palette"
```

---

### Task 12: Page Assembly + Scroll-to-top

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: All section components, Navbar, Footer, CmdKDialog

- [ ] **Step 1: Update app/layout.tsx to include Navbar, Footer, CmdKDialog**

Replace the existing `app/layout.tsx` content with:

```typescript
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CmdKDialog } from "@/components/ui/CmdKDialog";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio OS — Alex Chen",
  description: "Personal portfolio — interactive resume",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-secondary antialiased">
        <Navbar />
        {children}
        <Footer />
        <CmdKDialog />
        <ScrollToTop />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create components/ui/ScrollToTop.tsx**

```typescript
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 glass rounded-full p-3 text-text-tertiary hover:text-text-primary transition-colors shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Update app/page.tsx to assemble all sections**

Replace the existing `app/page.tsx` content with:

```typescript
import { Home } from "@/components/sections/Home";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <main>
      <Home />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 4: Verify the full app builds and runs**

Run: `cd D:\简介\portfolio-os && pnpm build`
Expected: successful build with no errors

- [ ] **Step 5: Run dev server and test all interactions**

Run: `cd D:\简介\portfolio-os && pnpm dev`
Expected:
- All 6 sections render
- Navbar fixed at top, glass on scroll, active section highlights
- Section reveal animations play on scroll
- Cards have hover scale + glow effects
- Cmd+K opens command palette, keyboard navigation works
- Scroll-to-top button appears after scrolling past hero
- Mobile responsive: single column, readable text
- Contact form shows "Sent!" confirmation

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: assemble all sections into complete portfolio page"
```

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
      highlights: ["50+ components", "Full accessibility", "Tree-shakeable"],
      github: "https://github.com",
      demo: "https://demo.example.com",
    },
    {
      id: "proj-2",
      name: "Analytics Dashboard",
      description:
        "Real-time analytics dashboard with interactive charts, customizable widgets, and role-based access control.",
      techStack: ["Next.js", "D3.js", "WebSocket", "PostgreSQL"],
      highlights: [
        "Real-time updates",
        "Drag-and-drop layout",
        "Export to PDF",
      ],
      github: "https://github.com",
    },
    {
      id: "proj-3",
      name: "E-commerce Platform",
      description:
        "Full-featured e-commerce platform with cart, checkout, payment integration, and admin dashboard.",
      techStack: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
      highlights: [
        "SSR optimized",
        "SEO score 98",
        "3s time-to-interactive",
      ],
      github: "https://github.com",
      demo: "https://demo.example.com",
    },
    {
      id: "proj-4",
      name: "Developer CLI Tool",
      description:
        "A CLI tool for scaffolding projects, generating components, and managing config — used by 200+ developers.",
      techStack: ["Node.js", "TypeScript", "Commander.js"],
      highlights: [
        "200+ weekly downloads",
        "Plugin system",
        "Auto-completion",
      ],
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

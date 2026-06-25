# Personal Portfolio OS — Design Spec

**Date:** 2026-06-25
**Status:** Approved
**Type:** Greenfield — Interactive Portfolio Website

---

## 1. Project Identity

**Name:** Personal Portfolio OS
**Tagline:** 用"操作系统 / 空间 UI"的方式展示一个人的能力与经历
**Target Audience:** 面试官、招聘方、技术合作者
**North Star:** 让面试官打开后产生三个判断 — "这是一个认真做设计的人"、"这是一个有产品思维的人"、"这是一个可以做高级 UI 的人"

---

## 2. Technical Stack (Fixed)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | TailwindCSS |
| Animation | Framer Motion |
| UI Primitives | Shadcn UI |
| State | Zustand |
| Package Manager | pnpm |

---

## 3. Architecture

### 3.1 Navigation Pattern

**Single Page Scroll (方案 A).** All 6 sections on one route (`/`), navbar triggers `scrollIntoView({ behavior: 'smooth' })`. Active section highlighted via Intersection Observer.

### 3.2 Route Design

```
/              → Main page (all sections, single-page scroll)
(no sub-routes needed)
```

### 3.3 Component Tree

```
layout.tsx
├── ThemeProvider (CSS variables injection)
├── Navbar (fixed, glass, scroll-spy highlight)
├── <main>
│   ├── Home        (hero, name, title, CTA)
│   ├── About       (bio, tags, timeline)
│   ├── Experience  (timeline, productized descriptions)
│   ├── Projects    (card grid, hover effects)
│   ├── Skills      (grouped tags + proficiency bars)
│   └── Contact     (email, social, simple form)
├── CmdKDialog (Cmd+K quick nav overlay)
└── Footer (minimal)
```

### 3.4 Data Flow

```
data/profile.ts  ──read──→  Each <Section /> component
                              │
Zustand navStore  ──write──→  useScrollSpy (Intersection Observer)
  activeSection    ──read──→  Navbar (highlight), CmdKDialog (current)
  cmdKOpen         ──read──→  CmdKDialog
```

- All personal content lives in `data/profile.ts` — single source of truth
- Zustand is minimal: only `activeSection` (string) and `cmdKOpen` (boolean)
- No API calls, no backend — fully static

### 3.5 File Structure

```
D:\简介\portfolio-os/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── GlassCard.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── AnimatedSection.tsx
│   │   ├── SkillBar.tsx
│   │   ├── TimelineItem.tsx
│   │   └── CmdKDialog.tsx
│   └── effects/
│       └── GlowEffect.tsx
├── data/
│   └── profile.ts
├── store/
│   └── navStore.ts
├── hooks/
│   ├── useScrollSpy.ts
│   └── useCmdK.ts
├── lib/
│   └── utils.ts
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── package.json
```

---

## 4. Visual Design System

### 4.1 Core Identity

**Style Keywords:** 极简 · 高级 · 玻璃拟态 · 空间感 · 克制 · 设计感 · 动效细腻

**References:** Apple Vision Pro, Linear, Arc Browser, Notion, Framer Portfolio

### 4.2 Color Palette (Dark Mode Only)

| Role | Hex | Usage |
|------|-----|-------|
| BG Primary | `#0F1115` | Page background |
| BG Secondary | `#161A22` | Card / elevated surface |
| BG Tertiary | `#1D2433` | Hover / active state |
| Text Primary | `#FFFFFF` | Headings |
| Text Secondary | `#D0D5DD` | Body text |
| Text Tertiary | `#98A2B3` | Captions / metadata |
| Glass BG | `rgba(255,255,255,0.06)` | Glassmorphism panels |
| Glass Border | `rgba(255,255,255,0.12)` | Glass panel borders |

### 4.3 Typography

- **Font:** `Inter` (headings) + system monospace (code only)
- **Scale:** Tailwind default scale, headings at `text-4xl` to `text-6xl`, body at `text-base`/`text-lg`
- **Weight:** 400 body, 500 emphasis, 600 sub-headings, 700 headings

### 4.4 Glassmorphism Standard

```css
.glass {
  backdrop-filter: blur(18px);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
```

Encapsulated in `<GlassCard />` — never written inline.

### 4.5 Spacing

- Section padding: `py-24` to `py-32`
- Card gap: `gap-6` to `gap-8`
- Max content width: `max-w-6xl` (1280px)
- Generous whitespace — breathing room is a design element

---

## 5. Section Specifications

### 5.1 Home

- Full viewport height hero
- Name (large), Title (medium), One-liner (small, tertiary color)
- Status badge: "🟢 Available for work"
- Two CTA buttons: "查看作品" (primary, scrolls to Projects), "联系我" (secondary, scrolls to Contact)
- **No background image/video for now** (explicit decision)

### 5.2 About

- Two-column: left = text bio, right = skill tags + work style cards
- Timeline element showing career highlights (compact)
- Key strengths listed as glass cards with icons

### 5.3 Experience

- Vertical timeline, alternating left/right on desktop, single column on mobile
- Each entry: Company, Role, Date range, Responsibilities, **Results** (bolded, quantified)
- "产品化表达" — not job descriptions, but impact statements

### 5.4 Projects

- 2-3 column card grid (responsive)
- Each card: name, short description, tech stack tags, highlight badge, preview thumbnail placeholder, GitHub/Demo links
- Hover: `scale(1.03)`, soft glow shadow, border light animation

### 5.5 Skills

- Grouped: Frontend / Tools / Design (no Backend unless data present)
- Display: tag chips + proficiency bar (thin, subtle)
- Compact layout, not the main focus

### 5.6 Contact

- Left: email, GitHub, Twitter/X links
- Right: simple form (name, email, message) — static, no backend
- Minimal, high-trust design

---

## 6. Interaction & Animation Spec

### 6.1 Section Reveal (Framer Motion)

```
Initial:  opacity: 0, filter: blur(4px), y: 20
Animate:  opacity: 1, filter: blur(0px), y: 0
Trigger:  viewport enter (once: true)
```

Encapsulated in `<AnimatedSection />`.

### 6.2 Card Hover

```
hover: scale: 1.03, box-shadow glow, border-color lighten
transition: duration 0.3s, ease-out
```

### 6.3 Navbar

- `backdrop-filter: blur(18px)` on scroll (transparent at top, glass when scrolled)
- Active section: highlighted with subtle background + accent indicator
- Smooth section highlight transition

### 6.4 Cmd+K

- `Cmd+K` / `Ctrl+K` opens a command palette overlay
- Lists all 6 sections, keyboard navigable, Enter to scroll
- `Esc` to close
- Styled as glass modal

### 6.5 Scroll-to-top

- Floating button appears after scrolling past first section
- Smooth scroll to top on click
- Glassmorphism style, small and subtle

---

## 7. Responsive Strategy

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Desktop | ≥1024px | Full experience, 2-3 column grids, alternating timeline |
| Tablet | 640-1023px | 1-2 column, stacked timeline, reduced spacing |
| Mobile | <640px | Single column, simplified cards, hamburger or reduced nav, smaller type |

---

## 8. What We Are NOT Building

- ❌ OS-like desktop with windows/icons/filesystem
- ❌ Multi-page routing
- ❌ Backend / API / database
- ❌ CMS integration
- ❌ Background images or videos (for now)
- ❌ Excessive animation (nothing decorative-only)
- ❌ Light mode (dark only)
- ❌ Authentication or admin panel

---

## 9. Success Criteria

1. Site loads and renders all 6 sections correctly
2. Smooth scroll navigation works, active section highlights
3. Glassmorphism is consistent across all cards and navbar
4. Animations feel smooth, not distracting
5. Fully responsive on mobile, tablet, and desktop
6. Cmd+K palette works
7. All content comes from `data/profile.ts` — changing data changes the site
8. Code is clean, well-structured, and follows React/Next.js best practices

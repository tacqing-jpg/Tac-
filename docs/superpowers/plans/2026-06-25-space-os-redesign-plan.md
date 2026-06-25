# Space OS Redesign — Implementation Plan

**Goal:** Redesign portfolio site with Space OS "healing desktop" aesthetic — 4 cabins, desktop metaphor, starfield background, purple/pink accents.

## Architecture Change

```
BEFORE: Single-page scroll, 6 sections, glass navbar
AFTER:  Desktop OS metaphor, 4 cabins with tab switching, Dock + StatusBar

layout.tsx (Desktop OS Shell)
├── StarField (CSS animated stars)
├── StatusBar (top bar: time + date)
├── <main> (desktop area)
│   ├── DesktopIcons (shortcuts to 4 cabins)
│   └── CabinWindow (active cabin — glass window panel)
│       ├── 学习舱 (About content)
│       ├── 记忆舱 (Experience timeline)
│       ├── 创造舱 (Projects + Skills)
│       └── 生活舱 (Contact + hobbies)
├── Dock (bottom nav: 4 cabin icons)
└── CmdKDialog (preserved)
```

## Color Palette (New)

| Role | Old | New |
|------|-----|-----|
| BG Primary | #0F1115 | deep space gradient |
| Accent Primary | white | #A78BFA (purple) |
| Accent Secondary | — | #F472B6 (pink) |
| Glass BG | rgba(255,255,255,0.06) | rgba(255,255,255,0.04) |
| Glass Border | rgba(255,255,255,0.12) | rgba(255,255,255,0.08) |
| Text | white/stone | preserved |

## Preserved Components
- GlassCard, SectionTitle, AnimatedSection, SkillBar, TimelineItem, GlowEffect, CmdKDialog, ScrollToTop
- data/profile.ts (all content preserved, + hobbies added)
- store/navStore.ts, hooks/useScrollSpy.ts, hooks/useCmdK.ts, lib/utils.ts

## New Components
- StarField (CSS keyframe stars)
- StatusBar (top bar)
- Dock (bottom OS dock)
- DesktopIcon (clickable shortcut)
- CabinWindow (draggable glass panel)

## Content Mapping
- 学习舱 ← about.bio + strengths + workStyle
- 记忆舱 ← experience timeline
- 创造舱 ← projects + skills
- 生活舱 ← contact + hobbies (new)

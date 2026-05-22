# 🎨 EDUVERSE — Design System

> **Version:** 1.0.0 | **Last Updated:** 2025-05

---

## Table of Contents

- [Design Philosophy](#design-philosophy)
- [Brand Identity](#brand-identity)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing & Grid](#spacing--grid)
- [Component Design](#component-design)
- [Animation Principles](#animation-principles)
- [Iconography](#iconography)
- [Accessibility](#accessibility)
- [Writing Style](#writing-style)
- [Component Patterns](#component-patterns)

---

## Design Philosophy

EDUVERSE is designed to make learning **warm, welcoming, and delightful**. Our design principles:

| Principle | Description |
|-----------|-------------|
| **Warm & Approachable** | Orange gradients and friendly shadows create emotional warmth |
| **Modular & Card-Based** | Information is broken into digestible card components |
| **Progressive Disclosure** | Surface complexity gradually; never overwhelm |
| **Delightful Microinteractions** | Subtle animations reward progress and guide attention |
| **Learning-First** | Every design decision prioritizes comprehension and retention |
| **Accessible by Default** | WCAG 2.1 AA minimum, AAA targeted for critical interfaces |

---

## Brand Identity

### Logo

The EDUVERSE logo combines an open book with an infinity symbol, representing **lifelong learning**.

- **Primary Logo**: Full wordmark with icon (used in sidebar, marketing)
- **Icon Only**: Used for favicon, mobile app icon, social media
- **Minimum Clearance**: 16px padding on all sides

### Voice & Tone

| Context | Tone | Example |
|---------|------|---------|
| Dashboard | Encouraging | "Great start today! You're on a 3-day streak." |
| Error messages | Helpful | "Something went wrong. Let's try again — your work is saved." |
| Notifications | Warm | "🎉 Sarah completed her Python project!" |
| Empty states | Motivational | "No assignments yet. Time to explore a course!" |

---

## Color System

### Primary — Warm Orange Family

```css
/* Tailwind v4 CSS */
:root {
  --color-primary-50:  #fff7ed;
  --color-primary-100: #ffedd5;
  --color-primary-200: #fed7aa;
  --color-primary-300: #fdba74;
  --color-primary-400: #fb923c;
  --color-primary-500: #f97316;
  --color-primary-600: #ea580c;
  --color-primary-700: #c2410c;
  --color-primary-800: #9a3412;
  --color-primary-900: #7c2d12;
  --color-primary-950: #431407;
}
```

### Semantic Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-success` | `#16a34a` | `#22c55e` | Completion, correct answers |
| `--color-warning` | `#ca8a04` | `#eab308` | Streaks, achievements, caution |
| `--color-error` | `#dc2626` | `#ef4444` | Errors, failed attempts |
| `--color-info` | `#2563eb` | `#3b82f6` | Information, tips |
| `--color-surface` | `#ffffff` | `#0f172a` | Card backgrounds |
| `--color-surface-hover` | `#f8fafc` | `#1e293b` | Hover states |
| `--color-border` | `#e2e8f0` | `#334155` | Borders, dividers |
| `--color-text` | `#0f172a` | `#f1f5f9` | Primary text |
| `--color-text-secondary` | `#64748b` | `#94a3b8` | Secondary/muted text |

### Gradient System

```css
/* Hero gradients */
--gradient-hero: linear-gradient(135deg, #f97316, #ea580c);
--gradient-card: linear-gradient(180deg, rgba(249,115,22,0.1), transparent);
--gradient-badge: linear-gradient(135deg, #f97316, #fb923c);

/* Subject colors (for course cards) */
--gradient-math: linear-gradient(135deg, #3b82f6, #2563eb);
--gradient-science: linear-gradient(135deg, #22c55e, #16a34a);
--gradient-coding: linear-gradient(135deg, #a855f7, #7c3aed);
--gradient-language: linear-gradient(135deg, #f97316, #ea580c);
--gradient-history: linear-gradient(135deg, #f59e0b, #d97706);
--gradient-art: linear-gradient(135deg, #ec4899, #db2777);
```

---

## Typography

### Font Family

```css
:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-display: 'Cal Sans', 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Type Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| **Display XL** | 4.5rem (72px) | 800 | 1.1 | Hero headings |
| **Display L** | 3rem (48px) | 700 | 1.15 | Page titles |
| **Heading 1** | 2rem (32px) | 700 | 1.2 | Section headers |
| **Heading 2** | 1.5rem (24px) | 600 | 1.25 | Card titles |
| **Heading 3** | 1.25rem (20px) | 600 | 1.3 | Subsection headers |
| **Body Large** | 1.125rem (18px) | 400 | 1.5 | Lead paragraphs |
| **Body** | 1rem (16px) | 400 | 1.5 | Default text |
| **Body Small** | 0.875rem (14px) | 400 | 1.5 | Metadata, captions |
| **Caption** | 0.75rem (12px) | 500 | 1.4 | Labels, timestamps |
| **Overline** | 0.75rem (12px) | 600 | 1.4 | Uppercase labels |

---

## Spacing & Grid

### Spacing Scale

```css
:root {
  --space-1: 0.25rem;   /* 4px  */
  --space-2: 0.5rem;    /* 8px  */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

### Grid System

| Breakpoint | Width | Columns | Gutter | Margin |
|------------|-------|---------|--------|--------|
| **Mobile** | < 640px | 4 | 16px | 16px |
| **Tablet** | 640-1023px | 8 | 24px | 24px |
| **Desktop** | 1024-1279px | 12 | 24px | 32px |
| **Wide** | 1280px+ | 12 | 32px | auto |

### Card Sizing

| Card Type | Width | Padding | Border Radius |
|-----------|-------|---------|---------------|
| Stat Card | 240px | 16px | 12px |
| Course Card | 320px | 20px | 16px |
| Dashboard Card | 100% | 24px | 16px |
| Modal | 480px | 32px | 20px |
| Sidebar | 280px | 16px | 0 |

---

## Component Design

### Cards

Cards are the primary structural element. Every card follows this pattern:

```
┌─────────────────────────────────────────┐
│ ┌──────┐                                │
│ │ Icon │  Title                    ⋮    │
│ └──────┘                               │
│                                         │
│  Content area with 16px padding         │
│  Can contain text, charts, lists        │
│                                         │
│ ─────────────────────────────────────── │
│  Footer (optional): actions, links      │
└─────────────────────────────────────────┘
```

**Card States:**

| State | Description | Visual |
|-------|-------------|--------|
| Default | Resting state | `bg-surface`, `border-border` |
| Hover | Interactive cards | `shadow-md`, slight translateY(-2px) |
| Active | Selected/pressed | `border-primary-500` |
| Loading | Skeleton placeholder | Pulsing animation |
| Disabled | Greyed out | `opacity-50`, no interactions |
| Error | Error state | `border-error`, error icon |

### Buttons

| Variant | BG | Text | Border | Hover |
|---------|----|------|--------|-------|
| **Primary** | Primary-500 | White | — | Primary-600 |
| **Secondary** | Transparent | Primary-500 | Primary-500 | Primary-50 bg |
| **Ghost** | Transparent | Text | — | Surface hover |
| **Danger** | Error | White | — | Error-dark |
| **Link** | Transparent | Primary-500 | — | Underline |

### Forms

- **Labels**: Above input, Overline style, required indicator with asterisk
- **Inputs**: 12px border radius, 12px padding Y, 16px padding X
- **Focus**: Primary-500 ring with `ring-offset-2`
- **Error**: Red border + error message below input
- **Helper Text**: Text-secondary, small, below input

---

## Animation Principles

### Duration & Easing

```json
{
  "instant": "100ms",
  "fast": "200ms",
  "normal": "300ms",
  "slow": "500ms",
  "deliberate": "700ms"
}
```

| Easing | CSS | Use Case |
|--------|-----|----------|
| **Ease Out** | `cubic-bezier(0.16, 1, 0.3, 1)` | Elements entering, appearing |
| **Ease In Out** | `cubic-bezier(0.65, 0, 0.35, 1)` | Page transitions, modals |
| **Spring** | Framer Motion spring | Natural-feeling microinteractions |
| **Bounce** | Framer Motion bounce | Celebrations, achievements |

### Microinteraction Library

| Interaction | Animation | Duration | Easing |
|-------------|-----------|----------|--------|
| Card hover | translateY(-4px) + shadow | 200ms | ease-out |
| Button click | scale(0.97) | 100ms | ease-out |
| Page transition | fade + slide up | 300ms | ease-in-out |
| Modal open | scale(0.95 → 1) + fade | 300ms | spring |
| Toast enter | slide in from right | 300ms | spring |
| Streak fire | pulse + glow | 500ms | ease-out |
| XP gain | count up + particle burst | 700ms | ease-out |
| Skeleton pulse | opacity 0.3 → 0.6 | 1500ms | ease-in-out |

---

## Iconography

- **Library**: Lucide React (consistent, accessible)
- **Size**: 16px (inline), 20px (buttons), 24px (cards), 32px (empty states)
- **Stroke Width**: 2px (default), 1.5px (detailed icons)
- **Color**: Inherits from parent text color
- **Accessibility**: All icons have `aria-hidden="true"` unless they're interactive

### Icon Guidelines

```
✅ Do:
  - Use icons to reinforce meaning, not replace text
  - Match icon to action context
  - Consistent stroke width across interface

❌ Don't:
  - Use icons without labels for critical actions
  - Mix icon styles from different libraries
  - Animate icons unless they signal a state change
```

---

## Accessibility

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| Color Contrast | WCAG AA (4.5:1 text, 3:1 large) | All color pairs verified |
| Focus Indicators | WCAG 2.4.7 | Visible focus ring (2px offset) |
| Keyboard Navigation | WCAG 2.1.1 | Tab order, arrow keys for lists |
| Screen Readers | WCAG 4.1.2 | ARIA labels, live regions |
| Motion Reduction | WCAG 2.3.3 | `prefers-reduced-motion` respected |
| Touch Targets | 44x44px minimum | All interactive elements |
| Zoom Support | 200% without loss | Responsive, no horizontal scroll |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Writing Style

### Microcopy Guidelines

| Do | Don't |
|----|-------|
| "Start your learning journey" | "Click here to begin" |
| "You're on fire! 🔥 5-day streak" | "5 consecutive days logged in" |
| "Let's try again — you've got this" | "Error. Try again." |
| "Your certificate is ready" | "Certificate generated" |
| "Find your perfect tutor" | "Tutor search" |

### Error Messages

```
Format: [What happened] + [What to do] + [Optional: how to prevent]
Example: "Your session expired. Please log in again — we saved your progress."
```

---

## Component Patterns

### Empty States

Every data-display component must handle the empty state:

```tsx
<EmptyState
  icon={<BookOpen />}
  title="No courses yet"
  description="Start your learning journey by enrolling in a course."
  action={<Button>Browse Courses</Button>}
/>
```

### Loading States

Three levels of loading feedback:

1. **Skeleton** — Card outlines pulse while content loads
2. **Spinner** — Inline loading for small content areas
3. **Progress Bar** — Top-of-page for full page transitions

### Error Boundaries

Every route and data-fetching boundary must implement error recovery:

```tsx
<ErrorBoundary fallback={<ErrorState onRetry={() => reset()} />}>
  <CourseList />
</ErrorBoundary>
```

---

## References

- [shadcn/ui Components](https://ui.shadcn.com) — Base components
- [Tailwind CSS v4](https://tailwindcss.com) — Utility framework
- [Framer Motion](https://www.framer.com/motion) — Animation library
- [Lucide Icons](https://lucide.dev) — Icon set

---

<div align="center">
  <sub>Copyright © 2025 EDUVERSE. All rights reserved.</sub>
</div>

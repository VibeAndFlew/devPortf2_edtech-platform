# 🤝 EDUVERSE — Contributing Guide

> **Version:** 1.0.0 | **Last Updated:** 2025-05

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Commit Conventions](#commit-conventions)
- [Project Conventions](#project-conventions)

---

## Code of Conduct

### Our Pledge

We pledge to make participation in EDUVERSE a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Standards

**Expected:**
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Gracefully accept constructive criticism
- Focus on what is best for the community

**Unacceptable:**
- Trolling, insulting/derogatory comments
- Personal or political attacks
- Public or private harassment
- Publishing others' private information
- Sexualized content or unwelcome advances

### Enforcement

Instances of abusive behavior may be reported to conduct@eduverse.com. All complaints will be reviewed and investigated promptly and fairly.

---

## Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **Git** with GPG signing configured
- **PostgreSQL** >= 16
- **Visual Studio Code** (recommended with ESLint + Prettier extensions)

### First-Time Setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/learning-platform.git
cd learning-platform

# 2. Add upstream remote
git remote add upstream https://github.com/eduverse/learning-platform.git

# 3. Install dependencies
npm install

# 4. Set up environment
cp .env.example .env.local
# Edit .env.local with your local configuration

# 5. Set up database
npx prisma generate
npx prisma db push

# 6. Run the dev server
npm run dev
```

### VSCode Setup

Recommended extensions (in `.vscode/extensions.json`):
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "Prisma.prisma",
    "formulahendry.auto-rename-tag",
    "mikestead.dotenv"
  ]
}
```

---

## Development Workflow

### Branch Naming

```
feat/description        # New features
fix/description         # Bug fixes
refactor/description    # Refactoring
docs/description        # Documentation
test/description        # Tests
chore/description       # Maintenance
perf/description        # Performance improvements
style/description       # Styling (formatting, not CSS)
```

Examples: `feat/ai-tutor-recommendations`, `fix/assignment-duedate-bug`

### Workflow Steps

```bash
# 1. Update main branch
git checkout main
git pull upstream main

# 2. Create feature branch
git checkout -b feat/your-feature

# 3. Make changes with frequent commits
git add .
git commit -m "feat: add AI tutor recommendation engine"

# 4. Keep branch up to date
git fetch upstream
git rebase upstream/main

# 5. Push and create PR
git push origin feat/your-feature
# Open PR on GitHub
```

---

## Code Standards

### TypeScript

```typescript
// ✅ DO: Strict types, explicit returns
export function calculateProgress(
  completed: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

// ❌ DON'T: any, implicit any, loose types
export function calculateProgress(completed: any, total: any) {
  return completed / total * 100;
}
```

### React Components

```typescript
// ✅ DO: Server Component by default, named exports
export async function CourseList() {
  const courses = await fetchCourses();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

// ✅ DO: Client Components when needed, clearly marked
"use client";

export function LiveClassButton({ sessionId }: { sessionId: string }) {
  const [joining, setJoining] = useState(false);
  // ...
}
```

### Component Structure

```typescript
// 1. Imports
import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

// 2. Types/Interfaces
interface BadgeProps extends ComponentProps<"div"> {
  variant: "success" | "warning" | "error";
}

// 3. Component
export function Badge({ variant, className, ...props }: BadgeProps) {
  return <div className={cn("badge", variant, className)} {...props} />;
}
```

### CSS Guidelines

- **Tailwind utility classes** for 90% of styling
- **CSS Modules** for complex component-specific styles
- **No global CSS mutations** — use `@layer utilities` for custom utilities

### File Organization

```
src/
├── app/                     # Route segments (Next.js App Router)
│   ├── (dashboard)/         # Group routes with shared layout
│   ├── courses/             # /courses route
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/
│   ├── ui/                  # shadcn/ui primitives
│   └── features/            # Domain-specific components
└── lib/
    ├── utils.ts             # cn(), formatDate(), etc.
    └── validations/         # Zod schemas
```

---

## Testing

### Testing Philosophy

- **Unit tests** for utilities, hooks, and pure functions
- **Integration tests** for API routes and data flow
- **Component tests** for UI with interaction coverage
- **E2E tests** for critical user journeys

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e
```

### Writing Tests

```typescript
import { describe, it, expect } from "vitest";
import { calculateProgress } from "./progress";

describe("calculateProgress", () => {
  it("returns 0 when total is 0", () => {
    expect(calculateProgress(0, 0)).toBe(0);
  });

  it("calculates correct percentage", () => {
    expect(calculateProgress(3, 4)).toBe(75);
  });

  it("handles completion", () => {
    expect(calculateProgress(10, 10)).toBe(100);
  });
});
```

---

## Pull Request Process

### PR Checklist

- [ ] Code follows project standards (lint passes)
- [ ] TypeScript compiles without errors
- [ ] Tests pass and new tests are added for new features
- [ ] Documentation updated (if applicable)
- [ ] Changeset added (`npx changeset`)
- [ ] Branch is up to date with main
- [ ] PR description follows template

### PR Title Format

```
<type>: <short description>

Types: feat, fix, refactor, docs, test, chore, perf, style
```

Examples:
- `feat: add AI tutor recommendation engine`
- `fix: correct timezone handling in assignment deadlines`
- `docs: update getting-started guide with Docker setup`

### PR Description Template

```markdown
## Summary
<!-- Brief description of changes -->

## Related Issues
Closes #123

## Changes
- Bullet list of changes
- Technical implementation details

## Screenshots
<!-- Before/after for UI changes -->

## Testing
- [x] Unit tests pass
- [x] E2E tests pass
- [x] Manual testing completed

## Reviewers
<!-- @mention specific reviewers -->
```

### Review Process

1. **Self-review** — Check your own PR first
2. **Automated checks** — CI must pass (lint, typecheck, test)
3. **Code review** — At least 1 approval required
4. **QA review** — For UI changes, designer review for design changes
5. **Merge** — Squash merge to main, delete branch

---

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructuring |
| `docs` | Documentation changes |
| `test` | Adding or updating tests |
| `chore` | Maintenance, deps, config |
| `perf` | Performance improvement |
| `style` | Formatting, prettier |
| `ci` | CI/CD changes |

### Scopes

| Scope | Area |
|-------|------|
| `courses` | Course management |
| `live` | Live classes |
| `tutors` | Tutor matching |
| `assignments` | Assignment system |
| `certs` | Certification engine |
| `analytics` | Analytics pipeline |
| `auth` | Authentication |
| `ui` | Shared UI components |
| `api` | API routes |
| `db` | Database schema |

### Examples

```
feat(courses): add adaptive learning path generation

Implement prerequisite graph traversal to generate personalized
learning paths based on student skill assessment.

Closes #142
```

```
fix(live): correct WebRTC reconnection on network change

Add exponential backoff to LiveKit reconnection logic to
prevent flooding the signaling server.

Fixes #89
```

---

## Project Conventions

### Import Order

1. React / Next.js
2. Third-party libraries
3. `@/components/`
4. `@/lib/`
5. `@/providers/`
6. Local imports (relative)

### Naming Conventions

| Entity | Convention | Example |
|--------|------------|---------|
| Files | kebab-case | `course-card.tsx` |
| Components | PascalCase | `CourseCard` |
| Functions | camelCase | `calculateProgress` |
| Hooks | camelCase, `use` prefix | `useDebounce` |
| Types/Interfaces | PascalCase | `CourseProps` |
| Constants | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| CSS classes | kebab-case (Tailwind) | `bg-primary-500` |

---

## Documentation

### When to Document

- New features that change user-facing behavior
- Complex business logic
- API endpoints (JSDoc)
- Architectural decisions (ADR)
- Configuration changes

### Documentation Location

- **README.md** — Project overview and setup
- **ARCHITECTURE.md** — System architecture
- **docs/** — Detailed guides for specific topics
- **Inline code comments** — Only for non-obvious logic

---

## Getting Help

| Channel | Purpose |
|---------|---------|
| GitHub Issues | Bug reports, feature requests |
| Discussions | Questions, ideas, general help |
| Discord | Real-time chat with contributors |
| Stack Overflow | Technical questions tagged `eduverse` |

---

<div align="center">
  <sub>Copyright © 2025 EDUVERSE. All rights reserved.</sub>
</div>

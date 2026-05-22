# 📚 EDUVERSE Documentation

> **Version:** 1.0.0 | Comprehensive guide to the EDUVERSE Learning Infrastructure platform

---

## Quick Navigation

| Guide | Description |
|-------|-------------|
| [🚀 Getting Started](./getting-started.md) | Setup, installation, and local development |
| [🏗️ Architecture Guide](../ARCHITECTURE.md) | System architecture and design decisions |
| [🎯 Learning Paths](./learning-paths.md) | Adaptive learning path generation |
| [📊 Student Analytics](./student-analytics.md) | Analytics pipeline, metrics, and insights |
| [🎥 Live Classes](./live-classes.md) | Real-time class architecture and setup |
| [🏆 Certification](./certification.md) | Digital credentials and badge system |
| [🎨 Design System](../DESIGN_SYSTEM.md) | UI components, colors, and patterns |
| [🔒 Security](../SECURITY.md) | Security policies and practices |
| [🤝 Contributing](../CONTRIBUTING.md) | Development workflow and standards |

---

## Platform Overview

EDUVERSE is a **learning infrastructure platform** built with modern web technologies:

- **Frontend**: Next.js 16, React 19, Tailwind CSS v4, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Real-time**: WebRTC (LiveKit), WebSockets (Supabase Realtime)
- **AI**: OpenAI, Anthropic Claude for recommendations and tutoring
- **Observability**: PostHog, Sentry, Vercel Analytics

---

## Architecture at a Glance

```
🌐 Client Layer        → Next.js App, PWA, SSG
   ↓
⚡ Edge Network        → CDN, Image Opt, Edge Functions
   ↓
⚙️ Application Layer   → RSC, API Routes, WebSocket, Auth
   ↓
🔌 Platform Services   → Course, Live, Tutor, Assignment, Cert, Analytics
   ↓
🗄️ Data Layer         → PostgreSQL, Redis, Meilisearch, S3
```

---

## Need Help?

- **Issues**: [GitHub Issues](https://github.com/eduverse/learning-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/eduverse/learning-platform/discussions)
- **Security**: [security@eduverse.com](mailto:security@eduverse.com)

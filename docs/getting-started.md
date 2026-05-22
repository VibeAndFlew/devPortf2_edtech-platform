# 🚀 Getting Started with EDUVERSE

## Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **PostgreSQL** >= 16
- **Git**

## Quick Start

```bash
# Clone the repository
git clone https://github.com/eduverse/learning-platform.git
cd learning-platform

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up the database
npx prisma generate
npx prisma db push
npx prisma db seed

# Start development
npm run dev
```

Visit **http://localhost:4006** to see the platform.

## Project Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with Turbopack on port 4006 |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript type checking |
| `npm test` | Run tests |
| `npm run test:e2e` | Run Playwright E2E tests |

## Environment Variables

See `.env.example` for the full reference. Key variables:

```
DATABASE_URL=postgresql://user:pass@localhost:5432/eduverse
AUTH_SECRET=your-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:4006
```

## Troubleshooting

**Port 4006 in use?**
```bash
npx kill-port 4006
# or use a different port
npm run dev -- -p 4007
```

**Database connection refused?**
```bash
# Ensure PostgreSQL is running
pg_isready
# Start PostgreSQL (Windows)
net start postgresql-x64-16
```

**Build errors?**
```bash
# Clear Next.js cache and node_modules
npm run clean
npm install
```

## Next Steps

- [Architecture Overview](../ARCHITECTURE.md)
- [Design System](../DESIGN_SYSTEM.md)
- [Contributing Guide](../CONTRIBUTING.md)

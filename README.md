# AutoX Workshop Scheduler (MVP Starter)

Starter backend architecture for a **workshop scheduling SaaS** (mechanics, maintenance, diagnostics), ready to push to GitHub, run locally, and evolve.

## What you get
- Node.js + Express API scaffold.
- Domain-based module structure (appointments, orders, quotes, payments).
- PostgreSQL + Redis via Docker Compose.
- SQL schema for the core domain.
- Architecture and API design docs.

## Quick start

```bash
# 1) Start infra
docker compose up -d

# 2) Run API
cd backend
npm install
npm run dev
```

API will run on `http://localhost:3000`.

## Project tree

```text
autox/
  backend/
  db/
  docs/
  docker-compose.yml
  README.md
```

## Core architecture

- **API Layer**: Express routes by bounded context.
- **Application Layer**: service handlers per module.
- **Domain Layer**: business rules (conflict checks, status transitions).
- **Data Layer**: Postgres schema (ready), repository stubs in code.
- **Async Layer**: Redis-ready queue points for reminders/notifications.

For details, see `docs/ARCHITECTURE.md`.

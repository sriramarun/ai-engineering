# Architecture

Living document. Updated as the app grows across the course. Each post that changes the architecture should update this file and add an ADR under `/docs/adr/`.

## Current state (pre-Week 1 — scaffolding only)

The repo is scaffolded. No app code yet. Week 2 initializes the Next.js app and adds real dependencies.

## Target architecture (by Week 14)

```
┌────────────────────────────────────────────────────────────────┐
│                      User (browser / mobile)                    │
└────────────────────────────────────────────────────────────────┘
                              │ HTTPS
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                   Vercel Edge (Next.js 15)                      │
│  ┌───────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │  RSC (pages)  │  │ Route Handlers│  │  Server Actions   │   │
│  └───────────────┘  └──────────────┘  └────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
       │                     │                    │
       │              ┌──────┴──────┐             │
       │              ▼             ▼             │
       │        ┌─────────┐   ┌──────────┐        │
       │        │OpenRouter│  │  Stripe  │        │
       │        │ (LLMs)   │  │(billing) │        │
       │        └─────────┘   └──────────┘        │
       │                                          │
       ▼                                          ▼
┌────────────────────────────────────────────────────────────────┐
│                          Supabase                               │
│  ┌────────┐  ┌──────────┐  ┌─────────┐  ┌──────────────────┐   │
│  │  Auth  │  │ Postgres │  │ Storage │  │ Edge Functions   │   │
│  │        │  │+pgvector │  │(uploads)│  │(background jobs) │   │
│  │        │  │  + RLS   │  │         │  │                  │   │
│  └────────┘  └──────────┘  └─────────┘  └──────────────────┘   │
└────────────────────────────────────────────────────────────────┘

Observability: Sentry (errors) · Langfuse (LLM traces) · Vercel Analytics (RUM)
```

## Key architectural decisions

Recorded as ADRs under `/docs/adr/`. Current:
- [0001](./adr/0001-record-architecture-decisions.md) — Record architecture decisions.

Planned (added as the corresponding post ships):
- Choose OpenRouter over direct provider SDKs (Week 3)
- Model router: typed abstraction over OpenRouter (Week 3)
- Zod at every LLM boundary (Week 4)
- pgvector on Supabase over external vector DB (Week 5)
- Multi-tenancy via RLS, not application-layer filtering (Week 11)
- Usage-based billing metered from OpenRouter, invoiced via Stripe (Week 12)

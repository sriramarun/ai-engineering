# Architecture

Living document. Updated as the app grows across the course. Each post that changes the architecture should update this file and add an ADR under `/docs/adr/`.

## Current state (Post 00 — scaffolding only)

The repo is scaffolded. No app code yet. Post 02 initializes the Next.js app and adds real dependencies.

## Target architecture (by Post 14)

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
- Choose OpenRouter over direct provider SDKs (Post 03)
- Model router: typed abstraction over OpenRouter (Post 03)
- Zod at every LLM boundary (Post 04)
- pgvector on Supabase over external vector DB (Post 05)
- Multi-tenancy via RLS, not application-layer filtering (Post 11)
- Usage-based billing metered from OpenRouter, invoiced via Stripe (Post 12)

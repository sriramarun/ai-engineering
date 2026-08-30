# AI Engineering Course

Learn AI Engineering by building one real, deployable, customer-facing SaaS product end to end.

Modelled on Stanford's *Startup Engineering* (Balaji Srinivasan & Vijay Pande, 2013), aligned with Andrew Ng's *AI Engineering Skills Map* (2026). Every week ends with a commit, not a concept.

## What you build: the Scholar app

**Scholar** is a document-grounded research assistant. Real users sign up, upload their documents, chat with them, get answers with inline citations, and pay for it.

You start from an empty Next.js skeleton in Week 1. By Week 14 Scholar is a running SaaS on a public URL with auth, a database, retrieval over user documents, an agentic research workflow, an eval suite gating every PR, production monitoring, Stripe billing, and a launch plan.

Everything else in this course — LLM foundations, RAG, agents, evals, production ops — is taught by building a piece of Scholar and shipping it.

## What you learn

All four pillars of Ng's Skills Map:

1. **Building & deploying AI applications** — LLM foundations, grounding with data, agentic systems, evaluation-driven development, operating in production, ML foundations
2. **Software engineering fundamentals** — applied to nondeterministic systems
3. **Using coding agents** — spec-driven work, context management, verifier loops
4. **Shaping the build** — product sense, scoping, knowing when a model is good enough to ship

## The 14 weeks

Each week is one post, one chapter, and one working artifact you can run. Posts publish bi-weekly, so the full series runs ~6.5 months; the repo is ordered by week.

### Module 1 — Foundations

**Week 1 · [What AI Engineering Is (and Isn't)](./posts/01-what-is-ai-engineering.md)**
Ng's four pillars and what separates AI engineers from ML engineers and from vibe coders. Introduces Scholar and the reasoning behind the stack. Self-assessment across the four pillars. *Artifact: fork the starter repo, push your first commit.*

**Week 2 · [Your AI Engineering Environment](./posts/02-environment-and-repo.md)**
Node + TypeScript, pnpm, a branching strategy that survives contributors, a coding agent configured for this repo, OpenRouter, Supabase, Vercel. *Artifact: a public preview URL that says hello and calls a real LLM.*

### Module 2 — LLM Foundations + Software Fundamentals

**Week 3 · [LLM Foundations via OpenRouter](./posts/03-llm-foundations.md)**
What an LLM is at the API boundary. Tokens, context windows, sampling. Structured outputs with Zod, tool calling, prompt patterns worth keeping. Model routing as a first-class concern. *Artifact: `lib/llm/router.ts` — a typed client that picks a model by task, budget, and latency, with env-driven fallbacks.*

**Week 4 · [Software Engineering Fundamentals for AI Systems](./posts/04-software-fundamentals.md)**
The cost/latency/reliability/quality/privacy tradeoff table and where each shows up in this stack. RSC vs. server actions vs. route handlers. Zod as the contract at every boundary. Testing what's nondeterministic. *Artifact: a proper module layout, Vitest, and the first typed API route.*

### Module 3 — Grounding + Coding Agents

**Week 5 · [Grounding Models with Data — RAG on Supabase](./posts/05-grounding-rag-supabase.md)**
Ingestion, chunking, embeddings, pgvector, hybrid search, reranking, context assembly, citations — and the RAG failure modes practitioners actually hit. *Artifact: document upload, an ingestion pipeline, a search route, and a chat UI streaming cited answers over a real corpus.*

**Week 6 · [Using Coding Agents Effectively](./posts/06-coding-agents.md)**
How coding agents work under the hood. Spec-driven vs. exploratory work. Context management. The verifier discipline — giving the agent a way to close its own loop with your CI. Guardrails around production data. *Artifact: a `SPEC.md`, a feature built against it, and `docs/agent-workflow.md`.*

### Module 4 — Agentic Systems + Evals

**Week 7 · [Building Agentic Systems](./posts/07-agentic-systems.md)**
Anatomy of an agentic loop: planner, executor, tools, memory, verifier. Tool design, state and memory, retries and partial failure. When a framework earns its keep. *Artifact: Scholar's retrieval becomes an agentic research workflow that plans multi-step searches and returns a report with a citation graph.*

**Week 8 · [Evaluation-Driven Development](./posts/08-evaluation-driven-development.md)**
The core AI engineering skill. Dataset + scoring function + threshold. The three eval types every app needs. Zero to fifty examples fast. LLM-as-judge vs. human grading. Error analysis as the primary iteration surface. *Artifact: `lib/evals/`, evals in CI blocking regressions, and an A/B of two models on Scholar's core task.*

### Module 5 — Production + ML Foundations

**Week 9 · [Operating in Production](./posts/09-operating-in-production.md)**
Cost control (token budgets, quotas, caching, degradation modes), latency, reliability, observability with Langfuse + Sentry + Vercel Analytics, and safety (prompt injection, output filters, PII). *Artifact: Scholar deployed on a real domain, monitored, with a runbook and a simulated incident.*

**Week 10 · [Machine Learning Foundations for the AI Engineer](./posts/10-ml-foundations.md)**
When classical ML beats an LLM, when a small fine-tuned model beats a frontier one, and the vocabulary to talk to ML engineers without pretending to be one. *Artifact: replace an expensive LLM call in Scholar's query router with a small classifier and measure the savings in the eval harness.*

### Module 6 — Product, SaaS, and Ship

**Week 11 · [Auth, Multi-Tenancy, and Data Isolation](./posts/11-auth-and-multi-tenancy.md)**
Turning Scholar from "my app" into "everyone's app." Supabase Auth, Row-Level Security that actually holds, sharing patterns, per-user rate limits, and the three mistakes that leak one tenant's data to another. *Artifact: an auth flow, a personal library behind RLS, and Playwright tests proving tenant isolation.*

**Week 12 · [Billing, Usage, and Monetization](./posts/12-billing-and-monetization.md)**
Metering AI usage per user (OpenRouter cost → Stripe invoice), pricing models that work for AI SaaS, subscriptions, usage records, webhooks, and handling abuse without punishing power users. *Artifact: Stripe wired in, features gated by tier, per-user cost tracking.*

**Week 13 · [Shaping the Build — Product Sense for AI Engineers](./posts/13-shaping-the-build.md)**
Why "the spec is the work" is more true for AI apps. Customer development for AI features. Writing a spec an agent can execute. Deciding when the model is good enough to ship. *Artifact: five real user interviews, a v2 spec, and a pruned roadmap.*

**Week 14 · [Launch, Iterate, Keep Learning](./posts/14-launch-and-learn.md)**
Getting Scholar in front of real users, instrumenting feedback that improves the app, and the rituals that keep an AI app current as models change. *Artifact: a launch, and a final self-assessment against the Skills Map showing the delta from Week 1.*

## The stack

Next.js 15 · TypeScript · Tailwind · shadcn/ui · Supabase (Auth + Postgres + pgvector + Storage + Realtime) · OpenRouter · Vercel · Stripe · Sentry + Langfuse · Vitest + Playwright · GitHub Actions

Every choice is defensible for a real product, and every one has a free tier generous enough to finish the course for under $50 in API costs.

## Start here

1. Read [SYLLABUS.md](./SYLLABUS.md) — the full map, including the stack rationale and the software-engineering concepts mapped to each week.
2. Read [docs/concept-map.md](./docs/concept-map.md) — every AI concept in the course, in plain terms, mapped to the part of Scholar that teaches it.
3. Read [Week 1](./posts/01-what-is-ai-engineering.md).
4. Fork this repo and follow along. By Week 14 you'll have a deployed SaaS.

## Contributing

This is open source. See [CONTRIBUTING.md](./CONTRIBUTING.md). Small fixes go straight in; new posts, major rewrites, and stack substitutions go through the process in that doc.

## License

- Prose (posts, docs): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Code (repo, examples, tests): [MIT](./LICENSE)

See [LICENSE](./LICENSE) for the combined notice.

## Status

The course is being written in public. See [CHANGELOG.md](./CHANGELOG.md) for what's shipped and [SYLLABUS.md](./SYLLABUS.md) for what's coming.

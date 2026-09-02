# AI Engineering Course

Learn AI engineering by building one real, deployable, customer-facing SaaS product end to end — with **Claude Code** as your pair, and the **Claude Certified Architect – Foundations** domains as a second spine.

Modelled on Stanford's *Startup Engineering* (2013), aligned with Andrew Ng's *AI Engineering Skills Map* (2026), and sharpened by Stanford's *CS146S: The Modern Software Developer* (2025). Every week ends with a commit, not a concept.

## What you build: the Scholar app

**Scholar** is a document-grounded research assistant. Real users sign up, upload their documents, chat with them, get answers with inline citations, and pay for it.

You start from an empty Next.js skeleton in Week 1. By Week 14 Scholar is a running SaaS on a public URL with auth, a database, retrieval over user documents, an agentic research workflow, its own MCP server, an eval suite gating every PR, production monitoring, Stripe billing, and a launch plan.

Everything else in this course — model foundations, RAG, agents, evals, production ops — is taught by building a piece of Scholar and shipping it.

## What you learn

All four pillars of Ng's Skills Map — building and deploying AI applications, software engineering fundamentals, using coding agents, and shaping the build — organised so that the five [CCAR-F certification domains](./SYLLABUS.md#certification-alignment-ccar-f) each land in specific weeks.

## Before Week 1

**[Week 0 · Set Up Claude Code](./posts/00-setup-claude-code.md)** — install, sign in, write your `CLAUDE.md`, learn plan mode and the permission model, and the habits that keep the bill sane. This course is single-agent by design: the concepts transfer to other tools, the commands don't.

## The 14 weeks

Each week is one post, one chapter, and one working artifact you can run. Posts publish bi-weekly, so the full series runs ~6.5 months; the repo is ordered by week.

### Module 1 — Foundations

**Week 1 · [What AI Engineering Is (and Isn't)](./posts/01-what-is-ai-engineering.md)**
The four pillars, what separates AI engineers from ML engineers and from vibe coders, and how the certification domains map onto them. Introduces Scholar and the stack. *Artifact: fork the repo, push your first commit.*

**Week 2 · [Your AI Engineering Environment](./posts/02-environment-and-repo.md)**
Node + TypeScript, pnpm, a branching strategy that survives contributors, an Anthropic API key, Supabase, Vercel. *Artifact: a public preview URL that streams a real answer.*

### Module 2 — Model Foundations + Software Fundamentals

**Week 3 · [Claude API Foundations](./posts/03-claude-api-foundations.md)**
Tokens, context windows, and the context budget. Structured outputs with Zod. Tool use. Adaptive thinking and the effort dial. Prompt caching as architecture. Choosing a model per task. *Artifact: `lib/llm/` — a typed client with a model policy, a cached prefix, and schema-validated output.*

**Week 4 · [Software Engineering Fundamentals for AI Systems](./posts/04-software-fundamentals.md)**
The cost/latency/reliability/quality/privacy tradeoff. Zod at every boundary. Testing what's nondeterministic. Static analysis on agent-written code with Semgrep. *Artifact: a proper module layout, Vitest, a typed API route, and three real Semgrep findings fixed in CI.*

### Module 3 — Grounding + Agent-Native Development

**Week 5 · [Grounding Models with Data — RAG on Supabase](./posts/05-grounding-rag-supabase.md)**
Ingestion, chunking, embeddings, pgvector, hybrid search, reranking, citations — and the RAG failure modes practitioners actually hit. *Artifact: upload → ingest → search → cited chat over a real corpus.*

**Week 6 · [Working with Claude Code](./posts/06-working-with-claude-code.md)**
Context engineering, plan mode and permissions, subagents, hooks, spec-first development, the verifier loop, delegating long work, and defensive prompting against the four context failure modes. *Artifact: a `SPEC.md`, the feature built from it, a hook that blocks failing commits, and `docs/agent-workflow.md`.*

**Week 7 · [Extending Your Agent — MCP Servers and Skills](./posts/07-mcp-and-skills.md)**
What MCP is, tools vs. resources vs. prompts, designing a tool an agent can use well, transports and authorization, skills as packaged capability. *Artifact: an MCP server exposing Scholar's eval harness and schema, so your agent can run your evals itself.*

### Module 4 — Agents + Evals

**Week 8 · [Building Agentic Systems](./posts/08-agentic-systems.md)**
Planner, executor, tools, memory, verifier. Tool design, state, compaction, loop budgets, multi-agent orchestration, and when the Claude Agent SDK is the right harness. *Artifact: an agentic research workflow that verifies its own citations and returns a citation graph.*

**Week 9 · [Evaluation-Driven Development](./posts/09-evaluation-driven-development.md)**
Dataset, scoring function, threshold. Fifty examples fast. LLM-as-judge and validating the judge. Regression gates. Error analysis. *Artifact: `lib/evals/` blocking bad PRs, and an A/B of two models on Scholar's core task.*

### Module 5 — Review + Production

**Week 10 · [Reviewing AI-Written Code](./posts/10-reviewing-ai-written-code.md)**
Reviewing code you didn't write, at the rate an agent writes it. The review hierarchy, reading for intent, where AI review helps and where it's confident noise. *Artifact: one feature built from a single prompt, reviewed by you and by an agent, with the difference written up.*

**Week 11 · [Operating in Production](./posts/11-operating-in-production.md)**
Prompt caching and the effort dial as cost levers, latency, reliability, observability, prompt injection and PII, an agent-readable runbook — and when a small classifier beats a model call. *Artifact: Scholar on a real domain, monitored, with a simulated incident.*

### Module 6 — Product, SaaS, and Ship

**Week 12 · [Auth, Multi-Tenancy, and Data Isolation](./posts/12-auth-and-multi-tenancy.md)**
Supabase Auth, Row-Level Security that holds, sharing patterns, rate limits, and the three mistakes that leak one tenant's data to another. *Artifact: auth, a personal library behind RLS, and Playwright tests proving isolation.*

**Week 13 · [Billing, Usage, and Monetization](./posts/13-billing-and-monetization.md)**
Metering token cost per user, pricing models for AI SaaS, Stripe subscriptions and webhooks, handling abuse. *Artifact: Stripe wired in, tiers gating features, per-user cost that reconciles against the real bill.*

**Week 14 · [Shaping the Build, and Launching](./posts/14-shaping-and-launching.md)**
Why the spec is the work. Customer development. Deciding "good enough to ship" with a number. Then launch, feedback instrumentation, and the rituals that keep an AI app current. *Artifact: five interviews, a v2 spec, a launch, and the self-assessment delta from Week 1.*

## The stack

Next.js 15 · TypeScript · Tailwind · shadcn/ui · Supabase (Auth + Postgres + pgvector + Storage) · Anthropic API · Claude Code · MCP · Vercel · Stripe · Semgrep · Sentry + Langfuse · Vitest + Playwright · GitHub Actions

Full rationale in [SYLLABUS.md](./SYLLABUS.md). Claude Code is a paid tool — the course says so up front rather than building on a free tier that can be withdrawn.

## Start here

1. Read [SYLLABUS.md](./SYLLABUS.md) — the full map, the stack rationale, the certification alignment, and what this course took from CS146S.
2. Read [docs/concept-map.md](./docs/concept-map.md) — every concept in the course, in plain terms, mapped to the part of Scholar that teaches it.
3. Do [Week 0](./posts/00-setup-claude-code.md), then read [Week 1](./posts/01-what-is-ai-engineering.md).
4. Fork this repo and follow along. By Week 14 you'll have a deployed SaaS.

## Contributing

This is open source. See [CONTRIBUTING.md](./CONTRIBUTING.md). Small fixes go straight in; new weeks, major rewrites, and stack substitutions go through the process in that doc.

## License

- Prose (posts, docs): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Code (repo, examples, tests): [MIT](./LICENSE)

## Status

The course is being written in public. See [CHANGELOG.md](./CHANGELOG.md) for what's shipped and [SYLLABUS.md](./SYLLABUS.md) for what's coming.

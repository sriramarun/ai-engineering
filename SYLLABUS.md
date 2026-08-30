# AI Engineering Course — Syllabus

A 14-week, bi-weekly, open-source blog series that teaches AI Engineering by building **one real, deployable, customer-facing SaaS product** end-to-end. Modelled on Stanford's Startup Engineering course (Balaji Srinivasan & Vijay Pande, 2013), where every student shipped a real webapp.

**The through-line project:** *Scholar* — a document-grounded research assistant that real users can sign up for, upload their documents to, chat with, and pay for. By Week 14 the reader has a running SaaS on a public URL, with auth, a database, billing, evals, monitoring, and a launch plan.

**Anchor material.** Andrew Ng's *AI Engineering Skills Map* (Aug 2026): four pillars — Building and Deploying AI Applications, Software Engineering Fundamentals, Using Coding Agents, Shaping the Build — with pillar 1 expanded into six sub-skills (LLM foundations, grounding with data, agentic systems, evaluation-driven development, operating in production, ML foundations).

**Structural model.** Stanford Startup Engineering: bundle a business/strategic lens with a technical skill in each installment; students build a real product across the course. This series adapts that shape one-to-one, extended to fourteen bi-weekly installments so the SaaS scope is honest.

---

## The stack (decided)

| Layer | Choice | Why |
|---|---|---|
| Runtime | Node.js + TypeScript | Same language front-to-back; type safety matters more in AI apps than most people admit |
| Framework | Next.js 15 (App Router) | RSC + streaming + edge in one framework; deploys cleanly to Vercel |
| UI | React + Tailwind + shadcn/ui | Ubiquitous, easy to copy-paste-adapt, honest defaults |
| Model access | **OpenRouter** | One API, every frontier + open model, pay-as-you-go, easy to A/B models |
| Auth | Supabase Auth | Free tier is enough; RLS integrates with the DB |
| Database | Supabase Postgres | Includes pgvector for embeddings; one system instead of Postgres + Pinecone |
| Storage | Supabase Storage | User uploads (PDFs, docs); same billing surface |
| Realtime | Supabase Realtime | Streaming chat responses, presence, background job status |
| Deployment | Vercel | Zero-config Next.js; edge functions where they matter |
| Observability | Vercel Analytics + Sentry + Langfuse | App metrics, errors, LLM traces — three tools, one dashboard each |
| Payments | Stripe | Usage-based billing on top of OpenRouter's own metering |
| Validation | Zod | Runtime schema validation for LLM outputs, forms, API boundaries |
| Testing | Vitest + Playwright + custom evals harness | Unit + E2E + AI-specific |
| CI/CD | GitHub Actions | Free, integrates with Vercel previews |

Every choice is defensible for a real product. Every one has a generous free tier so a reader can complete the whole course for under $50 in API costs.

---

## Repo layout

```
scholar/                              The course-long project repo
├── README.md
├── SYLLABUS.md                       The 14-week map
├── LICENSE                           CC BY-SA 4.0 (prose) + MIT (code)
├── CONTRIBUTING.md
├── CHANGELOG.md
├── glossary.md
├── posts/
│   ├── 01-what-is-ai-engineering.md
│   ├── 02-environment-and-repo.md
│   ├── 03-llm-foundations.md
│   ├── ...
│   └── 14-launch-and-learn.md
├── app/                              Next.js App Router
│   ├── (marketing)/
│   ├── (auth)/
│   ├── (app)/                        The signed-in product
│   └── api/
├── components/                       React components (shadcn-based)
├── lib/
│   ├── llm/                          OpenRouter client, model router, prompt registry
│   ├── retrieval/                    Chunking, embeddings, search
│   ├── agents/                       Agent loops, tools, verifiers
│   └── evals/                        Eval harness, datasets, judges
├── supabase/
│   ├── migrations/                   SQL migrations, versioned
│   ├── seed.sql
│   └── functions/                    Edge functions where needed
├── tests/
│   ├── unit/
│   ├── e2e/                          Playwright
│   └── evals/                        Model + prompt evals
├── .github/workflows/                CI: lint, typecheck, test, evals-on-PR
└── docs/
    ├── architecture.md               Living architecture doc
    ├── runbook.md                    On-call playbook
    └── adr/                          Architecture decision records
```

The reader's own repo grows to look exactly like this by Week 14. Each week adds specific files and commits, referenced by path.

---

## The 14 weeks

Each week is one post, one chapter, and one working artifact. Posts publish bi-weekly, so the full series runs ~6.5 calendar months; the repo is ordered by week.

### Module 1 — Foundations (Weeks 1–2)

**Week 1. What AI Engineering Is (and Isn't) — Reading the Skills Map**
*Mental model + course intro.* Ng's four pillars, what each contains, what separates AI engineers from ML engineers and from "vibe coders." Introduces Scholar — the SaaS the reader will build — and the reasoning behind the stack. Self-assessment across the four pillars. Ends with the reader forking a starter repo (empty Next.js + Supabase + OpenRouter skeleton) and pushing their first commit.

**Week 2. Your AI Engineering Environment**
*Technical setup.* Node + TypeScript, `pnpm`, Git and a branching strategy that scales past one contributor, a coding agent (Claude Code / Cursor) with sensible defaults for this repo, OpenRouter account and key, Supabase project, Vercel project linked to the repo. First "hello LLM" call via OpenRouter, first Supabase migration, first Vercel preview deploy. Reader ends the post with a public preview URL that says "hello world" and calls a real LLM.

### Module 2 — LLM Foundations + Software Fundamentals (Weeks 3–4)

**Week 3. LLM Foundations via OpenRouter**
*Mental model.* What an LLM is at the API boundary. Tokens, context windows, sampling parameters. Structured outputs (Zod schemas + OpenRouter's JSON mode). Tool calling. System vs. user prompts. Named prompt patterns worth using and the ones not. Model routing as a first-class concern — OpenRouter's fallback ordering, cost/latency tradeoffs across frontier + open models. Reader builds `lib/llm/router.ts`: a typed client that picks a model based on task, budget, and latency needs, with a `.env`-driven fallback list.

**Week 4. Software Engineering Fundamentals for AI Systems**
*Technical.* Ng's Pillar 2, applied to a real AI app. The tradeoff table (cost, latency, reliability, quality, privacy) and where each shows up in this stack. Next.js RSC vs. server actions vs. route handlers — when each is right. TypeScript discipline for LLM I/O. Zod as the contract at every boundary. Testing what's nondeterministic (snapshot the deterministic parts, evaluate the rest). Logging and structured error handling from day one. Reader refactors the project into a proper module layout, adds Vitest, adds a first typed API route.

### Module 3 — Grounding + Coding Agents (Weeks 5–6)

**Week 5. Grounding Models with Data — RAG on Supabase**
*Mental model + build.* Why grounding matters (hallucination, freshness, private data, provenance). The retrieval stack: document ingestion, chunking strategies, embedding models via OpenRouter, storing vectors in pgvector on Supabase, hybrid search (BM25 + vector), reranking, context assembly, source citation. The RAG failure modes practitioners actually hit. Reader adds document upload (Supabase Storage), an ingestion pipeline (background job via Supabase Edge Function), a `search` route, and a chat UI that streams answers with inline citations over a real corpus.

**Week 6. Using Coding Agents Effectively**
*Technical craft.* Ng's Pillar 3. Mental model for how coding agents work under the hood. Spec-driven vs. exploratory work. Context management (what to load, what to keep out, when to compact). The verifier discipline: giving the agent a way to close its own loop with your CI. Multi-agent orchestration patterns. Guardrails that stop an agent from touching your Supabase production data. Reader adds a `SPEC.md` for the next feature, uses a coding agent to implement it against the spec, and captures the workflow in `docs/agent-workflow.md`.

### Module 4 — Agentic Systems + Evals (Weeks 7–8)

**Week 7. Building Agentic Systems**
*Mental model + build.* Agents as a computing paradigm. Anatomy of an agentic loop: planner, executor, tools, memory, verifier. Tool design — what makes a tool an agent can use well. State and memory patterns. Long-running work, retries, partial failure. When a framework (LangGraph, Mastra, custom) earns its keep and when it doesn't. Reader upgrades Scholar's retrieval into an agentic research workflow: the agent plans a multi-step search, calls tools (search, read-page, summarize, cite), and returns a research report with a citation graph.

**Week 8. Evaluation-Driven Development**
*Technical discipline — the core AI engineering skill.* What an eval is (dataset + scoring function + threshold). The three types every app needs (unit-style, task-level, end-to-end). Building an eval dataset from zero to fifty examples fast. Human-graded vs. LLM-as-judge. Regression testing across model versions and prompt changes. Error analysis loops as the primary iteration surface. Reader builds `lib/evals/`, wires evals into GitHub Actions so PRs are blocked by regression, and uses them to A/B two OpenRouter models on Scholar's core task.

### Module 5 — Production + ML Foundations (Weeks 9–10)

**Week 9. Operating in Production**
*Technical + operational.* What changes the moment a real user shows up. Cost control (token budgets per request, per-user quotas, caching, model routing, degradation modes). Latency (streaming, edge functions, prefetching). Reliability (retries, fallbacks, circuit breakers, OpenRouter provider redundancy). Observability with Langfuse for LLM traces + Sentry for app errors + Vercel Analytics for RUM. Safety (prompt-injection defenses, output filters, PII handling). A one-page runbook (`docs/runbook.md`). Reader deploys Scholar to production behind a real domain, wires monitoring, and simulates an incident.

**Week 10. Machine Learning Foundations for the AI Engineer**
*Mental model.* Ng's ML sub-skill, in perspective. When classical ML beats an LLM (structured data, latency budgets, cost, interpretability). When a small fine-tuned model beats a frontier one. Vocabulary you need to talk to ML engineers without pretending to be one. What fine-tuning actually costs and when it earns its keep. Worked example: replacing an expensive LLM call in Scholar's query router with a small classifier, and measuring the savings via the eval harness.

### Module 6 — Product, SaaS, and Ship (Weeks 11–14)

**Week 11. Auth, Multi-Tenancy, and Data Isolation**
*Technical + security.* Turning Scholar from "my app" into "everyone's app." Supabase Auth (email, OAuth, magic link). Row-Level Security policies that make multi-tenant data actually safe. Sharing patterns (personal libraries vs. team workspaces). Rate limiting per user. The three specific mistakes that leak one user's data to another and how to catch them in tests. Reader ships an auth flow, a personal-library data model behind RLS, and Playwright tests that prove tenant isolation.

**Week 12. Billing, Usage, and Monetization**
*Technical + product.* Metering AI usage per user (OpenRouter cost → Stripe invoice). Pricing models that work for AI SaaS (free tier + credit packs, subscription with monthly quota, hybrid). Stripe integration (subscriptions, usage records, webhooks, portal). Handling abuse without breaking legitimate power users. Reader wires Stripe, gates features behind subscription tiers, and instruments per-user cost tracking.

**Week 13. Shaping the Build — Product Sense for AI Engineers**
*Mental model.* Ng's Pillar 4. Why "the spec is the work" is more true for AI apps than for traditional software. Customer development for AI features. Writing a spec a coding agent can execute against. Deciding what belongs in v1 and what doesn't. Deciding when the model is good enough to ship. The judgment call every AI engineer eventually has to make. Reader interviews five real potential users, writes a v2 spec for Scholar based on what they heard, and prunes their roadmap accordingly.

**Week 14. Launch, Iterate, Keep Learning**
*Closing post.* Getting Scholar in front of real users (Product Hunt, Show HN, or a targeted community launch). Instrumenting for feedback that actually improves the app. Weekly and monthly rituals to keep an AI app current as models, tools, and best practices change. Closing the loop: the ongoing repo, the changelog, the contribution guide, the reading list of primary sources. Final self-assessment against the Skills Map so the reader can see the delta from Week 1.

---

## Software engineering concepts covered (mapped to weeks)

| Concept | Where |
|---|---|
| Git + branching + PR workflow | Week 2 |
| TypeScript + Zod as boundary contracts | Week 4 |
| Next.js architecture (RSC, server actions, route handlers) | Week 4 |
| Unit + integration + E2E testing | Week 4, 11 |
| Database design + migrations | Week 5, 11 |
| Vector search + pgvector | Week 5 |
| Background jobs + edge functions | Week 5 |
| Streaming + realtime | Week 5, 7, 9 |
| Coding-agent workflows + spec-driven dev | Week 6 |
| CI/CD (GitHub Actions) + evals-as-tests | Week 8 |
| Cost + latency + reliability engineering | Week 9 |
| Observability (traces, metrics, errors) | Week 9 |
| Security (secrets, prompt injection, PII) | Week 9, 11 |
| Auth + Row-Level Security + multi-tenancy | Week 11 |
| Payments + subscription billing + metering | Week 12 |
| Product discovery + customer development | Week 13 |
| Launch mechanics + growth instrumentation | Week 14 |

---

## Design principles for every week

**One artifact per week.** Every week ends with a commit, a merged PR, or a deployed change to Scholar. Nothing is theoretical.

**Progressive project.** Weeks 2–14 accumulate into one running SaaS. The reader can stop at any week and have a working thing at that level of maturity.

**Named patterns, reused.** Names that recur across weeks and become vocabulary: *the Eval Harness*, *the Context Budget*, *the Model Router*, *the Verifier Loop*, *the Spec-First Workflow*, *the Runbook*.

**One diagram per week, maintained as source.** SVG or Mermaid, in `/docs/diagrams/`, so updates travel with the text. Diagrams that recur: the Skills Map, the agentic loop, the RAG pipeline, the evals loop, the tenant-isolation model.

**Two-audience layering.** Each week works for (a) a developer who has never touched an LLM API and (b) a senior engineer who has shipped LLM features but not systematically. `> If you already know X, skip to Y` callouts serve both.

**Free tier honest.** A reader with $50 in OpenRouter credit should be able to complete the entire course, including production deployment. Every week that spends money says how much, on which model, and what could be cheaper.

---

## Cadence

One post per course week, published bi-weekly: **28 calendar weeks, ~6.5 months** end to end. Post length target: **2,500–3,500 words**, higher than the banking series because these include code, diagrams, and repo changes. Hard cap at 4,000 to prevent sprawl — anything longer splits into two posts.

Publication rhythm: post drops Tuesday morning, companion PR merged into the public repo the same day, discussion thread pinned for a week.

---

## Contribution model

**License.** CC BY-SA 4.0 for prose. MIT for code. Both in `LICENSE` and post frontmatter.

**PR workflow.** Every post has `Last reviewed:` in frontmatter. Stale-post GitHub Action flags posts unreviewed in 6 months with a banner. Contributors update the date when they touch a post.

**Maintainer notes.** Each post ends with an "Open questions" section — things the current author is unsure about or expects to change fastest. Makes PRs easier to invite.

**Changelog discipline.** `CHANGELOG.md` tracks post-level changes (new post, major rewrite, model or tool substitution). Typo fixes don't need entries.

**Issues as the queue.** Anything that should exist but doesn't (a Week 15 post on multi-modal, a deeper cut on RAG evals, translations) lives as a labeled GitHub issue.

**Model + provider drift.** The stack changes. When OpenRouter's default model list moves, when Supabase ships a new primitive, when Next.js changes an API — those are `CHANGELOG` entries and PRs, not new posts. This is the discipline that keeps a course useful two years after it launches.

---

## On the "customer app" question — yes, this is the right move

Three reasons:

**It forces the engineering.** Auth, multi-tenancy, billing, incident response, rate limiting, PII handling — none of these are optional in a real product, and none of them show up in a demo. Building the customer version means every software engineering concept has a real place to land, not an artificial one.

**It's what Ng's Pillar 4 actually looks like.** "Shaping the build" is not a mental exercise; it's product decisions made under real constraints. The reader who has done customer interviews and priced their own service understands Pillar 4 at a level someone who hasn't cannot fake.

**It matches Stanford's original ethos.** Balaji and Vijay's students shipped real webapps. The course was famous specifically because the deliverable was public and usable. The AI-engineering equivalent should hold the same bar.

**The honest tradeoffs:**

Scope is bigger. Each week has to cover more ground. That's why the plan grew from 12 to 14 weeks — Modules 1–5 stay the same shape, Module 6 expands from 2 to 4 weeks to give auth, billing, product sense, and launch the room they need.

Not every reader will follow through to launch. The design assumption is that a reader who stops after Week 10 still has a working, deployed, single-tenant version of Scholar — the customer-app parts (auth, billing, launch) are additive. This is deliberate. The customer-app arc is the strongest version of the course for readers who go all the way, without punishing readers who don't.

Two decisions I'd still like your call on before drafting Week 1:

**One.** Does *Scholar* land as the product name for the course, or do you want a different working name? (It can change later without cost; the repo name is what matters, and `scholar` is fine.)

**Two.** Is Week 1's target reader "a working developer with no LLM experience" or "a working developer who has shipped LLM features but not systematically"? The plan works for both, but the *hook* of Week 1 is written differently depending on which is primary.

Once those two are set, Week 1 and Week 2 draft cleanly and the repo scaffolding (README, SYLLABUS, LICENSE, CONTRIBUTING, starter Next.js app) can be built in parallel.

# AI Engineering Course — Syllabus

A 14-week, bi-weekly, open-source course that teaches AI engineering by building **one real, deployable, customer-facing SaaS product** end to end. Modelled on Stanford's *Startup Engineering* (Balaji Srinivasan & Vijay Pande, 2013), where every student shipped a real webapp, and sharpened by Stanford's *CS146S: The Modern Software Developer* (Mihail Eric, 2025), which established that working with coding agents is itself a curriculum.

**The through-line project:** *Scholar* — a document-grounded research assistant that real users can sign up for, upload their documents to, chat with, and pay for. By Week 14 the reader has a running SaaS on a public URL, with auth, a database, billing, evals, monitoring, and a launch plan.

**Two anchors.** Andrew Ng's *AI Engineering Skills Map* (2026) supplies the four pillars: building and deploying AI applications, software engineering fundamentals, using coding agents, and shaping the build. Anthropic's **Claude Certified Architect – Foundations (CCAR-F)** supplies a second, more concrete spine — agentic architecture, Claude Code workflows, prompt engineering and structured output, tool design and MCP, context management and reliability. The two overlap more than they diverge; where they differ, the certification is the more specific of the two and the course follows it.

**One agent, on purpose.** This course uses **Claude Code** throughout, set up in [Week 0](./posts/00-setup-claude-code.md). A course that hedges across four agents teaches none of them well. The ideas transfer; the commands don't, and the posts say so rather than caveating every week.

---

## The stack (decided)

| Layer | Choice | Why |
|---|---|---|
| Runtime | Node.js + TypeScript | Same language front-to-back; type safety matters more in AI apps than most people admit |
| Framework | Next.js 15 (App Router) | RSC + streaming + edge in one framework; deploys cleanly to Vercel |
| UI | React + Tailwind + shadcn/ui | Ubiquitous, easy to copy-paste-adapt, honest defaults |
| Model access | **Anthropic API** (`@anthropic-ai/sdk`) | Structured outputs, tool use, prompt caching, and the effort dial are all first-class; matches what the certification examines |
| Second provider | OpenRouter | Kept for one job: the Week 9 A/B across model families, and as an honest fallback path |
| Coding agent | **Claude Code** | Taught directly in Weeks 6, 7, and 10 |
| Auth | Supabase Auth | Free tier is enough; RLS integrates with the DB |
| Database | Supabase Postgres | Includes pgvector for embeddings; one system instead of Postgres + a vector DB |
| Storage | Supabase Storage | User uploads; same billing surface |
| Deployment | Vercel | Zero-config Next.js; edge functions where they matter |
| Observability | Vercel Analytics + Sentry + Langfuse | App metrics, errors, model traces |
| Security scanning | Semgrep | Static analysis on agent-written code, in CI from Week 4 |
| Payments | Stripe | Usage-based billing on top of token metering |
| Validation | Zod | Runtime schema validation for model outputs, forms, API boundaries |
| Testing | Vitest + Playwright + a custom evals harness | Unit + E2E + AI-specific |
| CI/CD | GitHub Actions | Free, integrates with Vercel previews |

Every choice is defensible for a real product. The reader can complete the course for well under $100 of model spend, most of it in Weeks 5, 8, and 9.

---

## Repo layout

```
ai-engineering/                       The course repo; the app inside it is Scholar
├── README.md
├── SYLLABUS.md                       The 14-week map
├── CLAUDE.md                         Agent context — written in Week 0
├── LICENSE                           CC BY-SA 4.0 (prose) + MIT (code)
├── CONTRIBUTING.md
├── CHANGELOG.md
├── glossary.md
├── posts/
│   ├── 00-setup-claude-code.md
│   ├── 01-what-is-ai-engineering.md
│   └── ...                           through 14
├── app/                              Next.js App Router
│   ├── (marketing)/  (auth)/  (app)/
│   └── api/
├── components/
├── lib/
│   ├── llm/                          Claude client, model policy, prompt registry
│   ├── retrieval/                    Chunking, embeddings, search
│   ├── agents/                       Agent loops, tools, verifiers
│   └── evals/                        Eval harness, datasets, judges
├── mcp/                              Scholar's own MCP server — built in Week 7
├── supabase/
│   ├── migrations/  seed.sql  functions/
├── tests/
│   ├── unit/  e2e/  evals/
├── .claude/                          Slash commands, subagents, hooks — Week 6
├── .github/workflows/                CI: lint, typecheck, test, semgrep, evals-on-PR
└── docs/
    ├── concept-map.md                Concepts → where they land in Scholar
    ├── architecture.md               Living architecture doc
    ├── agent-workflow.md             How this repo is built with an agent — Week 6
    ├── runbook.md                    On-call playbook, agent-readable — Week 11
    ├── screenshots/
    └── adr/                          Architecture decision records
```

The reader's own repo grows to look exactly like this by Week 14. Each week adds specific files and commits, referenced by path.

---

## The 14 weeks

Each week is one post, one chapter, and one working artifact. Posts publish bi-weekly, so the full series runs ~6.5 calendar months; the repo is ordered by week.

**[Week 0. Set Up Claude Code](./posts/00-setup-claude-code.md)** — *Setup, not a course week.* Install, sign in, write `CLAUDE.md`, learn plan mode and the permission model, and the habits that keep the bill sane. Do this before Week 1.

### Module 1 — Foundations (Weeks 1–2)

**Week 1. What AI Engineering Is (and Isn't) — Reading the Skills Map**
*Mental model + course intro.* The four pillars, what separates AI engineers from ML engineers and from vibe coders, and how the certification domains map onto them. Introduces Scholar and the reasoning behind the stack. Self-assessment across the four pillars, redone in Week 14. Ends with the reader forking the repo and pushing a first commit.

**Week 2. Your AI Engineering Environment**
*Technical setup.* Node + TypeScript, pnpm, a branching strategy that scales past one contributor, an Anthropic API key, a Supabase project, a Vercel project linked to the repo. First streamed model call through a route handler, first migration, first preview deploy. Reader ends the week with a public URL that streams a real answer.

### Module 2 — Model Foundations + Software Fundamentals (Weeks 3–4)

**Week 3. Claude API Foundations**
*Mental model.* What a model is at the API boundary. Tokens, context windows, and the context budget as a number your code enforces. Structured outputs via `output_config.format` and Zod. Tool use. Adaptive thinking and the effort dial. Prompt caching treated as architecture — what goes in the stable prefix and what must come after it. Choosing between Opus, Sonnet, and Haiku per task rather than globally. Reader builds `lib/llm/`: a typed client with a per-task model policy, a cached system prefix, and schema-validated output.

**Week 4. Software Engineering Fundamentals for AI Systems**
*Technical.* The tradeoff table — cost, latency, reliability, quality, privacy — and where each lands in this stack. RSC vs. server actions vs. route handlers. Zod as the contract at every boundary. Testing what's nondeterministic: snapshot the deterministic parts, evaluate the rest. Structured logging from day one. And static analysis on agent-written code with Semgrep, which catches a category review reliably misses. Reader refactors into a proper module layout, adds Vitest, adds a typed API route, and fixes three real Semgrep findings in CI.

### Module 3 — Grounding + Agent-Native Development (Weeks 5–7)

**Week 5. Grounding Models with Data — RAG on Supabase**
*Mental model + build.* Why grounding matters. Ingestion, chunking strategies, embeddings, pgvector, hybrid search, reranking, context assembly, citations. The RAG failure modes practitioners actually hit, each of which becomes an eval case in Week 9. Reader adds upload, an ingestion pipeline, a search route, and a chat UI that streams cited answers over a real corpus.

**Week 6. Working with Claude Code**
*Technical craft.* How the agent loop works. `CLAUDE.md` and context engineering — what to load, what to keep out, when to compact. Plan mode and permission modes as risk controls. Subagents for parallel work. Hooks that enforce your conventions mechanically. Spec-first development. The verifier loop: giving the agent a way to close its own loop with your CI. Delegating work worth handing over whole. Defensive prompting, and the four context failure modes — poisoning, distraction, confusion, clash. Reader writes a `SPEC.md`, builds the feature against it, adds a hook that blocks commits failing typecheck, and documents the workflow.

**Week 7. Extending Your Agent — MCP Servers and Skills**
*Build.* What MCP is and why a protocol beat bespoke integrations. Tools, resources, and prompts. Designing a tool an agent can use well — naming, typed parameters, honest errors, and what belongs in the description. Transports and the authorization spec. Skills as packaged, reusable capability. Reader builds an MCP server exposing Scholar's eval harness and database schema, so the agent can run the evals and read the migrations without being handed anything.

### Module 4 — Agents + Evals (Weeks 8–9)

**Week 8. Building Agentic Systems**
*Mental model + build.* Agents as a computing paradigm. Anatomy of the loop: planner, executor, tools, memory, verifier. Tool design for production. State, memory, compaction. Long-running work, retries, partial failure, loop budgets. Multi-agent orchestration and when a second agent earns its cost. When the Claude Agent SDK is the right harness and when a plain tool loop is enough. Reader upgrades Scholar's retrieval into an agentic research workflow that plans a multi-step search, verifies its own citations, and returns a report with a citation graph.

**Week 9. Evaluation-Driven Development**
*The core discipline.* What an eval is: dataset, scoring function, threshold. The three types every app needs. Zero to fifty examples fast. Human-graded vs. LLM-as-judge, and validating the judge against human scores. Regression testing across model and prompt changes. Error analysis as the primary iteration surface. Reader builds `lib/evals/`, wires it into CI so pull requests are blocked by regression, and A/Bs two models on Scholar's core task.

### Module 5 — Review + Production (Weeks 10–11)

**Week 10. Reviewing AI-Written Code**
*Technical discipline.* How do you review code you didn't write, at the rate an agent produces it? The review hierarchy: what only a human catches, what an agent catches better, what a linter should have caught first. Reading a diff for intent rather than syntax. Where AI review helps and where it produces confident noise. PR discipline that survives agent-authored change. Reader implements one feature from a single prompt, reviews it line by line, has an agent review it too, and writes up the difference in the PR.

**Week 11. Operating in Production**
*Technical + operational.* What changes the moment a real user shows up. Cost control: prompt caching, the effort dial, per-user quotas, model routing, degradation modes. Latency: streaming, edge, prefetching. Reliability: retries, fallbacks, circuit breakers. Observability with Langfuse for model traces, Sentry for app errors, Vercel Analytics for real-user metrics. Safety: prompt injection, output filters, PII handling. A runbook an agent can execute. And the ML question in its proper place — when a small classifier beats a model call, proven with the eval harness rather than asserted. Reader deploys Scholar to a real domain, wires monitoring, and simulates an incident.

### Module 6 — Product, SaaS, and Ship (Weeks 12–14)

**Week 12. Auth, Multi-Tenancy, and Data Isolation**
*Technical + security.* Turning Scholar from "my app" into "everyone's app." Supabase Auth. Row-Level Security that actually holds. Sharing patterns. Per-user rate limits. The three mistakes that leak one tenant's data to another and how to catch them in tests. Reader ships an auth flow, a personal library behind RLS, and Playwright tests proving tenant isolation.

**Week 13. Billing, Usage, and Monetization**
*Technical + product.* Metering model usage per user — token cost to invoice. Pricing models that work for AI SaaS. Stripe subscriptions, usage records, webhooks, portal. Handling abuse without punishing power users. Reader wires Stripe, gates features by tier, and tracks per-user cost that reconciles against the real bill.

**Week 14. Shaping the Build, and Launching**
*Closing week.* Why "the spec is the work" is more true for AI apps. Customer development for AI features. Writing a spec an agent can execute. Deciding when the model is good enough to ship — with a number from the eval suite, not a feeling. Then getting Scholar in front of real users, instrumenting feedback that improves the app, and the rituals that keep it current as models change. Final self-assessment against the Skills Map, showing the delta from Week 1.

---

## Certification alignment (CCAR-F)

The Claude Certified Architect – Foundations exam publishes five domains. Finishing this course is most of the preparation for them; the exam itself also expects breadth this course doesn't chase, so treat the mapping as a study aid rather than a guarantee.

| Domain | Weight | Where it's covered |
|---|---|---|
| Agentic architecture & orchestration | 27% | Weeks 8, 7, 11 |
| Claude Code workflows | 20% | Weeks 0, 6, 10 |
| Prompt engineering & structured output | 20% | Weeks 3, 5, 9 |
| Tool design and MCP | 18% | Weeks 7, 8 |
| Context management & reliability | 15% | Weeks 3, 6, 11 |

Domain weights are from third-party exam guides, not from Anthropic's own published objectives — verify against the [official program page](https://www.pearsonvue.com/us/en/anthropic.html) before relying on them.

---

## Software engineering concepts covered (mapped to weeks)

| Concept | Where |
|---|---|
| Git + branching + PR workflow | Week 2 |
| TypeScript + Zod as boundary contracts | Week 4 |
| Next.js architecture (RSC, server actions, route handlers) | Week 4 |
| Static analysis + dependency scanning | Week 4 |
| Unit + integration + E2E testing | Weeks 4, 12 |
| Database design + migrations | Weeks 5, 12 |
| Vector search + pgvector | Week 5 |
| Background jobs + edge functions | Week 5 |
| Streaming + realtime | Weeks 2, 5, 8, 11 |
| Coding-agent workflows + spec-driven dev | Week 6 |
| Protocol design + MCP servers | Week 7 |
| CI/CD (GitHub Actions) + evals-as-tests | Week 9 |
| Code review at agent velocity | Week 10 |
| Cost + latency + reliability engineering | Week 11 |
| Observability (traces, metrics, errors) | Week 11 |
| Security (secrets, prompt injection, PII) | Weeks 4, 11, 12 |
| Auth + Row-Level Security + multi-tenancy | Week 12 |
| Payments + subscription billing + metering | Week 13 |
| Product discovery + customer development | Week 14 |
| Launch mechanics + growth instrumentation | Week 14 |

---

## Design principles for every week

**One artifact per week.** Every week ends with a commit, a merged PR, or a deployed change to Scholar. Nothing is theoretical.

**Progressive project.** Weeks 2–14 accumulate into one running SaaS. The reader can stop at any week and have a working thing at that level of maturity.

**Named patterns, reused.** Names that recur across weeks and become vocabulary: *the Eval Harness*, *the Context Budget*, *the Model Policy*, *the Verifier Loop*, *the Spec-First Workflow*, *Defensive Prompting*, *the Runbook*.

**One diagram per week, maintained as source.** SVG or Mermaid, in `/docs/diagrams/`, so updates travel with the text. Diagrams that recur: the Skills Map, the agent loop, the RAG pipeline, the evals loop, the tenant-isolation model.

**Two-audience layering.** Each week works for (a) a developer who has never touched a model API and (b) a senior engineer who has shipped LLM features but not systematically. `> If you already know X, skip to Y` callouts serve both.

**Honest about money.** Every week that spends money says how much, on which model, and what would be cheaper. Claude Code itself is a paid tool and the course says so up front rather than pretending otherwise.

**Vendor names age fastest.** Tools are named as examples, never as requirements, with one deliberate exception: Claude Code, which the course commits to and teaches properly.

---

## Cadence

One post per course week, published bi-weekly: **28 calendar weeks, ~6.5 months** end to end. Post length target: **2,500–3,500 words**. Hard cap at 4,000 — anything longer splits into two posts.

Publication rhythm: post drops Tuesday morning, companion PR merged into the public repo the same day, discussion thread pinned for a week.

---

## Contribution model

**License.** CC BY-SA 4.0 for prose. MIT for code. Both in `LICENSE` and post frontmatter.

**PR workflow.** Every post has `Last reviewed:` in frontmatter. A stale-post GitHub Action flags posts unreviewed in 6 months. Contributors update the date when they touch a post.

**Maintainer notes.** Each post ends with an "Open questions" section — things the author is unsure about or expects to change fastest. Makes PRs easier to invite.

**Changelog discipline.** `CHANGELOG.md` tracks week-level changes (new week, major rewrite, model or tool substitution). Typo fixes don't need entries.

**Issues as the queue.** Anything that should exist but doesn't lives as a labeled GitHub issue.

**Model + provider drift.** The stack changes. When a model is deprecated, when Supabase ships a new primitive, when Next.js changes an API — those are `CHANGELOG` entries and PRs, not new weeks. This is the discipline that keeps a course useful two years after it launches. The first casualty was real: an earlier draft of Week 0 was built on a coding agent whose free tier was withdrawn mid-writing.

---

## Settled decisions

**Product name.** *Scholar* is the product name and stays that way. The repo is `ai-engineering`; the app inside it is Scholar.

**Coding agent.** Claude Code, single-agent by design, taught directly rather than mentioned.

**Model access.** The Anthropic API is Scholar's primary model layer. OpenRouter stays in the stack for the Week 9 cross-family A/B and as a fallback path — multi-provider fallback is good practice as well as good pedagogy.

**Target reader.** Both audiences, handled by the two-audience layering principle rather than by picking one.

**Concept coverage.** See [docs/concept-map.md](./docs/concept-map.md) for every concept in the course mapped to the part of Scholar that teaches it.

---

## What this course took from CS146S

Stanford's [CS146S: The Modern Software Developer](https://themodernsoftware.dev/fall2025) ran in Fall 2025 and is the closest thing to prior art for the agent-native half of this syllabus. Three things came directly from it:

- **Agent-native development deserves more than one week.** CS146S spends a whole quarter on what an earlier draft of this syllabus compressed into a single post. Weeks 6, 7, and 10 are the correction.
- **Build an MCP server, don't just consume one.** Their Week 3 assignment is the best exercise in the course. Week 7 is our version, pointed at Scholar's own eval harness so the artifact is useful afterwards.
- **Security and code review are their own disciplines.** Their Semgrep and code-review weeks became our Week 4 addition and Week 10.

Three things were deliberately left behind: building the same app in three stacks (Scholar is the point), a local-model prompting exercise (Week 3 teaches the same thing through the API), and vendor-specific weeks tied to individual tools — the part of their syllabus that has aged fastest in the year since.

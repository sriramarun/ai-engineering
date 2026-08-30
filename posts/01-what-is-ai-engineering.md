---
week: 1
title: "What AI Engineering Is (and Isn't) — Reading the Skills Map"
slug: "what-is-ai-engineering"
pillar: "Introduction — all four pillars"
status: draft
author: "Sriram Krishnan"
published:
last_reviewed:
word_target: 3000
---

# Week 1. What AI Engineering Is (and Isn't) — Reading the Skills Map

> **Status:** Draft. Prose complete, screenshots pending. See [SYLLABUS.md](../SYLLABUS.md) for the full course map and [docs/concept-map.md](../docs/concept-map.md) for how the concepts connect.

There is a particular kind of engineer that did not exist five years ago and is now the most in-demand role in software. They are not machine learning researchers. They do not train models. Many of them could not derive backpropagation on a whiteboard and have no reason to. What they do is build products on top of models that other people trained — and the hard part turns out to be almost entirely engineering.

This course is fourteen weeks of that engineering, taught by building one real thing.

> **If you already know what AI engineering is,** skip to [Introducing Scholar](#introducing-scholar). If you already know what you're building, skip to [What you'll build this week](#what-youll-build-this-week).

---

## What AI engineering actually is

Here is the least glamorous, most accurate definition I know:

**AI engineering is building reliable software on top of an unreliable, nondeterministic, metered API call.**

Unpack that sentence and you have the whole discipline.

**"An API call."** From your code's point of view, a large language model is an HTTP endpoint. You send it text, it sends back text. That is the entire interface. Everything sophisticated you have heard about — agents, RAG, tool use, chain of thought — is a pattern built out of repeated calls to that endpoint, with your own code deciding what to send and what to do with what comes back. The model is a component, not the system. You are building the system.

**"Nondeterministic."** Send the same input twice, get two different outputs. Every instinct trained by twenty years of deterministic software — write a test that asserts equality, fix the bug once and it stays fixed — has to be re-learned. You do not test a model, you *evaluate* it: you measure how often it is good enough across a set of examples, and you set a threshold. This single shift is the biggest thing separating engineers who ship AI features that hold up from engineers who ship demos that fall over.

**"Unreliable."** Providers have outages. Models get deprecated with two months' notice. Rate limits appear at the worst moment. A model that scored 90% on your task in March scores 78% in June because the provider silently updated it. Reliability engineering is not an advanced topic here; it is week one of running anything real.

**"Metered."** Every call costs money proportional to how much text goes in and out. A feature that is delightful at ten users can be bankrupting at ten thousand. Cost is a design constraint that sits alongside latency and correctness, and engineers who ignore it build things that cannot ship.

**"Reliable software."** This is the part people skip. The user does not care that the model is probabilistic. They care that the app works, is fast, does not lose their data, and does not charge them twice. All of ordinary software engineering still applies. AI engineering is ordinary engineering *plus* a new class of component with unusual properties — not a replacement for it.

## What it isn't

Two comparisons clear up most of the confusion.

**It isn't machine learning engineering.** An ML engineer's core loop is data → model → metric: collecting and labelling data, choosing an architecture, training, tuning, and measuring. The artifact they produce is a model. An AI engineer's core loop is product → system → eval: taking a capability that already exists in a model, building the system around it that makes it useful, and measuring whether it works for real users. The artifact is an application.

The skills overlap at the edges — you need enough ML vocabulary to know when a small trained classifier beats a giant general model, which is exactly what Week 10 covers — but the day jobs are different. You will not need a GPU in this course.

**It isn't "vibe coding."** You can get a demo working by prompting a coding agent until something appears on screen. This is genuinely useful, and Week 6 is entirely about doing it well. But a demo becomes a product only when someone answers the unglamorous questions: what happens when the model returns malformed JSON, when a user uploads a 400-page PDF, when the provider 503s, when two users' documents must never mix, when the monthly bill arrives. The difference between a vibe-coded demo and an AI product is not talent. It is a checklist, and this course is that checklist.

## The Skills Map: four pillars

Andrew Ng published an *AI Engineering Skills Map* in 2026 that is the most useful breakdown of the role I have seen, largely because it refuses to be only about models. Four pillars. This course is organised around them.

### Pillar 1 — Building and deploying AI applications

The technical core, which Ng splits into six sub-skills:

- **LLM foundations** — tokens, context windows, structured outputs, tool calling, model selection. What the API actually does. *Week 3.*
- **Grounding with data** — retrieval, embeddings, vector search, citations. Getting the model to answer from *your* data instead of its memory. *Week 5.*
- **Agentic systems** — loops where the model decides what to do next and calls tools to do it. *Week 7.*
- **Evaluation-driven development** — datasets, judges, thresholds, regression gates. *Week 8.*
- **Operating in production** — cost, latency, reliability, observability, safety. *Week 9.*
- **ML foundations** — enough to know when not to use an LLM. *Week 10.*

### Pillar 2 — Software engineering fundamentals

Everything that was already true: types, tests, migrations, CI, error handling, secrets management. It appears in the Skills Map because the failure mode is so common. Engineers coming from a data science background often have the AI half and not this half; the result is a notebook that works on one laptop. *Week 4, reinforced every week after.*

### Pillar 3 — Using coding agents

New, real, and measurable. An engineer who knows how to specify work for a coding agent, give it a way to check its own output, and keep it away from production data ships several times faster than one who doesn't. This is a learnable craft with named techniques, not a personality trait. *Week 6.*

### Pillar 4 — Shaping the build

Product judgment: deciding what to build, how good is good enough, and when to stop. It matters more in AI than in traditional software, because "the feature works" is not a binary. You choose a quality bar, and that choice is a product decision with cost and latency attached. *Weeks 13–14.*

The four pillars are not sequential in real life — you use all of them in a single afternoon — but they are sequential in this course, because each one needs a piece of working software to attach to.

> 📸 **Screenshot slot** — `docs/screenshots/week-01-skills-map.png`
> *Capture: the four-pillar diagram, rendered from `docs/diagrams/skills-map.mmd`, used as the recurring map at the top of each module.*

---

## Introducing Scholar

Reading about AI engineering produces the feeling of understanding without the thing itself. So the entire course is one build.

**Scholar** is a document-grounded research assistant. A user signs up, uploads their own documents — papers, reports, contracts, meeting notes — and asks questions. Scholar answers from those documents, with citations pointing at the exact passages it used. It remembers their library, it handles a multi-step research question by searching several times and assembling an answer, and it bills them for what they use.

By Week 14 that is a live product on a real domain that a stranger can sign up for and pay for.

### Why this product

Any teaching project has to be chosen carefully, because the product decides which problems you are forced to solve. Scholar was chosen because it forces all of them:

- **It needs grounding**, so you have to build retrieval properly — chunking, embeddings, hybrid search, citations. A chatbot with no data source would let you skip the single most important applied skill.
- **It needs agentic behaviour**, because a real research question isn't one search. That gives you a genuine reason to build a planning loop rather than a toy one.
- **Quality is measurable**, which makes evals honest: did it cite the right passage, yes or no? Compare that to "write me a poem," where you cannot build a regression suite.
- **It has real users with real data**, which forces multi-tenancy, row-level security, and privacy — the parts most tutorials skip entirely.
- **It costs money to run**, so cost control and metering aren't hypothetical. You will watch your own OpenRouter spend and decide what to do about it.
- **People actually want it.** You can plausibly launch this and get users, which makes Weeks 13 and 14 real rather than performative.

### What it looks like at each stage

You do not build all of it at once. Each week Scholar becomes a slightly more serious piece of software, and you can stop at any point and have something that runs:

| After week | Scholar is… |
|---|---|
| 2 | A deployed page that calls a model |
| 5 | A working RAG app over your own documents, with citations |
| 8 | The same app, with an eval suite that stops you shipping regressions |
| 9 | A monitored production service you could put in front of strangers |
| 11 | A multi-user product with proper data isolation |
| 12 | A business |
| 14 | Launched |

> 📸 **Screenshot slot** — `docs/screenshots/week-01-scholar-final.png`
> *Capture: the finished Scholar answer view — question, streamed answer, inline citations, source panel — as the "here's where we're going" image.*

### The stack, in one paragraph

Next.js and TypeScript for the app, Supabase for auth and Postgres and file storage and vector search, OpenRouter for model access, Vercel for deployment, Stripe for billing, Langfuse and Sentry for observability. Every choice is defensible for a real product, every one has a free tier, and the whole course costs under $50 in API credit. The full reasoning for each is in [SYLLABUS.md](../SYLLABUS.md); the short version is that this stack lets you spend your attention on AI engineering rather than on infrastructure.

One choice worth calling out now: **OpenRouter**. It is a single API that proxies to every major model — Anthropic, OpenAI, Google, and the open-weight models — so switching models is a string change rather than an SDK migration. That matters pedagogically, because Week 8 asks you to A/B two models on your own task and see the difference for yourself. It also matters practically: model choice is a decision you should be able to revisit cheaply, forever.

---

## Where are you now? A self-assessment

Score yourself 0–3 on each line: 0 = never heard of it, 1 = read about it, 2 = used it once, 3 = shipped it to users. Keep the numbers. You will redo this in Week 14, and the delta is the point.

**Pillar 1 — Building AI applications**

- I can explain what a token is and estimate the cost of a request
- I have made a model return structured JSON I could rely on
- I have built retrieval over my own documents
- I have written an agentic loop with tools
- I have built an eval set with a scoring function and a threshold
- I have run an LLM feature in production and watched what it cost

**Pillar 2 — Software fundamentals**

- I am comfortable with TypeScript and a typed API boundary
- I write and run database migrations
- I have CI that blocks a bad merge

**Pillar 3 — Coding agents**

- I use a coding agent for real work, not just autocomplete
- I write specs an agent can execute against
- I give the agent a way to verify its own output

**Pillar 4 — Shaping the build**

- I have talked to users before building a feature
- I have decided "this is good enough to ship" with evidence

Anything at 0 or 1 has a week attached to it in the [concept map](../docs/concept-map.md). Nothing here assumes prior LLM experience.

---

## What you'll build this week

Small on purpose. This week is orientation; the code starts next week.

1. **Fork this repo** and clone it locally.
2. **Read [SYLLABUS.md](../SYLLABUS.md)** end to end — 15 minutes, and it makes every later week make sense.
3. **Record your self-assessment.** Create `docs/my-assessment.md` in your fork with your scores and today's date. This file is yours; it is gitignored in the upstream repo so your fork can keep it private if you'd rather.
4. **Make your first commit.**

```bash
git clone https://github.com/<your-username>/ai-engineering.git scholar
cd scholar
git checkout -b week-01
# write docs/my-assessment.md
git add docs/my-assessment.md
git commit -m "Week 1: baseline self-assessment"
git push -u origin week-01
```

That's it. You now have the repo that will become a running SaaS.

> 📸 **Screenshot slot** — `docs/screenshots/week-01-first-commit.png`
> *Capture: the terminal showing the clone, branch, and first commit succeeding.*

### Cost this week

$0. No accounts, no keys, no API calls.

---

## Open questions (for maintainers)

- Should the self-assessment be a form that produces a shareable score, or is a markdown file the right amount of friction?
- Is the "AI engineering vs. ML engineering" framing still useful in 2027, or will the roles have merged enough that it reads as dated?

## Next week

[Week 2 — Your AI Engineering Environment](./02-environment-and-repo.md): Node, pnpm, a coding agent configured for this repo, an OpenRouter key, a Supabase project, and a Vercel deployment. You end next week with a public URL that calls a real model.

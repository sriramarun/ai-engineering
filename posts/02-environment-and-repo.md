---
week: 2
title: "Your AI Engineering Environment"
slug: "environment-and-repo"
pillar: "Pillar 2: Software Engineering Fundamentals"
status: draft
author: "Sriram Krishnan"
published:
last_reviewed:
word_target: 3000
---

# Week 2. Your AI Engineering Environment

> **Status:** Draft. Prose complete, screenshots pending. Commands are written to be run top to bottom in a fresh clone.

Most tutorials treat setup as an obstacle between you and the interesting part. That is a mistake here, because in AI engineering the environment *is* an interesting part. You are wiring together four services with three different kinds of secret, running the same code locally and on someone else's machine, and paying real money the moment it works. Getting that right once, deliberately, saves the next twelve weeks.

By the end of this post you will have a public URL — a real one, on the internet — that takes a question and streams back an answer from a real model. Roughly two hours, mostly waiting for installs.

> **If you already have a Next.js + Supabase + Vercel setup you're happy with,** skip to [Talking to a model](#talking-to-a-model) and just take the OpenRouter and env-var conventions.

---

## What you'll have at the end

- Node 20+, pnpm, and the repo running locally on `localhost:3000`
- A coding agent configured with this repo's conventions
- An OpenRouter key and a working streamed LLM call
- A Supabase project, the local Supabase stack, and your first migration applied
- A Vercel project linked to your fork, with preview deploys on every branch
- One merged PR

## Accounts you'll need

Create these first; the sign-ups are the slow part. All four have free tiers that carry the whole course.

| Service | What for | Cost |
|---|---|---|
| [GitHub](https://github.com) | The repo, CI, and Vercel's trigger | Free |
| [OpenRouter](https://openrouter.ai) | Model access, all providers, one key | Pay-as-you-go — start with $10 |
| [Supabase](https://supabase.com) | Postgres, auth, storage, vectors | Free tier |
| [Vercel](https://vercel.com) | Hosting and preview deploys | Hobby tier, free |

Total spend to finish this post: **under $0.10 of OpenRouter credit.**

> 📸 **Screenshot slot** — `docs/screenshots/week-02-accounts.png`
> *Capture: the four dashboards side by side after sign-up, with any keys, project refs, and billing details cropped or blurred out.*

---

## 1. Local toolchain

Three things: a Node runtime, a package manager, and Git configured properly.

```bash
node --version    # need v20.0.0 or newer
```

If that's missing or old, install [nvm](https://github.com/nvm-sh/nvm) and then:

```bash
nvm install 20
nvm use 20
nvm alias default 20
```

**Why Node 20+.** Native `fetch`, stable streams, and the Web Streams API — which is what streaming LLM responses actually uses. On Node 18 you will hit odd streaming behaviour and spend an evening on it.

Next, pnpm. This repo pins it in `package.json` under `packageManager`:

```bash
corepack enable
corepack prepare pnpm@9 --activate
pnpm --version
```

**Why pnpm rather than npm.** Speed and disk, but mostly *strictness*: pnpm won't let your code import a package you didn't declare. In a project that will accumulate a large dependency tree, that strictness catches a class of "works on my machine" bugs before they reach CI.

Now the repo:

```bash
git clone https://github.com/<your-username>/ai-engineering.git scholar
cd scholar
pnpm install
```

`pnpm install` on a fresh clone of the scaffold installs nothing yet — the dependency list is empty on purpose, because you are about to add the app.

## 2. Scaffolding the app

The repo has the folder structure but no Next.js app inside it. Add the runtime dependencies:

```bash
pnpm add next@15 react react-dom zod
pnpm add -D typescript @types/node @types/react @types/react-dom eslint eslint-config-next vitest tsx prettier
```

Then start it:

```bash
pnpm dev
```

Open `http://localhost:3000`. You should see the marketing page from `app/(marketing)/page.tsx`.

> 📸 **Screenshot slot** — `docs/screenshots/week-02-localhost-hello.png`
> *Capture: `localhost:3000` rendering the Scholar landing page for the first time, with the terminal showing `pnpm dev` running.*

**What those parentheses mean.** `app/(marketing)/` is a Next.js *route group*. The folder organises files without appearing in the URL, so `app/(marketing)/page.tsx` serves `/`, not `/marketing`. The repo uses three: `(marketing)` for logged-out pages, `(auth)` for sign-in, `(app)` for the signed-in product. It costs nothing now and saves a restructure in Week 11.

## 3. Secrets, three ways

This is the part worth slowing down for, because leaking a key is the most common self-inflicted wound in this whole course.

You have secrets in three places, and they are not the same secrets:

1. **Local** — `.env.local` on your machine. Gitignored. Never committed, ever.
2. **Preview** — Vercel's environment variables for preview deployments. Test keys only.
3. **Production** — Vercel's production environment variables. Live keys, tightest scope.

Copy the template:

```bash
cp .env.example .env.local
```

Two rules that hold for the rest of the course:

- **`NEXT_PUBLIC_` is a loaded prefix.** Any variable starting with it is compiled into the JavaScript sent to the browser. `NEXT_PUBLIC_SUPABASE_ANON_KEY` is fine there — it's designed to be public and is protected by row-level security. `OPENROUTER_API_KEY` must never carry that prefix; if it does, you have published your billing credentials to everyone who opens dev tools.
- **The model is never called from the browser.** Every LLM call in this app goes through a server route. That's not style: it's the only way the key stays secret and the only place you can enforce a cost budget.

Confirm the guard is in place before you put a real key anywhere:

```bash
cat .gitignore | grep env
git check-ignore -v .env.local    # should print a matching .gitignore rule
```

## 4. Branching

One branch per week, one PR per week, `main` always deployable.

```bash
git checkout -b week-02
```

This is not ceremony for its own sake. From Week 8, CI runs your eval suite on every pull request and blocks the merge if quality regresses. That gate only works if changes arrive as PRs. Building the habit now, on trivial changes, means the machinery is already in place when it starts catching real problems.

## 5. Configure your coding agent

Week 6 covers this properly. For now, give your agent the context it needs to be useful in *this* repo rather than in a generic Next.js one.

Create `CLAUDE.md` at the repo root (Cursor users: `.cursorrules` with the same content):

```markdown
# Scholar — agent context

Course project for the AI Engineering series. Each week adds one slice.

## Stack
Next.js 15 App Router, TypeScript, Supabase (Postgres + pgvector + Auth + Storage),
OpenRouter for models, Vercel for deploys.

## Rules
- Never call a model from a client component. LLM calls go through route handlers in app/api/.
- Validate every LLM response with a Zod schema before using it.
- No secrets in code. Read from process.env; add new keys to .env.example with a comment.
- Migrations only via supabase/migrations/. Never edit the database by hand.
- Run `pnpm typecheck && pnpm test` before claiming a change works.

## Conventions
- Route groups: (marketing) logged-out, (auth) sign-in, (app) signed-in product.
- lib/llm/ model access, lib/retrieval/ RAG, lib/agents/ agent loops, lib/evals/ evals.
```

The last rule under **Rules** is the important one. An agent that can run your checks can tell whether it succeeded; an agent that can't is guessing. That single line is most of the difference between an agent that helps and one that generates plausible-looking mess.

## 6. Talking to a model

Get a key at [openrouter.ai/keys](https://openrouter.ai/keys), add $10 of credit, and put it in `.env.local`:

```bash
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_DEFAULT_MODEL=anthropic/claude-sonnet-5
```

**Why OpenRouter.** One API, one key, one bill, and every major model behind it — Anthropic, OpenAI, Google, and the open-weight models — using the OpenAI-compatible request format everything already speaks. Switching models is a string change. In Week 3 you'll build a router that picks a model per task; in Week 8 you'll A/B two of them on your own eval set. Neither is comfortable if changing model means changing SDK.

Now the call. Create `app/api/hello-llm/route.ts`:

```ts
export const runtime = "edge";

export async function POST(req: Request) {
  const { question } = await req.json();

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      "X-Title": "Scholar",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_DEFAULT_MODEL,
      stream: true,
      messages: [
        { role: "system", content: "You are Scholar. Answer in two sentences." },
        { role: "user", content: question },
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    return new Response(`Upstream error: ${upstream.status}`, { status: 502 });
  }

  return new Response(upstream.body, {
    headers: { "Content-Type": "text/event-stream" },
  });
}
```

Test it without touching the UI:

```bash
curl -N -X POST http://localhost:3000/api/hello-llm \
  -H 'Content-Type: application/json' \
  -d '{"question":"What is an embedding, in one sentence?"}'
```

You should see server-sent events arrive in pieces rather than all at once. That trickle is the whole reason AI apps feel fast: the model produces tokens one at a time, and you show them as they arrive instead of making the user watch a spinner for eight seconds.

Four details in that file worth naming, because each returns later:

- **`runtime = "edge"`** — this handler runs on Vercel's edge network, close to the user, and streams without buffering. Week 9 revisits when edge helps and when it hurts.
- **The `HTTP-Referer` and `X-Title` headers** — OpenRouter uses them to group spend by app in your dashboard. Free attribution; set it once.
- **Passing `upstream.body` straight through** — you are piping one stream into another rather than accumulating the whole response in memory. This is what keeps latency low and memory flat.
- **The explicit failure branch** — the provider *will* return 429s and 503s. Week 9 turns this into a real fallback chain. Today it just has to not crash.

> 📸 **Screenshot slot** — `docs/screenshots/week-02-first-stream.png`
> *Capture: the terminal `curl` streaming SSE chunks, next to the browser showing the same answer appearing word by word.*

Then a minimal client. In `app/(marketing)/page.tsx`, a form that posts the question and appends chunks as they arrive — under thirty lines, no library. Streaming from a route handler to a React component is a pattern you'll use in every week from here.

## 7. Supabase, local and hosted

Two Supabases: a hosted project for deployed environments, and a local stack in Docker for development and tests. Same schema, driven by the same migration files.

Create the hosted project at [supabase.com/dashboard](https://supabase.com/dashboard) (pick the region nearest your users), then copy the URL and both keys from **Project Settings → API** into `.env.local`.

**The two keys are not interchangeable.** The `anon` key is public and always constrained by row-level security. The `service_role` key bypasses RLS entirely — it is a master key. It goes in server-side environment variables only, never in a `NEXT_PUBLIC_` variable, never in a client component. Leaking it means handing over every user's documents.

Install the CLI and start the local stack:

```bash
brew install supabase/tap/supabase   # or: npm i -g supabase
supabase init
supabase start                        # needs Docker running
```

`supabase start` prints local URLs and keys. Working against a local Postgres means you can reset the database whenever you like, tests can run in CI without network access, and you cannot accidentally destroy production data during a migration experiment.

Your first migration, `supabase/migrations/0001_init.sql`:

```sql
-- Enable the vector extension now; Week 5 needs it for embeddings.
create extension if not exists vector;

create table documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  title text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

alter table documents enable row level security;
```

Apply it locally, then push it to the hosted project:

```bash
pnpm db:reset      # rebuilds the local DB from migrations
pnpm db:push       # applies migrations to the hosted project
```

Note the last line of the migration. RLS is enabled from the very first table, before there is any auth to enforce, because retrofitting it in Week 11 across a schema built without it is the kind of change that leaks data. Turn it on empty; add policies when you add users.

> 📸 **Screenshot slot** — `docs/screenshots/week-02-supabase-table.png`
> *Capture: the Supabase table editor showing `documents` with the RLS badge enabled, after the migration is pushed. Crop the project ref.*

## 8. Deploying to Vercel

Now the public URL.

1. At [vercel.com/new](https://vercel.com/new), import your fork. Vercel detects Next.js; accept the defaults.
2. Add environment variables **before the first deploy** — `OPENROUTER_API_KEY`, `OPENROUTER_DEFAULT_MODEL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_APP_URL`. Scope each to Production, Preview, and Development explicitly rather than clicking "all" out of habit; that habit is what puts a production key in a preview branch.
3. Deploy.

Optionally link the project locally, which lets you pull the deployed environment and reproduce a production-only bug:

```bash
pnpm add -g vercel
vercel link
vercel env pull .env.local
```

**Preview deploys are the feature that matters.** Every branch you push gets its own URL, built exactly like production. From now on the workflow is: branch → push → get a URL → check it → merge. Week 8 attaches evals to that same pull request, so by then every preview URL comes with a quality score attached.

Push the branch and open the PR:

```bash
git add -A
git commit -m "Week 2: environment, first LLM call, first migration"
git push -u origin week-02
```

> 📸 **Screenshot slot** — `docs/screenshots/week-02-vercel-preview.png`
> *Capture: the GitHub PR with the Vercel preview-deployment comment, and the preview URL open beside it answering a question.*

---

## Verification checklist

Before merging, all six should be true:

- [ ] `pnpm dev` serves `localhost:3000`
- [ ] `curl` against `/api/hello-llm` streams a real answer
- [ ] `git check-ignore .env.local` matches — no secret is staged
- [ ] `supabase start` runs and `pnpm db:reset` applies `0001_init.sql`
- [ ] The hosted Supabase project shows the `documents` table with RLS on
- [ ] The Vercel preview URL answers a question in the browser

Merge the PR. `main` now deploys to production automatically.

## When it doesn't work

**`OPENROUTER_API_KEY is undefined`.** Next.js reads `.env.local` at server start; restart `pnpm dev` after editing it. If it's still undefined in the browser, the variable is server-only — which is correct. Call it from a route handler.

**402 from OpenRouter.** No credit on the account. Add $10.

**The response arrives all at once instead of streaming.** Something is buffering: a `await res.json()` on the client instead of reading the stream, or a proxy in between. Check with `curl -N` first — that isolates the app from the browser.

**`supabase start` fails.** Docker isn't running, or ports 54321–54324 are taken by an old stack. `supabase stop --no-backup` clears it.

**The Vercel build fails but local is fine.** Almost always a missing environment variable or a case-sensitive import path — macOS doesn't care about case, Vercel's Linux builders do.

## What this week cost

A few cents of OpenRouter credit. Everything else is free tier. From Week 5, when you start embedding documents, costs become worth watching — and Week 9 makes watching them a system rather than a habit.

---

## Open questions (for maintainers)

- Is the local Supabase stack worth the Docker requirement for readers on constrained machines, or should local dev point at a second hosted project?
- Should `CLAUDE.md` ship in the repo pre-written, or is writing it yourself part of the lesson?

## Next week

[Week 3 — LLM Foundations via OpenRouter](./03-llm-foundations.md): what that API call actually did. Tokens, context windows, structured outputs with Zod, tool calling, and the model router that replaces this week's hardcoded model with a real routing decision.

---
week: 0
title: "Set Up Claude Code"
slug: "setup-claude-code"
pillar: "Pillar 3: Using Coding Agents"
certification: "Claude Code Workflows"
status: draft
author: "Sriram Krishnan"
published:
last_reviewed:
word_target: 2500
---

# Week 0. Set Up Claude Code

> **Status:** Draft. Prose complete, screenshots pending — see the slots below.

This is a setup post, not a course week. It comes before Week 1 because you want an agent from the first commit, and because this course assumes one specific agent throughout.

**The decision, stated plainly:** this course uses **Claude Code**. Every `CLAUDE.md`, hook, subagent, and MCP server in the following fourteen weeks is written for it, and Weeks 6, 7, and 10 teach it directly. That's a deliberate narrowing — a course that hedges across four agents teaches none of them well.

If you use something else day to day, the concepts transfer and the config files mostly do too. But the commands in the posts won't, and I'd rather say so once here than caveat every week.

---

## Why this choice

**The course needs one agent to teach properly.** Week 6 covers context engineering, plan mode, subagents, and hooks. Week 7 has you build an MCP server and point your agent at it. Week 10 compares your code review against your agent's. None of that can be written generically.

**It's a terminal agent, which is the shape the course needs.** Read the repo, edit several files, run the tests, read the failure, fix it. That loop — where the agent closes its own feedback loop against your CI — is the thing worth learning, and it's hard to practise in a tool built around inline autocomplete.

**It maps onto a credential, if you want one.** The [Claude certification program](https://www.pearsonvue.com/us/en/anthropic.html) has four exams; the one this course lines up with is **Claude Certified Architect – Foundations (CCAR-F)**. Its published domains — agentic architecture, Claude Code workflows, prompt engineering and structured output, tool design and MCP, context management and reliability — are close enough to this syllabus that finishing the course is most of the preparation. [SYLLABUS.md](../SYLLABUS.md) maps every domain to the weeks that cover it.

**A note on cost.** Claude Code has no free tier — it runs on a Claude subscription or on API credits. That's a real cost, and I'd rather be straight about it than recommend a free tool whose free tier evaporates mid-course, which is exactly what happened to the alternative this post originally covered. Budget for a subscription, or start with API credits and watch the spend with `/cost`.

---

## 1. Install

Claude Code runs anywhere you have a terminal, and also ships as a desktop app and as VS Code and JetBrains extensions. For this course the terminal is the primary surface.

```bash
npm install -g @anthropic-ai/claude-code
```

Then, from the root of your Scholar clone:

```bash
claude
```

First run walks you through signing in — a Claude subscription or an API key from the Console. Once you're in, `/status` shows which account and which model you're on.

> 📸 **Screenshot slot** — `docs/screenshots/week-00-first-run.png`
> *Capture: the first-run welcome screen in the Scholar directory. **The footer shows the signed-in account — crop or box it out** (see [Taking these screenshots](#taking-these-screenshots)).*

## 2. Give it the project

An agent with no project context writes generic Next.js code. An agent that knows this repo writes code that fits it. That context lives in `CLAUDE.md` at the repo root — loaded automatically into every session.

Run `/init` and it will draft one from what's already in the repo. Then edit it down to something like this:

```markdown
# Scholar — project context

The course project for the AI Engineering series. Each week adds one slice of a
document-grounded research SaaS.

## Stack
Next.js 15 App Router, TypeScript, Supabase (Postgres + pgvector + Auth + Storage),
OpenRouter for model access, Vercel for deploys.

## Rules
- Never call a model from a client component. Model calls go through route handlers in app/api/.
- All model access goes through lib/llm/. Do not import a provider SDK anywhere else.
- Validate every model response with a Zod schema before using it.
- No secrets in code. Read from process.env; add new keys to .env.example with a comment.
- Never read or edit .env.local. Never run commands against the hosted Supabase project.
- Migrations only via supabase/migrations/. Never edit the database by hand.
- Run `pnpm typecheck && pnpm test` before claiming a change works.

## Conventions
- Route groups: (marketing) logged-out, (auth) sign-in, (app) signed-in product.
- lib/llm/ model access, lib/retrieval/ RAG, lib/agents/ agent loops, lib/evals/ evals.
- One branch and one PR per week: `week-NN`.
```

The last rule under **Rules** is the one that earns its keep. An agent that can run your checks knows whether it succeeded. An agent that can't is guessing, and will tell you it's done either way. Week 6 builds this into a discipline; for now, just make sure the line is there.

Keep the file short. It is prepended to every request in the session, so it is not a place for documentation — it's a place for the handful of rules that would otherwise be violated.

> 📸 **Screenshot slot** — `docs/screenshots/week-00-claude-md.png`
> *Capture: `CLAUDE.md` open beside a session where the agent follows one of its rules unprompted.*

## 3. Decide how much rope to give it

The most useful setting, and the one nobody explains before you need it: how much the agent can do without asking.

| Mode | Behaviour | When |
|---|---|---|
| Plan mode | Read-only. Investigates and proposes; changes nothing. | Unfamiliar code, or sizing a change |
| Default | Asks before edits and commands | Normal work |
| Auto-accept edits | Applies file edits without asking; still gates commands | You've read the plan and want speed |

**Start in plan mode for anything you don't fully understand.** It costs nothing, it's the cheapest way to learn what the agent can actually see, and a plan you've read is a far better prompt than the request you started with.

This matters more in this repo than most: from Week 2 you have an `OPENROUTER_API_KEY` in `.env.local` and a Supabase `service_role` key that bypasses row-level security. The `CLAUDE.md` above tells the agent to leave them alone. Permission modes are what enforce it when the agent forgets.

## 4. The commands worth knowing on day one

| Command | What it does |
|---|---|
| `/init` | Draft a `CLAUDE.md` from the existing repo |
| `/status` | Account, model, and current settings |
| `/cost` | What this session has spent |
| `/context` | What's currently loaded into the context window |
| `/clear` | Start a fresh session between unrelated tasks |
| `/compact` | Summarise a long session and keep going |
| `/review` | Review a pull request |
| `/mcp` | Manage MCP servers — Week 7 |
| `/agents` | Manage subagents — Week 6 |
| `/help` | Everything else |

Two syntaxes you'll use constantly: `@path/to/file` pulls a file into context, and `!command` runs a shell command directly.

Non-interactive mode is how an agent ends up inside CI, which Week 10 uses:

```bash
claude -p "Summarise what changed in the last commit and flag anything touching secrets"
```

## 5. Habits that keep the bill sane

Four, in order of impact:

1. **Plan first, then execute.** One read-only pass beats three exploratory attempts, and produces better work.
2. **`/clear` between unrelated tasks.** Old context is resent every turn, so yesterday's conversation quietly makes today's request more expensive.
3. **`/compact` when a session gets long** rather than starting over — it keeps the thread and drops the bulk.
4. **Give it a verifier.** The single line about `pnpm typecheck && pnpm test` means the agent finds its own mistakes instead of handing them to you, which is what actually burns tokens.

`/cost` at the end of a session, for the first week or two, will teach you more about your own habits than any guide.

---

## Taking these screenshots

Several images in this post show an authenticated session, which puts your account email on screen — in the Claude Code footer, in `/status`, and in the Console. **Redact it before the file leaves your machine.**

Capture a region that excludes it first; edit only if something slips through.

- **macOS:** `Cmd-Shift-4` captures a selected region — draw the box above the footer. To fix an existing file, open it in Preview → *Tools → Annotate → Rectangle*, fill black, then **File → Export** (not Save) so the box is flattened into the pixels rather than left as a movable layer.
- **The terminal footer:** resize the window so the account line falls outside the captured region, or crop the last line.
- **Browser chrome:** Console URLs can carry an account identifier. Capture the page content, not the address bar.

A blurred rectangle is not redaction — blurred text can sometimes be recovered. Use an opaque fill.

The repo's [screenshot conventions](../docs/screenshots/README.md) apply to every image: `week-NN-slug.png`, 1440×900, and nothing in frame that identifies an account or exposes a key, project ref, or billing figure.

## Verification checklist

- [ ] `claude` launches in your Scholar clone
- [ ] `/status` shows you signed in
- [ ] `CLAUDE.md` exists at the repo root and the agent follows one of its rules unprompted
- [ ] Plan mode starts read-only
- [ ] `/cost` reports a session

---

## Open questions (for maintainers)

- Should `CLAUDE.md` ship pre-written in the repo, or is writing it yourself part of the lesson? Currently: `/init` drafts it, the reader edits it.
- The course is single-agent by design. Is a short "if you use X instead" appendix worth maintaining, or does it rot faster than it helps?

## Next

[Week 1 — What AI Engineering Is (and Isn't)](./01-what-is-ai-engineering.md). Your agent is set up; the course starts there.

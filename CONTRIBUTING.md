# Contributing to Scholar

Thanks for considering a contribution. This course is written in public and gets better with outside eyes.

## Types of contributions

**Typos, broken links, small fixes.** Open a PR directly. No issue needed.

**Corrections to technical content.** Open a PR with a short description of what was wrong and why the fix is correct. If the fix touches a code sample, update the corresponding test.

**New examples or expanded sections.** Open an issue first so we can talk about scope before you write. New examples must include an eval or a test.

**New posts (e.g., Post 15 on multi-modal).** Open an issue with the working title, the pillar of Ng's Skills Map it maps to, an outline in the style of the existing posts, and the artifact readers will build. Approved outlines get a `post: <slug>` label and can be drafted as PRs.

**Translations.** Open an issue with the target language and confirmation of maintainer availability (translations that go stale hurt more than help).

**Stack substitutions.** If a tool in the stack is deprecated or clearly beaten, open an issue titled `stack: replace X with Y` with the reasoning, migration impact across posts, and a plan for updating the affected posts and code.

## PR checklist

- [ ] The change is scoped to one topic. Split unrelated changes into separate PRs.
- [ ] If you touched a post, update its `Last reviewed:` frontmatter date.
- [ ] If you touched code, run `pnpm test` locally and update snapshots if intentional.
- [ ] If you added a code sample in a post, add a test or eval for it.
- [ ] If you changed the stack, updated the CHANGELOG.
- [ ] The PR description explains what changed and why.

## Post style guide

- Prose voice: direct, concrete, specific. Named patterns get named once and reused.
- Every post has one runnable artifact (a commit, an eval, a deployed change).
- Every post has one diagram in `/docs/diagrams/`, SVG or Mermaid.
- Every post has an "Open questions" section at the end for maintainers.
- Two-audience layering: use `> If you already know X, skip to Y` callouts.
- Free-tier honest: if a post spends money, say how much on which model.
- Word target: 2,500–3,500 per post, hard cap at 4,000.

## Code style

- TypeScript strict mode. No `any` in shipped code (comments in posts fine).
- Zod at every LLM boundary and every API boundary.
- Tests colocated by kind under `/tests/{unit,e2e,evals}/`.
- Prefer server components; use client components only where needed.
- `pnpm` for package management. No `npm install` in scripts.

## Review process

- One maintainer review required for prose changes.
- Two maintainer reviews required for stack substitutions.
- Automated checks (lint, typecheck, test, evals) must pass before merge.
- Stale-post GitHub Action flags anything unreviewed in 6 months.

## Code of Conduct

Be kind, be specific, be patient with beginners. Assume good faith. If in doubt, ask.

Report incidents to the maintainer email in the repo settings.

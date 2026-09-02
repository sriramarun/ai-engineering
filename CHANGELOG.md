# Changelog

All notable changes to Scholar (the course and the code) are tracked here.

Format inspired by [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Post-level changes and stack substitutions get entries. Typo fixes do not.

## [Unreleased]

### Added
- Repo scaffolding: directory tree, README, SYLLABUS, LICENSE, CONTRIBUTING, glossary.
- Post placeholders for 01–14 with frontmatter.
- GitHub Actions: `ci.yml` (lint + typecheck + test on PR), `stale-post.yml` (flag posts unreviewed in 6 months).
- First ADR: 0001 — Record architecture decisions.
- Empty runbook and architecture doc stubs.
- Stack declared: Next.js 15 + TypeScript + Tailwind + shadcn/ui + Supabase + OpenRouter + Vercel + Stripe + Sentry + Langfuse + Vitest + Playwright.

### Planned
- Week 0: Set Up Claude Code.
- Week 1: What AI Engineering Is (and Isn't) — Reading the Skills Map.
- Week 2: Your AI Engineering Environment.
- Full syllabus in [SYLLABUS.md](./SYLLABUS.md).

## Rebuild — course realigned

- Adopted **Claude Code** as the course's single coding agent, taught directly in Weeks 6, 7 and 10.
- Added **Week 0: Set Up Claude Code**, replacing an earlier setup post built on a coding agent whose free tier was withdrawn.
- Aligned the syllabus with the **Claude Certified Architect – Foundations (CCAR-F)** domains; every domain now maps to specific weeks.
- Kept Scholar's model layer on **OpenRouter** so model choice stays a configuration change — the seam that makes the Week 9 A/B and the Week 11 cost lever possible. Claude Code is the coding agent; the app stays provider-agnostic.
- Restructured the 14 weeks after reviewing Stanford's CS146S: agent-native development expands from one week to three (6, 7, 10), security scanning joins Week 4, ML foundations folds into Week 11, and shaping and launch merge into Week 14.
- Added `docs/concept-map.md` and `docs/screenshots/`.

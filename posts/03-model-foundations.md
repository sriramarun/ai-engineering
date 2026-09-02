---
week: 3
title: "Model Foundations via OpenRouter"
slug: "model-foundations"
pillar: "Pillar 1: Building AI Applications — LLM foundations"
certification: "Prompt Engineering & Structured Output; Context Management"
status: draft
author: "Sriram Krishnan"
published:
last_reviewed:
word_target: 3000
---

# Week 3. Claude API Foundations

> **Status:** Placeholder. This week has not been written yet. See [SYLLABUS.md](../SYLLABUS.md) for the planned outline and [docs/concept-map.md](../docs/concept-map.md) for how it connects.

## What this week covers

What a model is at the API boundary. Tokens, context windows, and the context budget. Structured outputs — `response_format` with a JSON schema, then Zod on the way in, because `strict` is a promise not every endpoint keeps. Tool calling. The `reasoning` parameter and what effort actually buys. Prompt caching as a design concern, not an optimisation: `cache_control` breakpoints and what belongs in the stable prefix. Choosing a model per task — and why the seam that lets you swap one matters more than which you picked today.

## What you'll build

`lib/llm/` — a typed OpenRouter client with a per-task model policy, a cached system prefix, Zod-validated structured output on every response, and a fallback chain.

## Prerequisites

- Week 2 completed.
- Repo up to date with `main`.

## Reading time

~15 minutes reading, ~2–4 hours of hands-on work.

## Open questions (for maintainers)

- _Add open questions here as the draft comes together._

## Next week

[Week 4](04-software-fundamentals.md)

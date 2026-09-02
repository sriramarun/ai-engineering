---
week: 3
title: "Claude API Foundations"
slug: "claude-api-foundations"
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

Tokens, context windows, and the context budget. Structured outputs with `output_config.format` and Zod. Tool use. Adaptive thinking and the `effort` dial. Prompt caching as a first-class design concern, not an optimisation. Choosing between Opus, Sonnet, and Haiku per task.

## What you'll build

`lib/llm/` — a typed Claude client with a per-task model policy, a cached system prompt, and Zod-validated structured output on every response.

## Prerequisites

- Week 2 completed.
- Repo up to date with `main`.

## Reading time

~15 minutes reading, ~2–4 hours of hands-on work.

## Open questions (for maintainers)

- _Add open questions here as the draft comes together._

## Next week

[Week 4](04-software-fundamentals.md)

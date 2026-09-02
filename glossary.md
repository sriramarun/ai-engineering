# Glossary

Shared vocabulary for the course. One definition per term, referenced by every post. When a term drifts across posts, fix it here and the posts stop drifting.

---

**Agent.** A program that uses an LLM to decide what to do next in a loop, calling tools and updating its own state until a goal is met or a stop condition is hit. Distinguished from a chatbot by the presence of tools, state, and multi-step execution.

**Chunking.** Splitting a document into pieces small enough to embed and retrieve. The choice of strategy (fixed-size, semantic, hierarchical) directly determines retrieval quality. Introduced in Week 5.

**Context budget.** The token allowance a request has to work within, split across system prompt, retrieved context, conversation history, and expected output. A named constraint the code enforces, not a vague target. Introduced in Week 3.

**Eval.** A dataset plus a scoring function plus a threshold. Not a benchmark, not a vibe check. Introduced in Week 9.

**Eval harness.** The infrastructure that runs evals against your app, produces scores, and gates PRs on regression. Introduced in Week 9.

**Grounding.** Anchoring a model's response in specific retrieved data or tool output, so the answer can be traced to a source. Introduced in Week 5.

**LLM-as-judge.** Using an LLM to score another LLM's output against a rubric. Cheap and scalable; honest only when the rubric is precise and the judge is validated against human scores. Introduced in Week 9.

**Anthropic API.** Scholar's model layer. Structured outputs, tool use, prompt caching, and the effort dial are first-class, which is why the course builds on it directly rather than through a proxy.

**OpenRouter.** A provider-agnostic API kept in the stack for one job: the Week 9 A/B across model families, and as a fallback path.

**Prompt injection.** An attack where user-supplied input contains instructions that hijack the model's behavior. Defenses discussed in Week 11.

**RAG (Retrieval-Augmented Generation).** The pattern of retrieving relevant context from a data store and passing it to the model at inference time. Introduced in Week 5.

**RLS (Row-Level Security).** Postgres feature (used via Supabase) that enforces per-user data isolation at the database layer. Introduced in Week 12.

**Runbook.** The one-page operational document that says what to do when things go wrong in production. Lives at `/docs/runbook.md`. Introduced in Week 11.

**Scholar.** The document-grounded research assistant this course builds.

**Skills Map.** Andrew Ng's *AI Engineering Skills Map* (2026): four pillars — Building and Deploying, Software Fundamentals, Coding Agents, Shaping the Build. Introduced in Week 1.

**Spec-first workflow.** Writing a specification a coding agent can execute against, before writing code. Introduced in Week 6.

**Streaming.** Returning the model's output token-by-token to the user as it's generated, rather than waiting for the full response. Reduces perceived latency significantly. Introduced in Week 5.

**Tenant isolation.** The guarantee that one user's data cannot leak to another. Enforced by RLS + tests. Introduced in Week 12.

**Tool.** A function an agent can call, with a name, a schema, and a description. Tool design is a core agent-engineering skill. Introduced in Week 8.

**Agentic loop.** The core structure of an agent: plan → act (via tool) → observe → decide whether to continue. Introduced in Week 8.

**Context engineering.** The discipline that replaces "prompt engineering" once you have retrieval, tools, and memory: deciding what to load into the model's context window, in what order, and at what cost. Introduced in Week 5, applied to your own agent in Week 6.

**Defensive prompting.** Writing prompts on the assumption that the model is fallible — specifying explicitly, constraining output, and handling the failure rather than hoping it doesn't happen. Introduced in Week 6.

**Context failure modes.** Four ways a long context degrades: *poisoning* (a wrong fact enters and is repeated), *distraction* (volume drowns the instruction), *confusion* (irrelevant material is treated as relevant), *clash* (two parts of context contradict). Named in Week 6.

**Effort.** The dial that controls how much reasoning the model spends before answering. A cost and quality lever, tuned per route. Introduced in Week 3.

**Hook.** A rule the agent harness enforces mechanically — for example, blocking a commit whose typecheck fails. Introduced in Week 6.

**MCP (Model Context Protocol).** An open protocol for exposing tools, resources, and prompts to any agent, so an integration is written once rather than per tool. Scholar gets its own MCP server in Week 7.

**Model policy.** The typed decision about which model handles which task, based on cost, latency, and quality — replacing a hardcoded model string. Introduced in Week 3.

**Plan mode.** A read-only agent mode: it investigates and proposes, and changes nothing. Introduced in Week 0.

**Prompt caching.** Reusing an unchanged prompt prefix across calls so the repeated part is billed at a fraction of the price. Architectural, not an afterthought — it dictates what goes first in a prompt. Introduced in Week 3.

**Skill.** A packaged, reusable capability an agent loads on demand. Introduced in Week 7.

**Structured output.** Constraining a model to return JSON matching a schema, rather than parsing prose. Introduced in Week 3.

**Subagent.** A separate agent context delegated a slice of work, so the main context stays clean. Introduced in Week 6.

**Verifier loop.** A pattern where an agent's output is checked by a separate step (test, judge, human) before being accepted. Introduced in Week 6 and reused throughout.

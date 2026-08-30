# Glossary

Shared vocabulary for the course. One definition per term, referenced by every post. When a term drifts across posts, fix it here and the posts stop drifting.

---

**Agent.** A program that uses an LLM to decide what to do next in a loop, calling tools and updating its own state until a goal is met or a stop condition is hit. Distinguished from a chatbot by the presence of tools, state, and multi-step execution.

**Agentic loop.** The core structure of an agent: plan → act (via tool) → observe → decide whether to continue. Introduced in Post 07.

**Chunking.** Splitting a document into pieces small enough to embed and retrieve. The choice of strategy (fixed-size, semantic, hierarchical) directly determines retrieval quality. Introduced in Post 05.

**Context budget.** The token allowance a request has to work within, split across system prompt, retrieved context, conversation history, and expected output. A named constraint the code enforces, not a vague target. Introduced in Post 03.

**Context engineering.** The discipline that replaces "prompt engineering" once you have retrieval, tools, and memory: deciding what to load into the model's context window, in what order, and at what cost. Introduced in Post 05.

**Eval.** A dataset plus a scoring function plus a threshold. Not a benchmark, not a vibe check. Introduced in Post 08.

**Eval harness.** The infrastructure that runs evals against your app, produces scores, and gates PRs on regression. Introduced in Post 08.

**Grounding.** Anchoring a model's response in specific retrieved data or tool output, so the answer can be traced to a source. Introduced in Post 05.

**LLM-as-judge.** Using an LLM to score another LLM's output against a rubric. Cheap and scalable; honest only when the rubric is precise and the judge is validated against human scores. Introduced in Post 08.

**Model router.** The typed client that picks which model to call for a given task based on cost, latency, quality, and fallback rules. Introduced in Post 03.

**OpenRouter.** The provider-agnostic API used throughout the course. One key, one endpoint, every frontier + open model.

**Prompt injection.** An attack where user-supplied input contains instructions that hijack the model's behavior. Defenses discussed in Post 09.

**RAG (Retrieval-Augmented Generation).** The pattern of retrieving relevant context from a data store and passing it to the model at inference time. Introduced in Post 05.

**RLS (Row-Level Security).** Postgres feature (used via Supabase) that enforces per-user data isolation at the database layer. Introduced in Post 11.

**Runbook.** The one-page operational document that says what to do when things go wrong in production. Lives at `/docs/runbook.md`. Introduced in Post 09.

**Scholar.** The document-grounded research assistant this course builds.

**Skills Map.** Andrew Ng's *AI Engineering Skills Map* (2026): four pillars — Building and Deploying, Software Fundamentals, Coding Agents, Shaping the Build. Introduced in Post 01.

**Spec-first workflow.** Writing a specification a coding agent can execute against, before writing code. Introduced in Post 06.

**Streaming.** Returning the model's output token-by-token to the user as it's generated, rather than waiting for the full response. Reduces perceived latency significantly. Introduced in Post 05.

**Tenant isolation.** The guarantee that one user's data cannot leak to another. Enforced by RLS + tests. Introduced in Post 11.

**Tool.** A function an agent can call, with a name, a schema, and a description. Tool design is a core agent-engineering skill. Introduced in Post 07.

**Verifier loop.** A pattern where an agent's output is checked by a separate step (test, judge, human) before being accepted. Introduced in Post 06 and reused throughout.

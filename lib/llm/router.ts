/**
 * Model router — typed client over OpenRouter.
 *
 * This is a placeholder. The real implementation lands in Post 03
 * (LLM Foundations via OpenRouter).
 *
 * Design goals when it's built:
 *   - One call site for all LLM traffic in the app.
 *   - Pick a model by task ("chat", "extract", "embed", "cheap-classifier")
 *     rather than by model name in application code.
 *   - Env-driven fallback chain (OPENROUTER_FALLBACK_MODELS).
 *   - Zod-validated inputs and structured outputs.
 *   - Emits Langfuse traces (Post 09).
 *   - Enforces per-request token / cost budget (Post 09).
 */

export type Task = "chat" | "extract" | "embed" | "classify";

export interface RouteOptions {
  task: Task;
  maxTokens?: number;
  temperature?: number;
  costCeilingUsd?: number;
}

export async function route(_opts: RouteOptions): Promise<never> {
  throw new Error(
    "Model router not implemented yet. See posts/03-llm-foundations.md.",
  );
}

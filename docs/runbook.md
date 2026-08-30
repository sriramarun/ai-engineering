# Runbook

Operational playbook for Scholar in production. Started skeletal; filled in for real in Week 9 (Operating in Production) and grown from there.

## Where things live

- **App:** Vercel — [dashboard](https://vercel.com/dashboard)
- **Database, auth, storage:** Supabase — [dashboard](https://supabase.com/dashboard)
- **LLM traffic:** OpenRouter — [dashboard](https://openrouter.ai/activity)
- **Errors:** Sentry
- **LLM traces:** Langfuse
- **Billing:** Stripe

## Incident triage — first 5 minutes

1. Is the site up? Check [status.scholar.example](https://status.scholar.example) and hit the homepage.
2. Check Sentry for a spike in errors in the last 15 minutes.
3. Check Vercel deployment log for the most recent deploy.
4. Check OpenRouter status page — provider outages are the single most common source of AI-app incidents.
5. Check Supabase status page.

## Common incidents

### LLM calls failing with 5xx
Likely OpenRouter or a specific provider outage. The model router (`lib/llm/router.ts`) should be falling over to the next model in the chain. If it isn't, check `OPENROUTER_FALLBACK_MODELS` is set in Vercel env.

### Latency spike
Check Langfuse for slow traces. Common causes: retrieval returning too many chunks (Week 5), a model swap that pulled in a slower model (Week 3), a Supabase query missing an index (Week 5, 11).

### Cost spike
Check OpenRouter activity dashboard for the top spender. Common causes: a runaway agent loop (Week 7 — add a max-iterations guard), a user hitting an unmetered endpoint (Week 12 — check rate limiter), a debug prompt with the full corpus in context (Week 5).

### Auth failing
Supabase Auth logs first. Common causes: OAuth provider credentials expired, magic-link email deliverability, RLS policy blocking the right user (Week 11).

### Prompt injection suspected
Isolate the offending request from Langfuse traces. Rotate any leaked credentials immediately. Add the payload to the eval suite (Week 8, 09) so the regression is caught next time.

## Escalation

- P0 (site down, data at risk): page maintainer immediately.
- P1 (degraded UX, LLM quality regression): open an issue with `sev:1` label, address within 24h.
- P2 (single-tenant issue, minor bug): standard issue queue.

## Weekly review

Every Monday:
- Sentry: any errors unresolved > 7 days?
- Langfuse: eval scores trending down?
- OpenRouter: any user consistently over 2× their tier's expected usage?
- Supabase: any slow queries logged?

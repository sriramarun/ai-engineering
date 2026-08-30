# Screenshots

One folder for every image used in the posts. Naming: `week-NN-<short-slug>.png`.

Each post marks the images it needs with a **screenshot slot** — a blockquote saying
the filename and what to capture. Replace the slot with the image when the shot exists:

```markdown
![The first streamed answer on localhost](../docs/screenshots/week-02-first-stream.png)
```

## Rules

- **No secrets in frame.** Crop or blur API keys, Supabase project refs, Stripe keys,
  account emails, and billing amounts. Check the browser URL bar too.
- **Consistent frame.** 1440×900 browser viewport, light theme, no personal bookmarks bar.
- **Terminal shots** use a plain prompt and a clean scrollback — the reader should be able
  to read every command.
- **Keep them current.** A screenshot of a dashboard that has since been redesigned is worse
  than no screenshot. The stale-post workflow flags posts unreviewed for six months; images
  are part of that review.

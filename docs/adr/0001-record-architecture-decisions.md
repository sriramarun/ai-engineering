# ADR 0001: Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-08-30

## Context

The course builds a real product over 14 posts and ~6.5 months. Architectural decisions will be made and revisited. Without a lightweight record of why each decision was made, later posts (and later readers) cannot tell whether a choice was deliberate or accidental.

## Decision

Every architectural decision that will be referenced by more than one post gets a numbered ADR in `/docs/adr/`, following the [Michael Nygard template](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions.html):

- **Title**
- **Status:** Proposed | Accepted | Deprecated | Superseded by ADR-XXXX
- **Date**
- **Context:** what problem this decision addresses
- **Decision:** what we chose to do
- **Consequences:** what follows from this — positive, negative, and neutral

ADRs are not deleted when superseded — they are marked `Superseded` and the new ADR references them. This is the trail.

## Consequences

**Positive:**
- Readers understand why the stack looks the way it does.
- Future contributors can propose changes with the historical context in hand.
- A stale ADR is a signal that a post depending on it may also be stale.

**Negative:**
- Small overhead per architectural decision.
- Some decisions won't be recorded until well after they were made (this ADR itself is retroactive for scaffolding decisions).

**Neutral:**
- ADRs live in this repo, not in a separate tool. That keeps them versioned with the code and prose they describe.

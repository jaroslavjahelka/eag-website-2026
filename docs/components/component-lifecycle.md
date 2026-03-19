# Component Lifecycle

Shared components should move through explicit lifecycle stages.

## Stages

### Proposal

The need is identified, but the abstraction is not yet approved.

Required:

- problem statement
- evidence that reuse or composition is insufficient
- likely reuse contexts
- expected states and accessibility needs

### Experimental

The component exists but its API or semantics are still being validated.

Rules:

- use sparingly
- keep the scope narrow
- avoid wide repository rollout before the contract stabilizes

### Stable

The component contract is clear, documented, and safe for general reuse.

Required:

- defined purpose
- defined variants
- defined applicable states
- accessibility expectations
- predictable file placement and naming

### Deprecated

The component should no longer be used for new work.

Required:

- replacement guidance
- migration path where applicable
- removal criteria

### Removed

The component no longer exists in active use.

## Lifecycle rule

Do not treat a freshly created component as stable by default.
Stability is earned through repeated correct use and a clear contract.

# AI Patterns

This file defines reusable interaction patterns for AI features inside the product.

## Shared rules

- prioritize task completion over conversation
- keep responses concise and structured
- ensure users remain in control of actions
- keep AI contextual to the current workflow
- AI behavior should feel like a product capability, not a personality

---

## Conversation patterns

AI chat interfaces allow users to interact with the system using natural language.

### Message structure

Result  
Optional explanation  
Optional suggested next step

### Rules

- present the result first
- keep explanations short
- avoid unnecessary conversational filler
- avoid speculative dialogue
- support follow-up requests without repeating unnecessary context

### User control

- allow prompt editing
- allow response regeneration
- allow cancellation of long operations
- avoid automatic irreversible actions

### Processing feedback

Show clear activity states such as:

- analyzing document…
- generating summary…
- searching data…
- preparing response…

---

## Assistant patterns

AI assistants support users directly inside the interface.

### Invocation

Common entry points:

- assistant panel
- command palette
- contextual toolbar
- inline action menu
- contextual suggestion

Rules:

- assistants should not appear automatically without user intent
- assistants must not block the main workflow
- assistants should remain dismissible

### Assistant response structure

Result  
Optional explanation  
Suggested actions

Rules:

- present the result first
- explanations should remain short
- actions must remain optional and reversible

### Context awareness

Assistants should use available context automatically:

- selected text
- active document
- visible data
- current workflow step

They should avoid asking for information already present in the UI.

---

## Autocomplete patterns

Autocomplete helps users complete text, commands, or code quickly.

### Suggestion behavior

- suggestions must remain unobtrusive
- suggestions must be easy to accept or ignore
- suggestions must not interrupt typing
- suggestions must remain relevant to the current context
- suggestions should stay short and predictable

### Acceptance

Common acceptance patterns:

- `Tab`
- `Enter`
- click suggestion

### Dismissal

- continuing to type dismisses the suggestion
- suggestions must disappear when irrelevant
- suggestions must not block input

### Error prevention

- prioritize correctness over creativity
- avoid speculative or long completions
- reduce suggestion frequency when confidence is low

---

## Decision model for AI

When generating AI feature behavior:

1. identify the current user intent and context
2. choose the correct AI pattern: conversation, assistant, or autocomplete
3. present the result before explanation
4. keep actions optional and reversible
5. preserve user control and predictable interaction

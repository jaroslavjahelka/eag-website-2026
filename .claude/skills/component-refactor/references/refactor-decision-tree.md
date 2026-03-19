# Component Refactor Decision Tree

## 1. Is the issue primarily visual duplication?

If yes, check whether an existing variant or slot can absorb it.

## 2. Is the issue API confusion?

If yes, reduce prop ambiguity before creating more wrappers.

## 3. Is the issue page-specific logic living in a shared component?

If yes, move orchestration back to the page or feature layer.

## 4. Is the issue repeated structure across multiple call sites?

If yes, consider a new abstraction only if the semantic purpose is stable.

## 5. Is the issue state explosion?

If yes, model the states explicitly and simplify rendering branches before extracting more pieces.

# UI Audit Checklists

## Hierarchy

- Is the page purpose obvious within one screen?
- Is there a clear primary action?
- Are secondary actions visually and semantically secondary?
- Are sections ordered around user tasks rather than implementation order?

## Design-system alignment

- Are existing components used where expected?
- Are token semantics preserved?
- Are there arbitrary visual values that look local or ad hoc?
- Are variants consistent with existing naming and behavior?

## States

- Empty
- Loading
- Error
- Success / confirmation
- Disabled / unavailable
- Permission-limited or conditional states when relevant

## Accessibility

- Labels and descriptions are meaningful
- Keyboard flow is preserved
- Focus feedback is visible
- Color is not the only carrier of meaning
- Errors and validation are understandable

## Responsive behavior

- Does the layout collapse predictably?
- Are actions still easy to reach?
- Does density stay readable?
- Are tables and forms still usable on narrow widths?

# Error Patterns

Error handling should support recovery, not punish the user.

## Structure

A useful error pattern usually includes:

1. what failed
2. what it means for the user
3. what action the user can take next

## Rules

- keep the message specific
- place the message near the affected context when possible
- preserve user input when recovery is possible
- reserve disruptive global errors for truly blocking conditions
- distinguish validation errors from system failures

## Common levels

- field-level validation
- section-level blocking error
- page-level failure
- background warning or notification

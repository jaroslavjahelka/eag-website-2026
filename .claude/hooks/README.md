# Runtime Hooks

This directory contains Claude Code runtime hooks.
These files are execution infrastructure, not canonical policy.

## Hooks

- `deny-dangerous-bash.sh` — denies destructive shell patterns
- `guard-protected-paths.sh` — warns when governance-critical files are being edited
- `run-changed-file-checks.sh` — runs repository structure checks
- `validate-governance-integrity.sh` — validates the governance and runtime layer after config changes
- `validate-ui-output.sh` — validates repository state at task completion

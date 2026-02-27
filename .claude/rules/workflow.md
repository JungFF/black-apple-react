## Workflow

- After generating tests, **always run lint** (not just tests) before committing to catch missing imports and other lint errors.
- Use the **test-runner sub-agent** to run tests, not direct Bash `npx vitest` commands.

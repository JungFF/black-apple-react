#!/usr/bin/env bash
# PostToolUse hook: after a successful git commit, inject a message asking
# Claude to evaluate whether CLAUDE.md or README.md need updating.
#
# Reads the PostToolUse JSON payload from stdin.
# Exits silently (no output) for non-commit commands so there is zero overhead.

set -euo pipefail

# ── 1. Read and parse the hook payload ──────────────────────────────────────
# The JSON payload may contain literal newlines inside string values (e.g.
# tool_output with multi-line git output), which breaks jq. Collapse to a
# single line first — safe because we only need tool_name and tool_input.command,
# neither of which contain newlines.
payload="$(cat | tr '\n' ' ')"

tool_name="$(echo "$payload" | jq -r '.tool_name // empty')"
tool_input="$(echo "$payload" | jq -r '.tool_input.command // empty')"

# ── 2. Fast exit for anything that isn't a Bash tool call ───────────────────
[[ "$tool_name" == "Bash" ]] || exit 0

# ── 3. Fast exit: does the command contain "git commit"? ────────────────────
# Handles plain `git commit`, chained `git add . && git commit`, etc.
if ! echo "$tool_input" | grep -qE '(^|[;&|]\s*)git\s+commit\b'; then
  exit 0
fi

# ── 4. Verify the commit actually succeeded ─────────────────────────────────
# Instead of parsing tool_output (which may contain unescaped newlines that
# break jq), check git state directly: compare HEAD before/after timestamp.
# If HEAD was updated within the last 5 seconds, the commit succeeded.
head_epoch="$(git log -1 --format='%ct' 2>/dev/null || echo '0')"
now_epoch="$(date +%s)"
if (( now_epoch - head_epoch > 5 )); then
  exit 0
fi

# ── 5. Gather commit metadata ──────────────────────────────────────────────
commit_hash="$(git log -1 --format='%h' 2>/dev/null || echo 'unknown')"
commit_subject="$(git log -1 --format='%s' 2>/dev/null || echo 'unknown')"
files_changed="$(git diff-tree --no-commit-id --name-only -r HEAD 2>/dev/null || echo 'unknown')"
diff_stat="$(git diff-tree --no-commit-id --stat -r HEAD 2>/dev/null || echo 'unknown')"

# For amend commits, note the special case
is_amend=""
if echo "$tool_input" | grep -qE '\-\-amend'; then
  is_amend=" (amend)"
fi

# ── 6. Build the context message ───────────────────────────────────────────
read -r -d '' context_message <<CMSG || true
A git commit${is_amend} just succeeded. Please evaluate whether CLAUDE.md or README.md need updating.

**Commit:** ${commit_hash} — ${commit_subject}

**Files changed:**
${files_changed}

**Diff stat:**
${diff_stat}

**Guidelines — decide based on what changed:**
- UPDATE docs if the commit introduced: new features, new components, architectural changes, new dependencies, new scripts/commands, new conventions, or config changes.
- SKIP docs if the commit is: a minor bug fix, a typo fix, a small tweak, test-only changes, or style-only changes.

**If you update docs:**
1. Edit CLAUDE.md and/or README.md as needed using the Edit tool.
2. Do NOT stage or commit the doc changes — leave them unstaged so the user can review.
3. Briefly tell the user what you updated and why.

**If no update is needed:**
- Briefly state that no doc update is required for this commit.
CMSG

# ── 7. Return JSON to Claude ───────────────────────────────────────────────
jq -n --arg msg "$context_message" '{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": $msg
  }
}'

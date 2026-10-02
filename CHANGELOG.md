# Changelog

## stage 1

The working agent.

### Added
- Agent loop with tool dispatch, round-trip, and a turn cap.
- 36 tools: system, web, email, task, session, memory, cronjob, process,
  browser, vision, delegate, inbox.
- 131 skills vendored as real `SKILL.md` files, trigger-matched and injected
  into the prompt only when relevant (60K char cap).
- SQLite session store with `--resume`.
- Cron that executes jobs through the agent (`tick` / `daemon` / `logs`).
- Interleaving: a task typed mid-run queues to an inbox and executes next;
  the terminal stays live. Plus `void queue add|list|clear` and the
  `queue_task` / `inbox_status` tools.
- CLI surface: chat, config, setup, model, auth, fallback, sessions, skills,
  cron, tools, queue, status, doctor, logs, memory, kanban, project, skin,
  pets, hooks, secrets, moa, mcp, webhooks.

### Fixed
- `email_list` never parsed a message: the parser split on `(ENVELOPE`, but
  IMAP sends `ENVELOPE (` with a space. Replaced with an S-expression parser.
- `email_send` reused the IMAP host for SMTP, failing TLS hostname checks on
  every send. Now derives `smtp.*` from `imap.*`.
- Malformed tool-call JSON raised out of the agent loop and killed the
  session. Now reported back to the model so it can correct itself.
- The install-permission prompt called `input()` inside the agent thread with
  no TTY, hanging the session. Now only prompts on a real interactive TTY.
- Skill matching required names of 4+ chars, making `pdf`, `docx`, `xlsx`,
  `box`, and `maps` unreachable. Now whole-word matching, no length guard.
- Injecting every skill into every prompt overflowed the context window.
  Now trigger-filtered with a size cap.

### Known gaps
- The `openai` provider entry points at an OpenRouter base_url, so it shares
  that quota.
- Skills are vendored copies; refreshing them is manual.
- No published package; installs via `pip install -e .`.

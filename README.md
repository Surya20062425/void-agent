# void — CLI agent

Stage 1. A CLI agent with a full tool, skill, session, and cron surface.

## Quick start

```bash
python -m pip install -e .
void setup                       # walkthrough: key -> base_url -> model
void chat                        # interactive
void chat -q "what time is it?"  # one-shot
```

## What it does

- **36 tools** across system, web, email, task, session, memory, cronjob,
  process, browser, vision, delegate, and inbox.
- **131 skills** vendored as real `SKILL.md` files in `~/.void/skills/`,
  trigger-matched and injected into the prompt only when relevant.
- **Sessions** persist to SQLite; `--resume` reloads history.
- **Cron** executes jobs through the agent (`tick` / `daemon` / `logs`).
- **Interleaving** — type a new task while the agent is working; it queues
  and runs next. The terminal stays live.

## Structure

```
void/
├── agent.py           # agent loop: model -> tool dispatch -> round-trip
├── cli.py             # argparse entry point, all subcommands
├── config.py          # ~/.void/config.json (key / base_url / model)
├── model.py           # OpenAI-format client + fallback chain
├── providers.py       # provider config
├── sessions.py        # SQLite session store
├── inbox.py           # task inbox (queue work into a running agent)
├── skills_catalog.py  # skill catalog
├── theme.py           # terminal theme
├── commands/          # model, auth, fallback, sessions, skills, cron, system
└── tools/             # one module per tool group, auto-discovered
```

## Commands

```
void chat [--resume <id>] [-q "<query>"]   chat with the agent
void queue add|list|clear                   queue tasks for a running agent
void sessions list|browse|export|prune      session management
void skills list|browse|search|inspect      skill management
void cron list|create|run|tick|daemon|logs  scheduled jobs
void tools list|enable|disable              tool management
void model / auth / fallback                provider config
void status / doctor / logs                 diagnostics
void memory / kanban / project / skin / pets / hooks / secrets / moa / mcp / webhooks
```

## Requirements

Python >= 3.10, `openai >= 1.0`. Optional: `playwright` for `browser_fetch`
and `browser_click`.

## Tests

```bash
python test_surface.py            # tools registered, schemas valid
python test_capabilities.py       # sessions, cron, gating, fallback
python test_all_tools.py          # every tool, realistic scenarios
python test_all_skills.py         # every skill resolves and matches
python test_all_commands.py       # every CLI command
python test_interleave.py         # mid-run task queueing
python test_untested.py           # hooks, moa, cron daemon, logging
python test_void_comprehensive.py # full functional sweep
```

## Status — stage 1

Working: the agent loop, all tools, skill injection, sessions, cron,
interleaving, and the CLI surface.

Known gaps, deferred to a later stage:

- Provider config needs attention: the `openai` entry points at an
  OpenRouter base_url, so it shares OpenRouter's quota.
- Skills are vendored copies; refreshing them is a manual step.
- No packaging/publish yet (installs via `pip install -e .`).

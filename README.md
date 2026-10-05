# void-cli — CLI agent

A CLI agent with tools, skills, sessions, cron, and provider fallback — installable via `pip` or `npx`.

## Quick start

```bash
# Python (recommended)
pip install -e .
void setup                       # walkthrough: key -> base_url -> model
void chat                        # interactive
void chat -q "what time is it?"  # one-shot

# NPX (delegates to Python if installed)
npx void-cli setup
npx void-cli chat -q "hello"
```

## What it does

- **36 tools** across system, web, email, task, session, memory, cronjob, process, browser, vision, delegate, and inbox
- **131 skills** vendored as real `SKILL.md` files in `~/.void/skills/`, trigger-matched and injected only when relevant
- **Sessions** persist to SQLite; `--resume` reloads history
- **Cron** executes jobs through the agent (`tick` / `daemon` / `logs`)
- **Provider fallback** — NVIDIA, Ollama, OpenRouter, OpenAI, etc. with automatic failover
- **Interleaving** — type a new task while the agent is working; it queues and runs next. The terminal stays live

## Structure

```
void/
├── agent.py           # agent loop: model → tool dispatch → round-trip
├── cli.py             # argparse entry point, all subcommands
├── config.py          # ~/.void/config.json (key / base_url / model)
├── model.py           # OpenAI-format client + fallback chain (Ollama Cloud supported)
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
void queue add|list|clear                  queue tasks for a running agent
void sessions list|browse|export|prune      session management
void skills list|browse|search|inspect      skill management
void cron list|create|run|tick|daemon|logs  scheduled jobs
void tools list|enable|disable              tool management
void model / auth / fallback                provider config
void email config|test                      email (IMAP/SMTP) setup & test
void github config|test                     GitHub token setup & verify
void status / doctor / logs                 diagnostics
void memory / kanban / project / skin / pets / hooks / secrets / moa / mcp / webhooks
```

## Requirements

- Python >= 3.10
- Core deps: `openai>=1.0`, `requests>=2.31`, `beautifulsoup4>=4.12`, `pyyaml>=6.0`
- Optional: `playwright>=1.40` for `browser_fetch` / `browser_click`

## Installation

```bash
# Development (editable)
pip install -e .

# Or from GitHub
pip install git+https://github.com/Surya20062425/void.git

# NPX (requires Python + pip install first)
npx void-cli
```

## Configuration

Config lives in `~/.void/config.json`:

- **Providers** — `void auth add <name>` → API key, base URL, models
- **Model** — `void model set <provider/model>` or interactive picker
- **Fallback** — `void fallback set nvidia ollama openrouter`
- **Email** — `void email config` → IMAP host/user/pass (SMTP derived)
- **GitHub** — `void github config` → PAT with `repo` scope

## Status

Working: agent loop, all tools, skill injection, sessions, cron, interleaving, provider fallback, email/GitHub config, pip/npx distribution.

Known gaps:
- Skills are vendored copies; refreshing is manual
- Ollama Cloud free tier may hit 402/429 limits
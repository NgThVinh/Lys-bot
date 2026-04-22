# Overview

Personal Discord bot powered by **discord.js v14** and **Node.js 20**.

## What it does

- Responds to slash commands, message (prefix) commands, and context menu commands
- Provides utility commands (ping, time, prefix management)
- Developer tools (eval, reload, sysinfo, status)
- Moderation tools (enable/disable commands)
- Interactive UI components (buttons, modals, select menus, autocomplete)
- Per-guild configuration via YAML database
- Status rotation with configurable messages and interval

## Quick Stats

| Item | Detail |
|------|--------|
| Framework | discord.js v14 |
| Language | JavaScript (CommonJS) |
| Node | 20+ |
| Database | QuickYAML (YAML file) |
| Process manager | PM2 / Docker |
| CI/CD | GitHub Actions + Self-hosted runner |

## Environments

| Env | Branch | Deploy target | Dev mode |
|-----|--------|---------------|----------|
| Production | `main` | Mini PC (prod container) | `false` |
| Development | `dev` | Mini PC (dev container) | `true` |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `CLIENT_TOKEN` | Discord bot token |
| `BOT_OWNER_ID` | Discord user ID of bot owner |
| `BOT_DEVELOPER_IDS` | Comma-separated developer user IDs |
| `DEV_MODE` | `true` = register to dev guild only |
| `DEV_GUILD_ID` | Guild ID for dev mode command registration |
| `NODE_ENV` | `production` or `development` |

## Bot Features

- **Command deduplication** — duplicate command names across files are auto-skipped
- **Dev mode** — clears global commands before registering to dev guild
- **Status rotation** — cycles through status messages at configurable interval
- **Cooldown system** — per-command cooldowns with localized messages
- **Permission tiers** — bot owner → developers → guild owner → user permissions

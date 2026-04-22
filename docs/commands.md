# Bot Commands

Personal Discord bot powered by discord.js v14.

## Slash Commands

### Information

| Command | Description | Options |
|---------|-------------|----------|
| `/help` | Replies with a list of available application commands | — |

### Other

| Command | Description | Options |
|---------|-------------|----------|
| `/autocomplete` | Autocomplete interaction example | `option` (required) |
| `/components` | Replies with example buttons and select menus | — |
| `/show-modal` | Opens a modal | — |

### Utility

| Command | Description | Options |
|---------|-------------|----------|
| `/ping` | Check bot latency | — |
| `/time` | Check current Vietnam time | — |
| `/prefix` | Show current server prefix | — |
| `/say <text>` | Echo a message (requires `ManageMessages`) | `text` (required) |

---

## Message Commands (Prefix)

Prefix: `?` (configurable per guild)

### Developer

| Command | Aliases | Description |
|---------|---------|-------------|
| `?botstatus` | `?bstt` | Show bot status, or set status with args |
| `?sysinfo` | — | Display system information |
| `?botperms` | — | Check bot permissions in a channel |

---

## Context Menu Commands

| Command | Type | Description |
|---------|------|-------------|
| `User Information` | User Context | Displays user info |
| `Message Information` | Message Context | Displays message info |

---

## Components (Interactive UI)

| Component | Description |
|-----------|-------------|
| Button | Example button component |
| Select Menu | Example select menu component |
| Modal | Example modal component |
| Autocomplete | Linked to `/autocomplete` |

---

## Permission Tiers

- **Bot Owner** — `BOT_OWNER_ID` only
- **Bot Developers** — `BOT_DEVELOPER_IDS` list
- **Guild Owner** — server owner only

Slash commands without explicit permissions are public.

## Command Cooldowns

Cooldown messages: `You are currently in cooldown, you have the ability to re-use this command again in Xs.`

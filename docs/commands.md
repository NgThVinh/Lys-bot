# Bot Commands

Personal Discord bot powered by discord.js v14.

## Slash Commands

### Developer

| Command | Description | Options |
|---------|-------------|----------|
| `/botperms` | Check bot permissions in a channel | `channel` (optional) |
| `/setstatus <status>` | Change the bot's presence status | `status` (required) |
| `/shutdown` | Shuts down the bot | — |
| `/status` | Displays the current status of the bot | — |
| `/sysinfo` | Displays system information | — |
| `/eval <code>` | Execute JavaScript code | `code` (required) |
| `/reload` | Reload every command | — |

### Information

| Command | Description | Options |
|---------|-------------|----------|
| `/help` | Replies with a list of available application commands | — |

### Moderation

| Command | Description | Options |
|---------|-------------|----------|
| `/disable <command>` | Disable a command | `command` (required) |
| `/enable <command>` | Enable a disabled command | `command` (required) |

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
| `/say <text>` | Echo a message | `text` (required) |

---

## Message Commands (Prefix)

Prefix: `?` (configurable per guild)

### Developer

| Command | Aliases | Description |
|---------|---------|-------------|
| `?shutdown` | — | Shuts down the bot |
| `?status` | `?stt` | Displays current bot status |
| `?eval <code>` | `?ev` | Execute JavaScript code |
| `?reload` | — | Reload every command |

### Information

| Command | Aliases | Description |
|---------|---------|-------------|
| `?help` | `?h` | Replies with available message commands |

### Moderation

| Command | Description |
|---------|-------------|
| `?disable <command>` | Disable a command (requires `ManageMessages`) |
| `?enable <command>` | Enable a disabled command (requires `ManageMessages`) |

### Utility

| Command | Aliases | Description |
|---------|---------|-------------|
| `?ping` | `?p` | Replies with Pong! (requires `SendMessages`) |
| `?checktime` | `?time` | Check current Vietnam time |
| `?prefix` | — | Show current server prefix |
| `?say <text>` | `?s` | Echo a message (`-r` flag deletes original) |
| `?setprefix <prefix>` | — | Set prefix for this guild (max 5 chars) |

---

## Context Menu Commands

| Command | Type | Description |
|---------|------|-------------|
| `User Information` | User Context | Displays user info (displayname, bot status, guild owner status) |
| `Message Information` | Message Context | Displays message info (author, content, attachments) |

---

## Components (Interactive UI)

| Component | Custom ID | Description |
|-----------|----------|-------------|
| Button | `example-button-id` | Example button component |
| Select Menu | `example-menu-id` | Example select menu component |
| Modal | `example-modal-id` | Example modal component |
| Autocomplete | linked to `/autocomplete` | Autocomplete example |

---

## Permission Checks

Commands enforce permission tiers:

- **Bot Owner** — `BOT_OWNER_ID` only
- **Bot Developers** — `BOT_DEVELOPER_IDS` list
- **Guild Owner** — server owner only
- **User Permissions** — channel-specific checks (e.g. `ManageMessages`)

## Command Cooldowns

Cooldown messages are shown as:
```
You are currently in cooldown, you have the ability to re-use this command again in `Xs`.
```

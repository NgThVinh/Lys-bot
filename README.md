# Lys Bot

Personal Discord bot powered by discord.js v14.

## Setup

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (for deployment)
- Discord bot token

### Local Development

**1. Clone and install dependencies**

```bash
git clone https://github.com/NgThVinh/lys-bot.git
cd lys-bot
npm install
```

**2. Configure environment**

```bash
cp .env.example .env
```

Edit `.env` with your values:

```
CLIENT_TOKEN=your_bot_token
BOT_OWNER_ID=your_discord_user_id
BOT_DEVELOPER_IDS=id1,id2
DEV_MODE=true
DEV_GUILD_ID=your_dev_guild_id
```

**3. Copy and edit config**

```bash
cp src/example.config.js src/config.js
```

**4. Start the bot**

```bash
npm start
```

### Docker (Production)

```bash
docker compose up -d --build
```

### GitHub Actions CI/CD

Secrets required in GitHub repo Settings → Secrets:

| Secret | Description |
|--------|-------------|
| `CLIENT_TOKEN_PROD` | Production bot token |
| `CLIENT_TOKEN_DEV` | Development bot token |
| `BOT_OWNER_ID` | Bot owner Discord ID |
| `BOT_DEVELOPER_IDS` | Comma-separated developer IDs |
| `DEV_GUILD_ID` | Dev guild ID |

Branches:
- `dev` — deploys to dev container, `DEV_MODE=true`
- `main` — deploys to prod container, `DEV_MODE=false`

## Bot Commands

See [docs/commands.md](docs/commands.md) for full command list.

## Documentation

- [Overview](docs/overview.md) — Project summary
- [Architecture](docs/architecture.md) — System design
- [Commands](docs/commands.md) — Command inventory

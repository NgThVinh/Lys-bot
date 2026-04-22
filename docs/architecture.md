# Architecture

## Project Structure

```
lys-bot/
├── src/
│   ├── index.js                 # Entry point — creates client, connects
│   ├── config.js                # Runtime config from env vars
│   ├── client/
│   │   ├── DiscordBot.js        # discord.js Client subclass
│   │   └── handler/
│   │       ├── CommandsHandler.js     # Loads + registers slash/msg commands
│   │       ├── CommandsListener.js    # Listens for message commands
│   │       ├── ComponentsHandler.js   # Loads buttons, modals, selects, autocomplete
│   │       ├── ComponentsListener.js  # Handles component interactions
│   │       ├── CommandOptions.js      # Permission/cooldown logic
│   │       └── EventsHandler.js      # Loads client event listeners
│   ├── commands/
│   │   ├── Developer/           # eval, reload, shutdown, status, sysinfo
│   │   ├── Information/         # help
│   │   ├── Moderation/         # enable, disable
│   │   ├── Other/              # autocomplete, components, show-modal, context menus
│   │   └── Utility/            # ping, checktime, prefix, say
│   ├── components/
│   │   ├── Button/
│   │   ├── Modal/
│   │   ├── SelectMenu/
│   │   └── autocomplete/
│   ├── structure/              # Command/component/event class wrappers
│   └── utils/
│       └── Console.js          # Colored console logger
├── docs/
│   ├── commands.md             # Command inventory
│   └── overview.md             # Project overview
├── docker-compose.yml          # Container orchestration
├── Dockerfile                  # Container image
├── eslint.config.js            # ESLint flat config
├── .prettierrc                # Prettier formatting rules
└── package.json
```

## Startup Flow

```
src/index.js
  └── new DiscordBot()
        ├── collection = { application_commands, message_commands, ... }
        ├── database = QuickYAML
        └── connect()
              ├── login(CLIENT_TOKEN)
              ├── commands_handler.load()    → loads all command files
              ├── components_handler.load()  → loads all components
              ├── events_handler.load()      → loads all events
              ├── startStatusRotation()       → setInterval for presence
              └── registerApplicationCommands()  → Discord REST API
```

## Command Loading

`CommandsHandler.load()` iterates `src/commands/<category>/` files:

1. `require()` each `.js` file
2. Check `__type__` — `1` = application command, `2` = message command
3. Deduplicate by `command.name` (skip if already exists)
4. Add to `collection` and `rest_application_commands_array`
5. `registerApplicationCommands()` sends to Discord REST API

## Permission Flow

```
Command triggered
  └── CommandOptions.js checks:
        ├── botOwner → BOT_OWNER_ID
        ├── botDevelopers → BOT_DEVELOPER_IDS
        ├── guildOwner → message.guild.ownerId
        ├── requiredPermissions → channel permissions
        ├── nsfw → channel is NSFW
        └── cooldown → per-user cooldown map
  └── Pass → execute command.run()
  └── Fail → send localized error message
```

## Configuration (`src/config.js`)

Config is a plain JS object read from environment variables at startup:

```javascript
{
  database: { path: './database.yml' },
  development: { enabled: DEV_MODE === 'true', guildId: DEV_GUILD_ID },
  status: [...],
  status_rotation_interval: 4000,
  commands: { prefix, message_commands, application_commands: {...} },
  users: { ownerId, developers },
  messages: { NOT_BOT_OWNER, NOT_BOT_DEVELOPER, ... }
}
```

## CI/CD Pipeline

```
Push to dev/main
  ├── CI (ubuntu-latest)
  │     ├── npm ci
  │     ├── npm run lint
  │     └── npm test
  │
  └── CD (self-hosted) — only on push, requires CI pass
        ├── Determine env (PROJECT_NAME, DEPLOY_DIR)
        ├── Checkout to ~/deploy-{env}
        ├── Inject secrets → .env file
        ├── docker compose -p {project} up -d --build
        └── docker image prune -f
```

## Docker Deployment

Two isolated containers on the same Mini PC:

| Container | Branch | Env var file |
|-----------|--------|-------------|
| `bot-prod` | `main` | `.env` (prod secrets) |
| `bot-dev` | `dev` | `.env` (dev secrets) |

Each container:
- Builds from `Dockerfile` (Node 20 Alpine)
- Mounts `.env` and `database.yml`
- Auto-restarts (`unless-stopped`)
- Isolated bridge network

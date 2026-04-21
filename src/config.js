const config = {
  database: {
    path: './database.yml', // The database path.
  },
  development: {
    enabled: process.env.DEV_MODE === 'true', // If true, the bot will register all application commands to a specific guild (not globally).
    guildId: process.env.DEV_GUILD_ID || '',
  },
  status: [{ name: 'Nà ná na na~', type: 4 }],
  status_rotation_interval: 4000,
  commands: {
    prefix: '?', // For message commands, prefix is required. This can be changed by a database.
    message_commands: true, // If true, the bot will allow users to use message (or prefix) commands.
    application_commands: {
      chat_input: true, // If true, the bot will allow users to use chat input (or slash) commands.
      user_context: true, // If true, the bot will allow users to use user context menu commands.
      message_context: true, // If true, the bot will allow users to use message context menu commands.
    },
  },
  users: {
    ownerId: process.env.BOT_OWNER_ID || '', // The bot owner ID, which is you.
    developers: process.env.BOT_DEVELOPER_IDS ? process.env.BOT_DEVELOPER_IDS.split(',') : [], // The bot developers, remember to include your account ID with the other account IDs.
  },
  messages: {
    NOT_BOT_OWNER: '❌ Bạn không có quyền thực thi lệnh này vì bạn không phải là Owner của tôi!',
    NOT_BOT_DEVELOPER: '❌ Bạn không có quyền thực thi lệnh này vì bạn không phải là Developer!',
    NOT_GUILD_OWNER: '❌ Bạn không có quyền thực thi lệnh này vì bạn không phải là Chủ Server!',
    CHANNEL_NOT_NSFW: '🔞 Lệnh này chỉ được dùng trong kênh NSFW!',
    MISSING_PERMISSIONS: '⚠️ Bạn không có đủ quyền hạn để dùng lệnh này.',
    COMPONENT_NOT_PUBLIC: '🚫 Bạn không phải là người tạo ra nút bấm này!',
    GUILD_COOLDOWN: '⏳ Bạn đang trong thời gian chờ, vui lòng thử lại sau `%cooldown%s`.',
  },
};

module.exports = config;

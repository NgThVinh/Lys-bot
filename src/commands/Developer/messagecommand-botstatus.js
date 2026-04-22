const { EmbedBuilder } = require('discord.js');
const { ActivityType } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');

module.exports = new MessageCommand({
  command: {
    name: 'botstatus',
    aliases: ['bstt'],
    description: 'Show bot status, or set status text with a message',
  },
  options: {
    botOwner: true,
    cooldown: 5000,
  },
  run: async (client, message, args) => {
    if (!args[0]) {
      const guilds = client.guilds.cache.size;
      const users = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
      const channels = client.channels.cache.size;
      const uptimeSeconds = Math.floor((Date.now() - client.readyTimestamp) / 1000);
      const latency = client.ws.ping;

      const embed = new EmbedBuilder()
        .setTitle('❯ Bot Status')
        .addFields(
          { name: 'Guilds', value: String(guilds), inline: true },
          { name: 'Users', value: String(users), inline: true },
          { name: 'Channels', value: String(channels), inline: true },
          { name: 'Uptime', value: formatUptime(uptimeSeconds), inline: true },
          { name: 'Latency', value: `${latency}ms`, inline: true }
        );

      message.reply({ embeds: [embed] });
    } else {
      const statusText = args.join(' ');
      client.user.setPresence({
        activities: [{ name: statusText, type: ActivityType.Playing }],
      });
      message.reply(`Status changed to: ${statusText}`);
    }
  },
}).toJSON();

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

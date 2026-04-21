const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');

module.exports = new MessageCommand({
  command: {
    name: 'status',
    aliases: ['stt'],
    description: 'Displays the current status of the bot',
  },
  options: {
    botOwner: true,
    cooldown: 5000,
  },
  run: async (client, message, args) => {
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
  },
}).toJSON();

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

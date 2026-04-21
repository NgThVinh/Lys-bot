const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');

module.exports = new MessageCommand({
  command: {
    name: 'ping',
    description: 'Check bot latency',
  },
  options: {
    cooldown: 10000,
  },
  run: async (client, message, args) => {
    const latency = Math.round(client.ws.ping);
    const embed = new EmbedBuilder()
      .setDescription(`**Pong!** \`${latency}ms\``)
      .setColor(0x5acff5);
    message.reply({ embeds: [embed], flags: 64 });
  },
}).toJSON();

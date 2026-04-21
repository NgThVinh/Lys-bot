const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');

module.exports = new MessageCommand({
  command: {
    name: 'say',
    aliases: ['s'],
    description: 'Echo a message',
  },
  options: {
    cooldown: 5000,
  },
  run: async (client, message, args) => {
    let text = args.join(' ');
    if (!text) return;

    if (text.toLowerCase().startsWith('-r')) {
      text = text.slice(3).trim();
      await message.delete().catch(() => {});
    } else if (text.toLowerCase().endsWith('-r')) {
      text = text.slice(0, -2).trim();
      await message.delete().catch(() => {});
    }

    if (text) {
      message.channel.send(text);
    }
  },
}).toJSON();

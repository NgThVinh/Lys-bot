const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');

module.exports = new MessageCommand({
  command: {
    name: 'setprefix',
    description: 'Change the bot prefix for this server',
    aliases: ['prefixset', 'changeprefix'],
  },
  options: {
    cooldown: 5000,
    botDevelopers: true,
  },
  run: async (client, message, args) => {
    const newPrefix = args[0];

    if (!newPrefix) {
      return message.reply('Please provide a new prefix.');
    }

    if (newPrefix.length > 5) {
      return message.reply('Prefix cannot be longer than 5 characters.');
    }

    client.database.set('prefix-' + message.guild.id, newPrefix);

    const embed = new EmbedBuilder()
      .setDescription(`✅ Successfully changed the prefix to \`${newPrefix}\``)
      .setColor(0x5acff5);

    message.reply({ embeds: [embed] });
  },
}).toJSON();

const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

module.exports = new ApplicationCommand({
  command: {
    name: 'setprefix',
    description: 'Change the bot prefix for this server',
    type: 1,
    options: [
      {
        name: 'new_prefix',
        description: 'The new prefix you want to set',
        type: 3, // STRING
        required: true,
      },
    ],
  },
  options: {
    cooldown: 5000,
    botDevelopers: true,
  },
  run: async (client, interaction) => {
    const newPrefix = interaction.options.getString('new_prefix');

    if (newPrefix.length > 5) {
      return interaction.reply({
        content: 'Prefix cannot be longer than 5 characters.',
        flags: 64,
      });
    }

    client.database.set('prefix-' + interaction.guild.id, newPrefix);

    const embed = new EmbedBuilder()
      .setDescription(`✅ Successfully changed the prefix to \`${newPrefix}\``)
      .setColor(0x5acff5);

    interaction.reply({ embeds: [embed] });
  },
}).toJSON();

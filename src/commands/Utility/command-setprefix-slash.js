const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

module.exports = new ApplicationCommand({
  command: {
    name: 'setprefix',
    description: 'Set a custom prefix for this server (Admin only)',
    type: 1,
    options: [
      {
        name: 'prefix',
        description: 'The new prefix to set',
        type: 3,
        required: true,
      },
    ],
  },
  options: {
    cooldown: 10000,
  },
  run: async (client, interaction) => {
    const newPrefix = interaction.options.getString('prefix', true);
    const guildId = interaction.guild.id;

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      await interaction.reply({
        content: '❌ You need Administrator permission to use this command.',
        flags: 64,
      });
      return;
    }

    client.database.set('prefix-' + guildId, newPrefix);

    const embed = new EmbedBuilder()
      .setDescription(`✅ Prefix has been set to \`${newPrefix}\``)
      .setColor(0x5acff5);

    await interaction.reply({ embeds: [embed] });
  },
}).toJSON();

const { EmbedBuilder } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

module.exports = new ApplicationCommand({
  command: {
    name: 'botperms',
    description: 'Check bot permissions in a channel',
    type: 1,
    options: [
      {
        name: 'channel',
        description: 'The channel to check (defaults to current channel)',
        type: 7,
        required: false,
      },
    ],
  },
  options: {
    botOwner: true,
    cooldown: 5000,
  },
  run: async (client, interaction) => {
    const channel = interaction.options.getChannel('channel') || interaction.channel;
    const botMember = channel.guild.members.cache.get(client.user.id);

    if (!botMember) {
      await interaction.reply({ content: 'Bot is not in this channel.', flags: 64 });
      return;
    }

    const permissions = channel.permissionsFor(botMember);
    const checkPerms = key => (permissions.has(key) ? '✅' : '❌');

    const embed = new EmbedBuilder()
      .setTitle('❯ Bot Permissions')
      .setDescription(`**Channel:** ${channel}`)
      .addFields(
        {
          name: 'General',
          value: [
            `View Channel: ${checkPerms('ViewChannel')}`,
            `Manage Channel: ${checkPerms('ManageChannels')}`,
            `Manage Permissions: ${checkPerms('ManagePermissions')}`,
            `Create Invite: ${checkPerms('CreateInstantInvite')}`,
          ].join('\n'),
          inline: true,
        },
        {
          name: 'Text',
          value: [
            `Send Messages: ${checkPerms('SendMessages')}`,
            `Embed Links: ${checkPerms('EmbedLinks')}`,
            `Attach Files: ${checkPerms('AttachFiles')}`,
            `Manage Messages: ${checkPerms('ManageMessages')}`,
            `Read History: ${checkPerms('ReadMessageHistory')}`,
          ].join('\n'),
          inline: true,
        },
        {
          name: 'Voice',
          value: [
            `Connect: ${checkPerms('Connect')}`,
            `Speak: ${checkPerms('Speak')}`,
            `Mute Members: ${checkPerms('MuteMembers')}`,
          ].join('\n'),
          inline: true,
        }
      );

    await interaction.reply({ embeds: [embed] });
  },
}).toJSON();

const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');

module.exports = new MessageCommand({
  command: {
    name: 'botperms',
    description: 'Check bot permissions in a channel',
  },
  options: {
    botOwner: true,
    cooldown: 5000,
  },
  run: async (client, message, args) => {
    const channel = message.mentions.channels.first() || message.channel;
    const botMember = channel.guild.members.cache.get(client.user.id);

    if (!botMember) {
      await message.reply('Bot is not in this channel.');
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

    await message.reply({ embeds: [embed] });
  },
}).toJSON();

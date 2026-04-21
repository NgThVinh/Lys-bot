const ApplicationCommand = require('../../structure/ApplicationCommand');
const { ActivityType } = require('discord.js');

module.exports = new ApplicationCommand({
  command: {
    name: 'setstatus',
    description: "Change the bot's presence status",
    type: 1,
    options: [
      {
        name: 'status',
        description: 'The status text',
        type: 3,
        required: true,
      },
    ],
  },
  options: {
    botOwner: true,
    cooldown: 5000,
  },
  run: async (client, interaction) => {
    const status = interaction.options.getString('status', true);
    client.user.setPresence({
      activities: [{ name: status, type: ActivityType.Playing }],
    });
    await interaction.reply(`Status changed to: ${status}`, { flags: 64 });
  },
}).toJSON();

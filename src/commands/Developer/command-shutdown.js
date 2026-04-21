const ApplicationCommand = require('../../structure/ApplicationCommand');

module.exports = new ApplicationCommand({
  command: {
    name: 'shutdown',
    description: 'Shuts down the bot',
    type: 1,
    options: [],
  },
  options: {
    botOwner: true,
    cooldown: 5000,
  },
  run: async (client, interaction) => {
    await interaction.reply('Shutting down...');
    process.exit(0);
  },
}).toJSON();

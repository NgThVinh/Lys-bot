const { EmbedBuilder } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

module.exports = new ApplicationCommand({
  command: {
    name: 'say',
    description: 'Echo a message',
    type: 1,
    options: [
      {
        name: 'text',
        description: 'The text to echo',
        type: 3,
        required: true,
      },
    ],
  },
  options: {
    cooldown: 5000,
  },
  run: async (client, interaction) => {
    const text = interaction.options.getString('text', true);
    interaction.reply(text);
  },
}).toJSON();

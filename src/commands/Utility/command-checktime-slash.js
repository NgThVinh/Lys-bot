const { EmbedBuilder } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

function getVietnamTime() {
  const now = new Date();
  const vnTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
  return vnTime.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

module.exports = new ApplicationCommand({
  command: {
    name: 'time',
    description: 'Check current Vietnam time',
    type: 1,
  },
  options: {
    cooldown: 10000,
  },
  run: async (client, interaction) => {
    const embed = new EmbedBuilder().setDescription(getVietnamTime()).setColor(0x5acff5);
    interaction.reply({ embeds: [embed], flags: 64 });
  },
}).toJSON();

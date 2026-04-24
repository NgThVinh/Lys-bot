const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

module.exports = new ApplicationCommand({
  command: {
    name: 'personality',
    description: 'Thiết lập nhân cách cho bot',
    type: 1,
    options: [
      {
        name: 'set',
        description: 'Chọn nhân cách mới cho bot',
        type: 3, // STRING
        required: true,
        choices: [
          { name: 'Mặc định (Thân thiện)', value: 'default' },
          { name: 'Tsundere (Nắng mưa)', value: 'tsundere' },
          { name: 'Toxic Gamer (Cà khịa)', value: 'toxic_gamer' },
          { name: 'Trợ lý tận tâm', value: 'helpful_assistant' },
          { name: 'Nhà triết học', value: 'philosopher' }
        ]
      }
    ],
    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
  },
  options: {
    cooldown: 5000,
  },
  run: async (client, interaction) => {
    const newPersonality = interaction.options.getString('set');

    client.database.set(`personality-${interaction.guild.id}`, newPersonality);

    const names = {
      default: 'Mặc định (Thân thiện)',
      tsundere: 'Tsundere (Nắng mưa)',
      toxic_gamer: 'Toxic Gamer (Cà khịa)',
      helpful_assistant: 'Trợ lý tận tâm',
      philosopher: 'Nhà triết học'
    };

    const embed = new EmbedBuilder()
      .setTitle('🎭 Đã thay đổi nhân cách!')
      .setDescription(`Nhân cách của tôi tại server này giờ là: **${names[newPersonality]}**`)
      .setColor(0x5acff5)
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
}).toJSON();

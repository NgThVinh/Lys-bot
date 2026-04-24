const { EmbedBuilder } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');
const { generateAIResponse } = require('../../utils/ai');

module.exports = new ApplicationCommand({
  command: {
    name: 'social',
    description: 'Roast hoặc Khen ngợi một người dùng dựa trên AI',
    type: 1,
    options: [
      {
        name: 'roast',
        description: 'Roast một người dùng',
        type: 1, // SUB_COMMAND
        options: [
          {
            name: 'user',
            description: 'Người bạn muốn roast',
            type: 6, // USER
            required: true
          }
        ]
      },
      {
        name: 'compliment',
        description: 'Khen ngợi một người dùng',
        type: 1, // SUB_COMMAND
        options: [
          {
            name: 'user',
            description: 'Người bạn muốn khen',
            type: 6, // USER
            required: true
          }
        ]
      }
    ]
  },
  options: {
    cooldown: 10000,
  },
  run: async (client, interaction) => {
    const subCommand = interaction.options.getSubcommand();
    const targetUser = interaction.options.getUser('user');
    
    await interaction.deferReply();

    const personality = client.database.get(`personality-${interaction.guild.id}`) || 'default';
    const targetStats = client.database.get(`userstats-${targetUser.id}`) || { toxicScore: 0, helpfulScore: 0 };
    
    let prompt = '';
    if (subCommand === 'roast') {
      prompt = `Hãy roast người dùng này: ${targetUser.username}. 
      Thông tin thêm: Người này có điểm toxic là ${targetStats.toxicScore} và điểm tốt bụng là ${targetStats.helpfulScore}.
      Hãy roast dựa trên các chỉ số này một cách hài hước và mỉa mai theo nhân cách của bạn.`;
    } else {
      prompt = `Hãy khen ngợi người dùng này: ${targetUser.username}. 
      Thông tin thêm: Người này có điểm toxic là ${targetStats.toxicScore} và điểm tốt bụng là ${targetStats.helpfulScore}.
      Hãy khen ngợi dựa trên các chỉ số này một cách chân thành (hoặc theo kiểu của nhân cách bạn).`;
    }

    const aiReply = await generateAIResponse(prompt, personality, {});
    
    const embed = new EmbedBuilder()
      .setAuthor({ name: subCommand === 'roast' ? '🔥 AI Roast' : '💖 AI Compliment', iconURL: targetUser.displayAvatarURL() })
      .setDescription(aiReply)
      .setColor(subCommand === 'roast' ? 0xff4d4d : 0xffcc00)
      .setFooter({ text: `Dành cho: ${targetUser.tag}` });

    interaction.editReply({ embeds: [embed] });
  },
}).toJSON();

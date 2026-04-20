const { EmbedBuilder } = require("discord.js");
const ApplicationCommand = require("../../structure/ApplicationCommand");

module.exports = new ApplicationCommand({
    command: {
        name: 'ping',
        description: 'Check bot latency',
        type: 1
    },
    options: {
        cooldown: 10000
    },
    run: async (client, interaction) => {
        const latency = Math.round(client.ws.ping);
        const embed = new EmbedBuilder()
            .setDescription(`**Pong!** \`${latency}ms\``)
            .setColor(0x5ACFF5);
        interaction.reply({ embeds: [embed], flags: 64 });
    }
}).toJSON();
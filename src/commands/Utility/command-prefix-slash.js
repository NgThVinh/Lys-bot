const { EmbedBuilder } = require("discord.js");
const ApplicationCommand = require("../../structure/ApplicationCommand");
const config = require("../../config");

module.exports = new ApplicationCommand({
    command: {
        name: 'prefix',
        description: 'Show current server prefix',
        type: 1
    },
    options: {
        cooldown: 10000
    },
    run: async (client, interaction) => {
        let prefix = config.commands.prefix;
        if (client.database.has('prefix-' + interaction.guild.id)) {
            prefix = client.database.get('prefix-' + interaction.guild.id);
        }
        const embed = new EmbedBuilder()
            .setDescription(`The prefix for this server is \`${prefix}\``)
            .setColor(0x5ACFF5);
        interaction.reply({ embeds: [embed], flags: 64 });
    }
}).toJSON();
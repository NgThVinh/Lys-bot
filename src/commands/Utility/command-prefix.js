const { EmbedBuilder } = require("discord.js");
const MessageCommand = require("../../structure/MessageCommand");
const config = require("../../config");

module.exports = new MessageCommand({
    command: {
        name: 'prefix',
        description: 'Show current server prefix'
    },
    options: {
        cooldown: 10000
    },
    run: async (client, message, args) => {
        let prefix = config.commands.prefix;
        if (client.database.has('prefix-' + message.guild.id)) {
            prefix = client.database.get('prefix-' + message.guild.id);
        }
        const embed = new EmbedBuilder()
            .setDescription(`The prefix for this server is \`${prefix}\``)
            .setColor(0x5ACFF5);
        message.reply({ embeds: [embed], flags: 64 });
    }
}).toJSON();
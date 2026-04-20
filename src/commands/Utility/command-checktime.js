const { EmbedBuilder } = require("discord.js");
const MessageCommand = require("../../structure/MessageCommand");

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
        hour12: false
    });
}

module.exports = new MessageCommand({
    command: {
        name: 'checktime',
        aliases: ['time'],
        description: 'Check current Vietnam time'
    },
    options: {
        cooldown: 10000
    },
    run: async (client, message, args) => {
        const embed = new EmbedBuilder()
            .setDescription(getVietnamTime())
            .setColor(0x5ACFF5);
        message.reply({ embeds: [embed], flags: 64 });
    }
}).toJSON();
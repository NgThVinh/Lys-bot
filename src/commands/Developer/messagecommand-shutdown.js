const MessageCommand = require("../../structure/MessageCommand");

module.exports = new MessageCommand({
    command: {
        name: 'shutdown',
        description: 'Shuts down the bot'
    },
    options: {
        botOwner: true,
        cooldown: 5000
    },
    run: async (client, message, args) => {
        message.reply('Shutting down...');
        process.exit(0);
    }
}).toJSON();
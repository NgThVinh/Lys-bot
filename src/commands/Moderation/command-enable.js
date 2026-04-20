const MessageCommand = require("../../structure/MessageCommand");

module.exports = new MessageCommand({
    command: {
        name: 'enable',
        description: 'Enable a disabled command'
    },
    options: {
        cooldown: 10000,
        nsfw: false
    },
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ManageMessages')) {
            message.reply('You need Manage Messages permission to use this command.');
            return;
        }

        const commandName = args[0];
        if (!commandName) {
            message.reply('Please specify a command name.');
            return;
        }

        const command = client.collection.message_commands.get(commandName);
        if (!command) {
            message.reply('Command not found.');
            return;
        }

        command.enabled = true;
        message.reply(`Command \`${commandName}\` has been enabled.`);
    }
}).toJSON();
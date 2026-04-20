const { EmbedBuilder } = require("discord.js");
const ApplicationCommand = require("../../structure/ApplicationCommand");

module.exports = new ApplicationCommand({
    command: {
        name: 'disable',
        description: 'Disable a command',
        type: 1,
        options: [
            {
                name: 'command',
                description: 'The command name to disable',
                type: 3,
                required: true
            }
        ]
    },
    options: {
        cooldown: 10000
    },
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('ManageMessages')) {
            interaction.reply({ content: 'You need Manage Messages permission.', flags: 64 });
            return;
        }

        const commandName = interaction.options.getString('command', true);
        const command = client.collection.message_commands.get(commandName);

        if (!command) {
            interaction.reply({ content: 'Command not found.', flags: 64 });
            return;
        }

        command.enabled = false;
        interaction.reply({ content: `Command \`${commandName}\` has been disabled.`, flags: 64 });
    }
}).toJSON();
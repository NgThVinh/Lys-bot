const { PermissionsBitField, ChannelType, MessageFlags } = require('discord.js');
const DiscordBot = require('../DiscordBot');
const config = require('../../config');
const { generateAIResponse } = require('../../utils/ai');
const MessageCommand = require('../../structure/MessageCommand');
const {
  handleMessageCommandOptions,
  handleApplicationCommandOptions,
} = require('./CommandOptions');
const ApplicationCommand = require('../../structure/ApplicationCommand');
const { error } = require('../../utils/Console');

class CommandsListener {
  /**
   *
   * @param {DiscordBot} client
   */
  constructor(client) {
    client.on('messageCreate', async message => {
      if (message.author.bot || message.channel.type === ChannelType.DM) return;

      if (!config.commands.message_commands) return;

      let prefix = config.commands.prefix;

      // --- REPUTATION SYSTEM (Memory) ---
      const content = message.content.toLowerCase();
      const toxicWords = ['ngu', 'cút', 'đm', 'vãi', 'óc', 'tồi'];
      const helpfulWords = ['cảm ơn', 'thanks', 'giúp', 'hữu ích', 'tuyệt'];

      let stats = client.database.get(`userstats-${message.author.id}`) || { toxicScore: 0, helpfulScore: 0 };
      
      if (toxicWords.some(word => content.includes(word))) {
        stats.toxicScore += 1;
        client.database.set(`userstats-${message.author.id}`, stats);
      } else if (helpfulWords.some(word => content.includes(word))) {
        stats.helpfulScore += 1;
        client.database.set(`userstats-${message.author.id}`, stats);
      }
      
      // --- SPAM DETECTION ---
      const now = Date.now();
      const userSpamData = client.database.get(`spam-${message.author.id}`) || { lastMsg: 0, count: 0 };
      
      if (now - userSpamData.lastMsg < 2000) { 
        userSpamData.count += 1;
      } else {
        userSpamData.count = Math.max(0, userSpamData.count - 1);
      }
      userSpamData.lastMsg = now;
      client.database.set(`spam-${message.author.id}`, userSpamData);

      if (userSpamData.count > 5) { 
        stats.toxicScore += 0.2; 
        client.database.set(`userstats-${message.author.id}`, stats);
      }

      if (client.database.has('prefix-' + message.guild.id)) {
        prefix = client.database.get('prefix-' + message.guild.id);
      }

      // --- SMART AI DETECTION (Tag bot hoặc Chat tự nhiên) ---
      const isMentioned = message.mentions.has(client.user) && !message.mentions.everyone;
      
      if (isMentioned || (message.content.startsWith(prefix) && !client.collection.message_commands.has(message.content.slice(prefix.length).trim().split(/ +/)[0]))) {
        const prompt = isMentioned 
          ? message.content.replace(`<@${client.user.id}>`, '').replace(`<@!${client.user.id}>`, '').trim()
          : message.content.slice(prefix.length).trim();

        if (prompt.length > 0) {
          message.channel.sendTyping();
          
          // Lấy nhân cách và stats từ DB
          const personality = client.database.get(`personality-${message.guild.id}`) || 'default';
          const userStats = client.database.get(`userstats-${message.author.id}`) || { toxicScore: 0, helpfulScore: 0 };

          const aiReply = await generateAIResponse(prompt, personality, userStats);
          return message.reply(aiReply);
        }
      }

      if (!message.content.startsWith(prefix)) return;

      const args = message.content.slice(prefix.length).trim().split(/\s+/g);
      const commandInput = args.shift().toLowerCase();

      if (!commandInput.length) return;

      /**
       * @type {MessageCommand['data']}
       */
      const command =
        client.collection.message_commands.get(commandInput) ||
        client.collection.message_commands.get(
          client.collection.message_commands_aliases.get(commandInput)
        );

      if (!command) return;

      try {
        if (command.options) {
          const commandContinue = await handleMessageCommandOptions(
            message,
            command.options,
            command.command
          );

          if (!commandContinue) return;
        }

        if (
          command.command?.permissions &&
          !message.member.permissions.has(PermissionsBitField.resolve(command.command.permissions))
        ) {
          await message.reply({
            content: config.messages.MISSING_PERMISSIONS,
            flags: MessageFlags.Ephemeral,
          });

          return;
        }

        command.run(client, message, args);
      } catch (err) {
        error(err);
      }
    });

    client.on('interactionCreate', async interaction => {
      if (!interaction.isCommand()) return;

      if (!config.commands.application_commands.chat_input && interaction.isChatInputCommand())
        return;
      if (
        !config.commands.application_commands.user_context &&
        interaction.isUserContextMenuCommand()
      )
        return;
      if (
        !config.commands.application_commands.message_context &&
        interaction.isMessageContextMenuCommand()
      )
        return;

      /**
       * @type {ApplicationCommand['data']}
       */
      const command = client.collection.application_commands.get(interaction.commandName);

      if (!command) return;

      try {
        if (command.options) {
          const commandContinue = await handleApplicationCommandOptions(
            interaction,
            command.options,
            command.command
          );

          if (!commandContinue) return;
        }

        command.run(client, interaction);
      } catch (err) {
        error(err);
      }
    });
  }
}

module.exports = CommandsListener;

const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');
const os = require('os');

module.exports = new MessageCommand({
  command: {
    name: 'sysinfo',
    description: 'Displays system information',
  },
  options: {
    botOwner: true,
    cooldown: 5000,
  },
  run: async (client, message, args) => {
    const totalMem = (os.totalmem() / 1e9).toFixed(2);
    const freeMem = (os.freemem() / 1e9).toFixed(2);
    const usedMem = (totalMem - freeMem).toFixed(2);
    const cpuCount = os.cpus().length;
    const cpuUsage = os.loadavg()[0].toFixed(2);
    const uptime = formatUptime(os.uptime());

    const embed = new EmbedBuilder().setTitle('❯ System Info').addFields(
      { name: 'Platform', value: os.platform(), inline: false },
      { name: 'Hostname', value: os.hostname(), inline: true },
      { name: 'Architecture', value: os.arch(), inline: true },
      { name: 'CPUs', value: String(cpuCount), inline: true },
      { name: 'Load Avg', value: cpuUsage, inline: true },
      { name: 'Uptime', value: uptime, inline: true },
      {
        name: 'Memory',
        value: `Total: ${totalMem} GB\nUsed: ${usedMem} GB\nFree: ${freeMem} GB`,
        inline: true,
      },
      { name: 'Node.js', value: process.version, inline: true }
    );

    await message.reply({ embeds: [embed] });
  },
}).toJSON();

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
}

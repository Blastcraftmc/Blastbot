const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Need some help?',
    execute(interaction, client) {
        const helpEmbed = new EmbedBuilder().setColor(`4B0082`).setTitle(`Need Help?`).addFields({ name: 'Slash Commands', value: 'All commands start with /' }, { name: '/ping', value: 'Use /ping to see the bots ping', inline: true }, { name: '/user', value: 'Use /user to get your user info', inline: true }, { name: '/server', value: 'Use /server to get the server info', inline: true }).setURL('http://blastcraft.rf.gd/blastbot');
        interaction.reply({
            embeds: [helpEmbed],
            ephemeral: true,
        });
    },
};
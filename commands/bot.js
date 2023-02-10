const {ApplicationCommandOptionType, ActivityType } = require('discord.js');

module.exports = {
    name: 'bot',
    description: `Changes Blastbot's profile!`,
    options: [
    {
        name: 'activity',
        type: ApplicationCommandOptionType.String,
        description: 'The activity that you want to set',
        required: true,
    },
    ],
    execute(interaction, client) {
        interaction.reply({
            content: `Working on it`,
            ephemeral: true,
        });
    },
};
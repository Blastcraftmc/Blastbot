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
        const activity = interaction.options.getString('activity');
        client.user.setActivity(activity);
        interaction.reply({
            content: `Setting status to ${activity}`,
            ephemeral: true,
        });
    },
};
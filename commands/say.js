const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'say',
    description: 'Says message back to you',
    options: [
    {
        name: 'message',
        type: ApplicationCommandOptionType.String,
        description: 'Message',
        required: true,
        },
    ],
    execute(interaction, client) {
        const target = interaction.options.getString('message');

        const sayEmbed = new EmbedBuilder().setColor(`FF8427`).setTitle(`${interaction.user.username} said: ${target}`);
        interaction.reply({
            embeds: [sayEmbed],
        });
    },
};
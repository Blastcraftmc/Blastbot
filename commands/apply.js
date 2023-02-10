module.exports = {
    name: 'apply',
    description: 'Apply to help develop Blastbot',
    execute(interaction, client) {
        interaction.reply({
            content: `Working on it`,
            ephemeral: true,
        });
    },
};
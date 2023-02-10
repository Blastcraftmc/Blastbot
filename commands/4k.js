module.exports = {
    name: '4k',
    description: 'Snaps a picture.',
    execute(interaction, client) {
        interaction.reply({
            content: `📸Screenshotted and saved to cloud`,
        });
    },
};


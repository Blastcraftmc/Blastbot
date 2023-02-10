module.exports = {
    name: 'server',
    description: 'Replies with server info!',
    execute(interaction, client) {
        interaction.reply({
            content: `Server Name: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}\nDate Created: ${interaction.guild.createdAt}`,
            ephemeral: true,
        });
    },
};


module.exports = {
    name: 'apply',
    description: 'Apply to help develop Blastbot',
    execute(interaction, client) {
        client.users.send('685599175735378140', `The user "${interaction.user.username}" (${interaction.user.id}) sent a Blastbot developer application`);
        interaction.reply({
            content: `Applied successfully, await a response in less then a day`,
            ephemeral: true,
        });
    },
};
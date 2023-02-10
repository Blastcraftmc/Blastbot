module.exports = {
    name: 'ping',
    description: `See Blastbot's ping.`,
    execute(interaction, client) {
        const pingEmbed = new EmbedBuilder().setColor(0x00FFFF).setTitle(`Pong 🏓`).addFields({ name: '⏱️ Websocket heartbeat:', value: `${client.ws.ping}`, inline: true }, { name: '⌛ Roundtrip latency:', value: `${sent.createdTimestamp - interaction.createdTimestamp}`, inline: true });
        interaction.reply({
            content: `Working on it!`,
            ephemeral: true,
        });
    },
};
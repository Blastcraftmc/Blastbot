const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'gpt',
    description: `Chat with the GPT`,
    options: [
    {
        name: 'question',
        type: ApplicationCommandOptionType.String,
        description: 'The question you want to ask',
        required: true,
    },
    ],
    execute(interaction, client) {

    },
};
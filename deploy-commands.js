const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const keys = {
	clientId: process.env.clientId,
	guildId: process.env.guildId,
	token: process.env.token,
}

const commands = [
	new SlashCommandBuilder().setName('4k').setDescription("Snaps a picture"),
	new SlashCommandBuilder().setName('server').setDescription("Replies with server info!"),
	new SlashCommandBuilder().setName('user').setDescription("Replies with user info!"),
	new SlashCommandBuilder().setName('help').setDescription("Need some help?"),
	new SlashCommandBuilder().setName('bot').setDescription("Changes Blastbot's profile").addStringOption(option => option.setName('activity').setDescription('Activity').setRequired(true)),
	new SlashCommandBuilder().setName('apply').setDescription("Apply to help develop Blastbot"),
	new SlashCommandBuilder().setName('ping').setDescription("See Blastbot's ping"),
	new SlashCommandBuilder().setName('say').setDescription("Says message back to you").addStringOption(option => option.setName('message').setDescription('Message').setRequired(true)).addStringOption(option => option.setName('color').setDescription('Embed Color').setRequired(false)),
	new SlashCommandBuilder().setName('logs').setDescription("Get current log file"),
	new SlashCommandBuilder().setName('mute').setDescription("Mute user"),
	new SlashCommandBuilder().setName('present').setDescription("Delivers a present"),
	new SlashCommandBuilder().setName('gpt').setDescription("Talk to Chat GPT!").addStringOption(option => option.setName('message').setDescription('Message').setRequired(true))
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(keys.token);

rest.put(Routes.applicationGuildCommands(keys.clientId, keys.guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

//node deploy-commands.js
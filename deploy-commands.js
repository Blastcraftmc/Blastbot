const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('4k').setDescription("Snaps a picture"),
	new SlashCommandBuilder().setName('server').setDescription("Replies with server info!"),
	new SlashCommandBuilder().setName('user').setDescription("Replies with user info!"),
	new SlashCommandBuilder().setName('help').setDescription("Need some help?"),
	new SlashCommandBuilder().setName('activity').setDescription("Adds Blastbot's activity").addStringOption(option => option.setName('activityoption').setDescription('Activity').setRequired(true)),
	new SlashCommandBuilder().setName('apply').setDescription("Apply to help develop Blastbot"),
	new SlashCommandBuilder().setName('ping').setDescription("See Blastbot's ping"),
	new SlashCommandBuilder().setName('say').setDescription("Says message back to you").addStringOption(option => option.setName('message').setDescription('Message').setRequired(true)).addStringOption(option => option.setName('color').setDescription('Embed Color').setRequired(false)),
	new SlashCommandBuilder().setName('logs').setDescription("Get current log file"),
	new SlashCommandBuilder().setName('mute').setDescription("Mute user")
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

//node deploy-commands.js
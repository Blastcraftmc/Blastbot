const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs')

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

function logTxt(data) {
	fs.appendFile('log.txt', `${data}\n`, function (err) {
		if (err) {
		console.log("Logging failed")
		} else {
		return
		}
	})
}

client.once(Events.ClientReady, c => {
	console.log('Ready!');
	client.channels.cache.get('992810093332676629').send(`Hello there! I'm back up from my grave. Logged in as ${client.user.tag}`)
	client.user.setUsername('Blastbot');
	client.user.setActivity('Blastcraft');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === '4k') {
		await interaction.reply({ content: `📸Screenshotted and saved to cloud`});
		logTxt(`${interaction.user.username} used /4k`);
	} else if (commandName === 'server') {
		await interaction.reply({ content: `Server Name: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}\nDate Created: ${interaction.guild.createdAt}`, ephemeral: true });
		logTxt(`${interaction.user.username} used /server`);
	} else if (commandName === 'user') {
		//TODO add select user
		await interaction.reply({ content: `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`, ephemeral: true });
		logTxt(`${interaction.user.username} used /user`);
	} else if (commandName === 'help') {
		//TODO update website
		const helpEmbed = new EmbedBuilder().setColor(`4B0082`).setTitle(`Need Help?`).addFields({ name: 'Slash Commands', value: 'All commands start with /' }, { name: '/ping', value: 'Use /ping to see the bots ping', inline: true }, { name: '/user', value: 'Use /user to get your user info', inline: true }, { name: '/server', value: 'Use /server to get the server info', inline: true }).setURL('http://blastcraft.rf.gd/blastbot');
		await interaction.reply({ embeds: [helpEmbed], ephemeral: true})
		logTxt(`${interaction.user.username} used /help`);
	} else if (commandName === 'bot') {
		const activity = interaction.options.getString('activity');
		await interaction.reply({ content: `Setting status to ${activity}`, ephemeral: true})
		client.user.setActivity(activity);
		logTxt(`${interaction.user.username} used /bot to set Activity: "${activity}"`);
	} else if (commandName === 'apply') {
		client.users.send('685599175735378140', `The user "${interaction.user.username}" (${interaction.user.id}) sent a Blastbot developer application`);
		await interaction.reply({ content: `Applied successfully, await a response in less then a day`, ephemeral: true });
		logTxt(`${interaction.user.username} used /apply`);
	} else if (commandName === 'ping') {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		const pingEmbed = new EmbedBuilder().setColor(0x00FFFF).setTitle(`Pong 🏓`).addFields({ name: '⏱️Websocket heartbeat:', value: `${client.ws.ping}`, inline: true }, { name: '⌛Roundtrip latency:', value: `${sent.createdTimestamp - interaction.createdTimestamp}`, inline: true });
		interaction.editReply({ embeds: [pingEmbed] });
		logTxt(`${interaction.user.username} used /ping`);
	} else if (commandName === 'say') {
		//TODO make admin only
		const target = interaction.options.getString('message');
		const color = interaction.options.getString('color');
		const sayEmbed = new EmbedBuilder().setColor(color).setTitle(`${interaction.user.username} said: ${target}`);
		await interaction.reply({ embeds: [sayEmbed] })
		logTxt(`${interaction.user.username} used /say to say "${target}"`);
	} else if (commandName === 'logs') {
		//TODO make admin only
		const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		const logsEmbed = new EmbedBuilder().setColor(0xCE2D4F).setTitle(`Logs at ${date}`);
		await interaction.reply({ embeds: [logsEmbed], files: ["./log.txt"] })
		logTxt(`${interaction.user.username} used /logs at ${date}`);
	} else if (commandName === 'mute') {
		//TODO make admin only
		const member = interaction.options.getMember('target');
		if (member.roles.cache.some(role => role.name === 'Admin')) {
			console.log("Succeded");
		} else {
			console.log("Failed");
		}
	} else if (commandName === 'present') {
		await interaction.reply({ content: 'https://tenor.com/view/nitro-discord-nitro-gnomed-discord-gif-18776841' })
	}
});

client.login(token);

//node .
//node index.js
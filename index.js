const { Client, Intents, MessageEmbed, MessageActionRow, MessageSelectMenu, Modal, TextInputComponent } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

function logTxt(data) {
	fs.appendFile('log.txt', `${data}\n`, function (err) {
		if (err) {
		console.log("Logging failed")
		} else {
		return
		}
	})
}

client.once('ready', () => {
	console.log('Ready!');
	client.channels.cache.get('992810093332676629').send(`Hello there! I'm back up from my grave. Logged in as ${client.user.tag}`)
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
		await interaction.reply({ content: `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`, ephemeral: true });
		logTxt(`${interaction.user.username} used /user`);
	} else if (commandName === 'help') {
		const helpEmbed = new MessageEmbed().setColor(`4B0082`).setTitle(`Need Help?`).addFields({ name: 'Slash Commands', value: 'All commands start with /' }, { name: '/ping', value: 'Use /ping to see the bots ping', inline: true }, { name: '/user', value: 'Use /user to get your user info', inline: true }, { name: '/server', value: 'Use /server to get the server info', inline: true }).setURL('http://blastcraft.rf.gd/blastbot');
		await interaction.reply({ embeds: [helpEmbed], ephemeral: true})
		logTxt(`${interaction.user.username} used /help`);
	} else if (commandName === 'activity') {
		const target = interaction.options.getString('activityoption');
		await interaction.reply({ content: `Setting status ${target}`, ephemeral: true})
		client.user.setActivity(target);
		logTxt(`${interaction.user.username} used /activity to set "${target}"`);
	} else if (commandName === 'apply') {
		client.users.send('685599175735378140', `The user "${interaction.user.username}" (${interaction.user.id}) sent a Blastbot developer application`);
		await interaction.reply({ content: `Applied successfully, await a response in less then a day`, ephemeral: true });
		logTxt(`${interaction.user.username} used /apply`);
	} else if (commandName === 'ping') {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		const pingEmbed = new MessageEmbed().setColor(0x00FFFF).setTitle(`Pong 🏓`).addFields({ name: '⏱️Websocket heartbeat:', value: `${client.ws.ping}`, inline: true }, { name: '⌛Roundtrip latency:', value: `${sent.createdTimestamp - interaction.createdTimestamp}`, inline: true });
		interaction.editReply({ embeds: [pingEmbed] });
		logTxt(`${interaction.user.username} used /ping`);
	} else if (commandName === 'say') {
		const target = interaction.options.getString('message');
		const color = interaction.options.getString('color');
		const sayEmbed = new MessageEmbed().setColor(color).setTitle(`${interaction.user.username} said: ${target}`);
		await interaction.reply({ embeds: [sayEmbed] })
		logTxt(`${interaction.user.username} used /say to say "${target}"`);
	}
});

client.login(token);

//node .
const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const keys = {
	token: process.env.token,
}

const configuration = new Configuration ({
	apiKey: process.env.APIKEY,
});
const openai =  new OpenAIApi(configuration);

const client = new Client({ intents: [
	GatewayIntentBits.Guilds
] });

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
		const sent = await interaction.reply({ content: 'Working on it...'});
		await interaction.editReply({ content: `📸Screenshotted and saved to cloud`});
		logTxt(`${interaction.user.username} used /4k`);
	} else if (commandName === 'server') {
		const sent = await interaction.reply({ content: 'Working on it...'});
		await interaction.editReply({ content: `Server Name: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}\nDate Created: ${interaction.guild.createdAt}`, ephemeral: true });
		logTxt(`${interaction.user.username} used /server`);
	} else if (commandName === 'user') {
		//TODO: add select user
		const sent = await interaction.reply({ content: 'Working on it...'});
		await interaction.editReply({ content: `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`, ephemeral: true });
		logTxt(`${interaction.user.username} used /user`);
	} else if (commandName === 'help') {
		//TODO: update website
		const sent = await interaction.reply({ content: 'Working on it...'});
		const helpEmbed = new EmbedBuilder().setColor(`4B0082`).setTitle(`Need Help?`).addFields({ name: 'Slash Commands', value: 'All commands start with /' }, { name: '/ping', value: 'Use /ping to see the bots ping', inline: true }, { name: '/user', value: 'Use /user to get your user info', inline: true }, { name: '/server', value: 'Use /server to get the server info', inline: true }).setURL('http://blastcraft.rf.gd/blastbot');
		await interaction.editReply({ embeds: [helpEmbed], ephemeral: true})
		logTxt(`${interaction.user.username} used /help`);
	} else if (commandName === 'bot') {
		const sent = await interaction.reply({ content: 'Working on it...'});
		const activity = interaction.options.getString('activity');
		await interaction.editReply({ content: `Setting status to ${activity}`, ephemeral: true})
		client.user.setActivity(activity);
		logTxt(`${interaction.user.username} used /bot to set Activity: "${activity}"`);
	} else if (commandName === 'apply') {
		const sent = await interaction.reply({ content: 'Working on it...'});
		client.users.send('685599175735378140', `The user "${interaction.user.username}" (${interaction.user.id}) sent a Blastbot developer application`);
		await interaction.editReply({ content: `Applied successfully, await a response in less then a day`, ephemeral: true });
		logTxt(`${interaction.user.username} used /apply`);
	} else if (commandName === 'ping') {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		const pingEmbed = new EmbedBuilder().setColor(0x00FFFF).setTitle(`Pong 🏓`).addFields({ name: '⏱️ Websocket heartbeat:', value: `${client.ws.ping}`, inline: true }, { name: '⌛ Roundtrip latency:', value: `${sent.createdTimestamp - interaction.createdTimestamp}`, inline: true });
		interaction.editReply({ embeds: [pingEmbed] });
		logTxt(`${interaction.user.username} used /ping`);
	} else if (commandName === 'say') {
		//TODO: make admin only
		const sent = await interaction.reply({ content: 'Working on it...'});
		const target = interaction.options.getString('message');
		const color = interaction.options.getString('color');
		const sayEmbed = new EmbedBuilder().setColor(color).setTitle(`${interaction.user.username} said: ${target}`);
		await interaction.editReply({ embeds: [sayEmbed] })
		logTxt(`${interaction.user.username} used /say to say "${target}"`);
	} else if (commandName === 'logs') {
		//TODO: make admin only
		const sent = await interaction.reply({ content: 'Working on it...'});
		const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		const logsEmbed = new EmbedBuilder().setColor(0xCE2D4F).setTitle(`Logs at ${date}`);
		await interaction.editReply({ embeds: [logsEmbed], files: ["./log.txt"] })
		logTxt(`${interaction.user.username} used /logs at ${date}`);
	} else if (commandName === 'mute') {
		//TODO: make admin only
		const member = interaction.options.getMember('target');
		if (member.roles.cache.some(role => role.name === 'Admin')) {
			console.log("Succeded");
		} else {
			console.log("Failed");
		}
	} else if (commandName === 'present') {
		const sent = await interaction.reply({ content: 'Working on it...'});
		await interaction.editReply({ content: 'https://tenor.com/view/nitro-discord-nitro-gnomed-discord-gif-18776841' })
		logTxt(`${interaction.user.username} used /present at ${date}`);
	} else if (commandName === 'gpt') {
		const target = interaction.options.getString('message');
		const sent = await interaction.reply({ content: 'Working on it...'});
		try {
			const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `${target}`,
			temperature: 0.5,
			max_tokens: 300,
			top_p: 1.0,
			frequency_penalty: 0.5,
			presence_penalty: 0.0,
			});
		const gptEmbed = new EmbedBuilder().setColor("A72608").setTitle(`Chat GPT`).addFields({ name: '🤔 Question:', value: `${target}`}, { name: '💬 Response:', value: `${response.data.choices[0].text}`});
		await interaction.editReply({ embeds: [gptEmbed] })
		} catch (error) {
			console.log("error");
			client.channels.cache.get('992810093332676629').send(`Error`)
			await interaction.editReply({ content: `Error!` })
		}
		
	}
});

client.login(keys.token);

//node .
require('dotenv').config()

//Require Node Modules
const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/Client');
const config = require('./config.json');
const { Player } = require('discord-player');
const { ActivityType, EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");

//Chat GPT Setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//Client Setup
const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

console.log(client.commands);

//Audio Player
const player = new Player(client);

player.on('error', (queue, error) => {
  console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
});

player.on('connectionError', (queue, error) => {
  console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
});

player.on('trackStart', (queue, track) => {
  queue.metadata.send(`▶ | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`);
});

player.on('trackAdd', (queue, track) => {
  queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
});

player.on('botDisconnect', queue => {
  queue.metadata.send('❌ | I was manually disconnected from the voice channel, clearing queue!');
});

player.on('channelEmpty', queue => {
  queue.metadata.send('❌ | Nobody is in the voice channel, leaving...');
});

player.on('queueEnd', queue => {
  queue.metadata.send('✅ | Queue finished!');
});

client.once('ready', async () => {
  console.log('Ready!');
});

//client.on
client.on('ready', function() {
  client.user.setActivity("Blastcraft"); 
});

client.once('reconnecting', () => {
  console.log('Reconnecting!');
});

client.once('disconnect', () => {
  console.log('Disconnect!');
});

//Deploy Commands
client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return;
  if (!client.application?.owner) await client.application?.fetch();

  if (message.content === '!deploy') {
    if (message.content === '!deploy' && message.author.id === client.application?.owner?.id) {
      await message.guild.commands
        .set(client.commands)
        .then(() => {
          message.reply('Deployed!');
        })
        .catch(err => {
          message.reply('Could not deploy commands!');
          console.error(err);
        });
    } else {
        message.reply(`You don't have the right permissions! Now stop trying to commit identity theft and leave.`);
    }
  }
});

client.on('interactionCreate', async interaction => {
  const command = client.commands.get(interaction.commandName.toLowerCase());

  try {
    if (interaction.commandName == 'ban' || interaction.commandName == 'userinfo' || interaction.commandName == 'apply' || interaction.commandName == 'bot') {
      command.execute(interaction, client);
    } else if (interaction.commandName == 'ping') {
		  const sent = await interaction.reply('Pinging...');
      const pingEmbed = new EmbedBuilder().setColor(0x00FFFF).setTitle(`Pong 🏓`).addFields({ name: '⏱️ API Latency:', value: `${Math.round(client.ws.ping)}ms`, inline: true }, { name: '⌛ Latency:', value: `${sent.createdTimestamp - interaction.createdTimestamp}ms`, inline: true });
		  await interaction.editReply({ embeds: [pingEmbed] });
	  } else if (interaction.commandName == 'gpt') {
      const sent = await interaction.reply('GPTing...');
      try {
        runCompletion();
        async function runCompletion () {
          const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: "How are you today?",
        });
        console.log(completion.data.choices[0].text);
        await interaction.editReply(completion.data.choices[0].text);
        }
      } catch {
        console.error(error);
        interaction.followUp({
          content: 'There was an error trying to execute that command!',
        });
      }
    } else {
      command.execute(interaction, player);
    }
  } catch (error) {
    console.error(error);
    interaction.followUp({
      content: 'There was an error trying to execute that command!',
    });
  }
});

client.login(process.env.token);

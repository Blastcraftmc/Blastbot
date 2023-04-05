const { ApplicationCommandOptionType } = require('discord.js');
let api = require('genius-api');
let genius = new api('0mRPJ6QmkRvSr8cQF2Ai7TAOzWPmQes5Q4byoSB1541mmk5vGD1z9dzb5VhtYZgp');

module.exports = {
    name: 'lyric',
    description: `Chat with the GPT`,
    execute(interaction, client) {
        //get song
        genius.song(378195).then(function(response) {
            var song = ('song', response.song);  
        });

        //get artist
        genius.artist(16775).then(function(response) {
            var artist = ('artist', response.artist);
        });
            
        //search
        genius.search('Run the Jewels').then(function(response) {
            var search = ('hits', response.hits);
        });

        interaction.reply({
            content: `Song: ${song}, Artist: ${artist}, Search: ${search}`,
        });
    },
};
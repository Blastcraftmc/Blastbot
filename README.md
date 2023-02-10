# Blastbot

Blastbot is a simple discord bot that is made for the Blastbot Discord community.

You are free to distribute under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Table of content

* [Requirements](#requirements)
* [Getting started](#getting-started)
* [Features & Commands](#features--commands)
* [Contributing](#contributing)
* [Creator](#creator)
* [License](#license)

## Requirements

- [Node](https://nodejs.org/en/) - Version 16 or higher
- [NPM](https://www.npmjs.com/)
- [FFMPEG](https://www.ffmpeg.org/)
- [Docker](https://www.docker.com/) (optional)

## Getting started

First, make sure you have all the required tools installed on your local machine then continue with these steps.

### Installation

```bash
# Clone the repository
git clone https://github.com/Blastcraftmc/Blastbot.git

# Enter into the directory
cd Blastbot/

# Install the dependencies
npm install

# Configure Discord Bot Token
 echo "token='INSERT_YOUR_TOKEN_HERE'" > .env
```

### Required permissions

Make sure that your bot has the `applications.commands` application scope enabled, which can be found under the `OAuth2` tab on the [developer portal](https://discord.com/developers/applications/)

Enable the `Server Members Intent` and `Message Content Intent` which can be found under the `Bot` tab on the [developer portal](https://discord.com/developers/applications/)

### Configuration

After cloning the project and installing all dependencies, you need to add your Discord API token in the `.env` file.

### Starting the application

```bash
node index.js
```

### Starting the application using Docker

```bash
# Build the image
docker build --tag discordbot .

# Run the image
docker run -d discordbot
```

### Deploying commands

Before using the bots slash command you first need to add them to your Discord server. You can use the `!deploy` command to do so.

## Features & Commands

> Note: Blastbot uses slash commands

* [Play](#play)
* [Pause](#pause)
* [Resume](#resume)
* [Now Playing](#now-playing)
* [Queue](#queue)
* [Shuffle](#shuffle)
* [Loop](#loop)
* [Skip](#skip)
* [Remove](#remove)
* [Move](#move)
* [Swap](#swap)
* [Stop](#stop)
* [Volume](#volume)
* [Help](#help)
* [Userinfo](#userinfo)
* [Ban](#ban)
* [Purge](#purge)
More coming soon!

### Play

▶️ Play music from YouTube via url or search by song name, added to the bottom of the queue.

`/play YOUTUBE_URL`  
`/play SONG_NAME`

▶️ Play music via url or using song name, this places it next at the top of the queue (position 1).

`/playtop YOUTUBE_URL`  
`/playtop SONG_NAME`

### Pause

⏸️ Pause music

`/pause`

### Resume

▶️ Resume playing paused music

`/resume`

### Now Playing

🎶 Display current playing song

`/nowplaying`

### Queue

🗒️ Display the current queue

`/queue`

### Shuffle

🔀 Shuffle the current queue

`/shuffle`

### Loop

🔁 Loop/Repeat controls. Off, Track and Queue

`/loop MODE`

### Skip

⏭️ Skip the current playing song and play the next in queue

`/skip`

### Remove

⏏ Remove song from the queue

`/remove POSITION`

### Move

↕ Move song position. This shifts all other songs up or down one, depending on direction you move the target song.

`/move TRACK_POSITION TARGET_POSITION`

### Swap

↔️ Swap two songs current positions with each other

`/swap POSITION_1 POSITION_2`

### Stop

🔇 Stop playing (disconnects bot from voice channel)

`/stop`

### Volume

🔊 Adjust the music bot volume between 0-200

`/volume NUMBER`

### Help

❓ Display commands

`/help`

### Userinfo

* Get information about a user (/userinfo USER)

### Ban

* Ban a player (/ban USER)

### Purge

* Delete the latest chat messages (/purge NUM_OF_MESSAGES)

## Contributing

I will not accept most pull requests to the repository.
You are welcome to contribute by using /apply on the Blastcraft discord server.

## Creator

[Sebastian Colberg](https://scolberg.netlify.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
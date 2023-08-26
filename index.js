const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const cron = require('node-cron');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const channelId = '1136616565765320784';
const channelId2 = '1088842972558270485';
const channelId3 = '1144795715898449980';
const channelId4 = '1144794175557095434';

client.login(token).catch(error => {
    console.error(`Failed to login: ${error}`);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const locations = ['Daeric', 'Keren', 'Bestine'];
    const channel = client.channels.cache.get(channelId);
    const channel2 = client.channels.cache.get(channelId2);
    const channel3 = client.channels.cache.get(channelId3);
    const channel4 = client.channels.cache.get(channelId4);
    if (!channel) {
        console.error(`Channel with ID ${channelId} not found!`);
        return;
    }

    for (let i = 0; i < 12; i++) {

        cron.schedule(`0 ${((i * 2)) % 24} * * *`, () => {
            channel.send(`Building has begun at ${locations[i % 3]}. PVP begins in 30 minutes.`)
                .catch(error => console.error(`Failed to send message: ${error}`));
            channel2.send(`Building has begun at ${locations[i % 3]}. PVP begins in 30 minutes.`)
                .catch(error => console.error(`Failed to send message: ${error}`));
            channel3.send(`Building has begun at ${locations[i % 3]}. PVP begins in 30 minutes.`)
                .catch(error => console.error(`Failed to send message: ${error}`));
            channel4.send(`Building has begun at ${locations[i % 3]}. PVP begins in 30 minutes.`)
                .catch(error => console.error(`Failed to send message: ${error}`));
        });

        cron.schedule(`30 ${((i * 2)) % 24} * * *`, () => {
            channel.send(`PVP has begun at ${locations[i % 3]}.`)
                .catch(error => console.error(`Failed to send message: ${error}`));
            channel2.send(`PVP has begun at ${locations[i % 3]}.`)
                .catch(error => console.error(`Failed to send message: ${error}`));
            channel3.send(`PVP has begun at ${locations[i % 3]}.`)
                .catch(error => console.error(`Failed to send message: ${error}`));
            channel4.send(`PVP has begun at ${locations[i % 3]}.`)
                .catch(error => console.error(`Failed to send message: ${error}`));
        });

        cron.schedule(`45 ${((i * 2) + 1) % 24} * * *`, () => {
            channel.send(`${locations[(i + 1) % 3]} invasion in 15 minutes!`)
                .catch(error => console.error(`Failed to send message: ${error}`));
            channel2.send(`${locations[(i + 1) % 3]} invasion in 15 minutes!`)
                .catch(error => console.error(`Failed to send message: ${error}`));
            channel3.send(`${locations[(i + 1) % 3]} invasion in 15 minutes!`)
                .catch(error => console.error(`Failed to send message: ${error}`));
            channel4.send(`${locations[(i + 1) % 3]} invasion in 15 minutes!`)
                .catch(error => console.error(`Failed to send message: ${error}`));
        });
    }
});

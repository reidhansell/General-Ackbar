const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const cron = require('node-cron');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const channelId = '1088842972558270485';

client.login(token).catch(error => {
    console.error(`Failed to login: ${error}`);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const locations = ['Bestine', 'Daeric', 'Keren'];

    for (let i = 0; i < 8; i++) {
        const location = locations[i % 3];
        cron.schedule(`45 ${((i * 2) + 4) % 24} * * *`, () => {
            const channel = client.channels.cache.get(channelId);
            if (!channel) {
                console.error(`Channel with ID ${channelId} not found!`);
                return;
            }
            channel.send(`${location} invasion in 15 minutes!`)
                .catch(error => console.error(`Failed to send message: ${error}`));
        });
        cron.schedule(`0 ${((i * 2) + 5) % 24} * * *`, () => {
            const channel = client.channels.cache.get(channelId);
            channel.send(`Building has begin. PVP begins in 30 minutes.`)
                .catch(error => console.error(`Failed to send message: ${error}`));
        });
    }
});
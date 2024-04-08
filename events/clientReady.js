const { Events, Client } = require('discord.js');

// Bot ready event
module.exports = {
	name: Events.ClientReady,
	once: true,
	/**
	 * @param { Client } readyClient
	 */
    async execute(readyClient) {
		console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	},
};
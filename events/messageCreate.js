const { Events, Message } = require('discord.js');

// New message event
module.exports = {
	name: Events.MessageCreate,
	once: false,
	/**
	 * @param { Message } message
	 */
    async execute(message) {
		//console.log(`messageCreate: ${message}`);
	},
};
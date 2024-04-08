const { Events, AnyThreadChannel } = require('discord.js');

// New thread event
module.exports = {
	name: Events.ThreadCreate,
	once: false,
	/**
	 * @param { AnyThreadChannel } thread
	 */
    async execute(thread) {
		//console.log('Thread created ' + thread.name);
	},
};
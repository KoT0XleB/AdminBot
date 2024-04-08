const { Events, GuildChannel } = require('discord.js');

// New channel event
module.exports = {
	name: Events.ChannelCreate,
	once: false,
	/**
	 * @param { GuildChannel } channel
	 */
    async execute(channel) {
		//console.log('Channel created ' + channel.name);
	},
};
const { Events, GuildChannel } = require('discord.js');

// New channel event
module.exports = {
	name: Events.ChannelDelete,
	once: false,
	/**
	 * @param { GuildChannel } channel
	 */
    async execute(channel) {
		//console.log('Channel deleted ' + channel.name);
	},
};
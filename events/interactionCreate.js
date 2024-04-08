const { EventEmitter } = require('events');
const { Events, Interaction } = require('discord.js');

// Any interaction with a slash command
module.exports = {
	name: Events.InteractionCreate,
	once: false,
	/**
	 * @param {Interaction} interaction
	 */
    async execute(interaction) { 

        if (interaction.isStringSelectMenu()) {
            require('../interactions/selectMenuInteraction.js').execute(interaction);
        }

        if (interaction.isChatInputCommand()) {
            require('../interactions/commandInteraction.js').execute(interaction);
        }

        if (interaction.isButton()) {
            require('../interactions/buttonInteraction.js').execute(interaction);
        }
	},
};
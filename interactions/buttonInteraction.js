const { Interaction, PermissionFlagsBits } = require('discord.js');
const { config } = require('../index.js');
const { thread_role_id } = config;

module.exports = {
	/**
	 * @param {Interaction} interaction
	 */
	async execute(interaction) {
		if (!(interaction.customId == 'adminbot_close_button' || interaction.channel.isThread)) {
			return;
		}
		
		if (!(interaction.member.permissions.has(PermissionFlagsBits.Administrator) 
			|| interaction.member.roles.cache.has(thread_role_id))) {
			await interaction.reply({ content: 'Вы не имеете прав для закрытия запроса!', ephemeral: true });
			return;
		}
		else {
			await interaction.reply({ content: 'Вы закрыли запрос!', ephemeral: true });
		}

		if (!interaction.channel.locked) {
			await interaction.channel.setLocked(true);
		}

		if (!interaction.channel.archived) {
			await interaction.channel.setArchived(true);
		}
	},
};
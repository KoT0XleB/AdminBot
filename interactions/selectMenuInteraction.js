const { Interaction, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { config, translation } = require('../index.js');
const { thread_role_id } = config;
const { thread_text, thread_created } = translation;

module.exports = {
	/**
	 * @param {Interaction} interaction
	 */
	async execute(interaction) {

		if (interaction.customId != 'adminbot_menu') {
			return;
		}

		const forumId = interaction.channel.parentId;
		const channel = interaction.guild.channels.cache.get(forumId);
		const userId = interaction.user.id;

		switch (interaction.values[0]) {
			case 'question': {
				createThread(0, channel, userId);
				break;
			}
			case 'bugs': {
				createThread(1, channel, userId);
				break;
			}
			case 'suggestions': {
				createThread(2, channel, userId);
				break;
			}
		}

		await interaction.reply({ content: `${thread_created}`, ephemeral: true });
	},
};

async function createThread(id, channel, userId) {
	const confirm = new ButtonBuilder()
		.setCustomId('adminbot_close_button')
		.setLabel('Закрыть запрос')
		.setStyle(ButtonStyle.Danger);

	const row = new ActionRowBuilder()
		.addComponents(confirm);

	await channel.threads.create({
		name: thread_text[id].name,
		message: { 
			content: thread_text[id].message
			.replace('{userId}', userId)
			.replace('{thread_role_id}', thread_role_id),

			components: [row],
		},
		appliedTags: [ channel.availableTags[id].id ],
	});
}
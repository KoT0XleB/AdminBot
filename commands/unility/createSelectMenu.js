const { ActionRowBuilder, Interaction, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionFlagsBits } = require('discord.js');
// Use that site: https://message.style/app/editor

// Add embed to channel
module.exports = {
	data: new SlashCommandBuilder()
		.setName('message')
		.setDescription('Добавить сообщение в канал.'),

	/**
	 * @param {Interaction} interaction
	 */
	async execute(interaction) {
		if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
			await interaction.reply({ content: 'У вас нет возможности выполнить команду!', ephemeral: true });
			return;
		}
		const select = new StringSelectMenuBuilder()
			.setCustomId('adminbot_menu')
			.setPlaceholder('Выберите категорию запроса:')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Вопрос')
					.setDescription('Задать вопрос по серверу или донату.')
					.setValue('question'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Баги')
					.setDescription('Технические баги на сервере, которые надо исправить.')
					.setValue('bugs'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Предложения')
					.setDescription('Предложите новые идеи для сервера.')
					.setValue('suggestions'),
			);

		const row = new ActionRowBuilder()
		.addComponents(select);

		await interaction.reply({
			content: 'Выберите категорию запроса:',
			components: [row],
		});
	},
};
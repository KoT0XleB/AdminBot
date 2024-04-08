const { SlashCommandBuilder, Interaction, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('admin')
		.setDescription('Добавить нового админа.')
		.addUserOption(option => option.setName('new').setDescription('Выбрать нового игрока, который станет админом.')),

	/**
	 * @param {Interaction} interaction
	 */
	async execute(interaction) {
		if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
			await interaction.reply({ content: 'У вас нет возможности выполнить команду!', ephemeral: true });
			return;
		}
		console.log('Executing admins.js');
		let newUser = interaction.options.getUser('new');
		await interaction.reply(`This command was run by ${newUser}.`);
	},
};
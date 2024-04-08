const fs = require('node:fs');
const path = require('node:path');
const { Interaction, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
// Use that site: https://message.style/app/editor

// Add embed to channel
module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Добавить эмбэд в канал.'),

	/**
	 * @param {Interaction} interaction
	 */
	async execute(interaction) {
		try {
			if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
				await interaction.reply({ content: 'У вас нет возможности выполнить команду!', ephemeral: true });
				return;
			}
			const jsonFile = path.join(__dirname, '../../embeds/forumEmbed.json');
			const jsonContent = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
			await interaction.channel.send(jsonContent);
			await interaction.reply({ content: 'Эмбед добавлен в канал.', ephemeral: true });
		} 
		catch (error) {
			console.error('Error reading JSON file:', error);
			await interaction.reply(`Произошла ошибка при чтении JSON файла.`);
		}
	},
};
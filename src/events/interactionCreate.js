const { InteractionType, Events } = require("discord.js");

module.exports = {
	name: Events.InteractionCreate,
	execute: async (client, interaction) => {
		if (!interaction.isChatInputCommand()) return;
			if (interaction.user.bot) return;
			try {
				const command = client.commands.get(interaction.commandName)
				command.run(client, interaction)
			} catch (e) {
				console.error(e)
				interaction.reply({ content: "Komut çalıştırılırken bir sorunla karşılaşıldı! Lütfen tekrar deneyin.", ephemeral: true })
			}
		
	}
}

const { SlashCommandBuilder } = require("@discordjs/builders");
const tts = require('google-tts-api');
const axios = require('axios');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("speech")
        .setDescription("Yazıyı MP3 (ses) dosyasına dönüştürür.")
        .addStringOption(option => option.setName("text").setDescription("Ses dosyasına dönüştürülecek yazıyı giriniz.").setRequired(true).setMaxLength(200)),
    async run(client, interaction) {
        const text = interaction.options.getString("text");

        await interaction.reply({ content: "Yazı ses dosyasına dönüştürülüyor...", ephemeral: true });

        try {
            const audioUrl = tts.getAudioUrl(text, {
                lang: 'tr',
                slow: false
            });

            const outputPath = `./output/${generateRandomString()}.mp3`;

            const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
            fs.writeFileSync(outputPath, response.data, 'binary');

            await interaction.editReply({ content: "Yazı başarıyla ses dosyasına dönüştürüldü.", files: [outputPath] });
            fs.unlinkSync(outputPath);
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: "Yazı ses dosyasına dönüştürülürken bir hata oluştu." });
        }
    }
};

const generateRandomString = () => {
    const chars = "0123456789";
    let randomString = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        randomString += chars.substring(randomIndex, randomIndex + 1);
    }

    return randomString;
};

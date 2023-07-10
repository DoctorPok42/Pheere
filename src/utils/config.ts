const config = {
    gpt: {
        name: 'Pheere',
        model: 'gpt-3.5-turbo',
        language: 'French',
        dateFormat: 'fr-FR',
        timeZone: 'Europe/Paris'
    },
    elevenLabs: {
        voiceID: 'TxGEqnHWrfWFTfGW9XjX',
        modelID: 'eleven_multilingual_v1',
        voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
        }
    }
}

export default config

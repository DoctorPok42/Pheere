// 3. Text-to-speech with Elevenlabs

import 'dotenv/config'
import axios from 'axios'
import fs from 'fs'
import config from './utils/config.js'
const { ELEVENLABS_API_KEY } = process.env

export default async function getVoice(text: string) {
    const { voiceID, modelID, voice_settings } = config.elevenLabs

    if (!text || text == '' || typeof text !== 'string') {
        return "I don't understand your question."
    }

    const headers = {
        accept: 'audio/mpeg',
        'x-api-key': ELEVENLABS_API_KEY as string,
        'Content-Type': 'application/json'
    }

    const data = {
        text: text,
        model_id: modelID,
        voice_id: voice_settings
    }

    const reponse = await axios({
        method: 'POST',
        url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}/stream`,
        headers,
        data,
        responseType: 'stream'
    }).catch(() => {
        console.log("Error: can't get voice")
        return null
    })

    if (!reponse) {
        return null
    }

    await reponse.data.pipe(fs.createWriteStream('audio.mp3'))
    return reponse
}

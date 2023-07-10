// 1. Voice to text with Whisper

import 'dotenv/config'
import Microphone from 'node-microphone'
import fs from 'fs'
import answer from './chat.js'

const AUDIO_FILE_PATH = 'audio.wav'
const WHISPER_MODEL = 'whisper-1'

export default async function startListening(openai: any) {
    const microphone = new Microphone()
    const fileStream = fs.createWriteStream(AUDIO_FILE_PATH)

    microphone.startRecording().pipe(fileStream)
    process.stdout.write('\x1B[2J\x1B[0f')
    console.log('Recording...')

    setTimeout(async () => {
        process.stdout.write('\x1B[2J\x1B[0f')
        console.log('Automatic stop of recording after 5 seconds.')
        microphone.stopRecording()

        try {
            const transcription = await openai.createTranscription(
                fs.createReadStream(AUDIO_FILE_PATH),
                WHISPER_MODEL
            )

            console.log(
                '\x1b[36;1m%s\x1b[0m',
                'User:' + '\x1b[0m',
                transcription.data.text
            )
            answer(openai, transcription.data.text)
            return transcription.data.text
        } catch (error) {
            console.log(error)
            return null
        }
    }, 5000)
}

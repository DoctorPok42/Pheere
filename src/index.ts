/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'dotenv/config'
import { Configuration, OpenAIApi } from 'openai'
const { OPENAI_API_KEY } = process.env
import startListening from './speech.js'
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY as string,
})

const openai = new OpenAIApi(configuration)

startListening(openai).catch((err) => {
    console.error("Error: ", err)
})

// 2. Response to a question with GPT-3.5-turbo
import getVoice from './voice.js'
import config from './utils/config.js'

export default async function answer(openai: any, question: string) {
    const { model, name, language, dateFormat, timeZone } = config.gpt

    if (!question || question == '' || typeof question !== 'string') {
        return "I don't understand your question."
    }

    const chatCompletion = (await openai.createChatCompletion({
        model: model,
        messages: [
            {
                role: 'system',
                content: `You are ${name}, a virtual assistant.\
                Your reply is concise and mischievous.\
                As a voice assistant, you speak to your users.\
                Your answers should be as concise as possible for each response.\
                If you generate a list, please limit the number of items to a maximum of five.\
                In general, you provide concise answers, unless the user asks you to elaborate.\
                Sometimes, at the end of your answers, you ask the user to continue the conversation (if you get the impression that they want to talk).\
                In a conversation, you try to get the other person out of their comfort zone.\
                Make sure to spell out all numbers. \
                In your answer never write a simple dash or other special characters.\
                Your answers is in ${language}.\
                Time: ${new Date().toLocaleString(dateFormat, {
                    timeZone: timeZone
                })}`
            },
            {
                role: 'user',
                content: question
            }
        ],
        stream: true
    })) as any

    var reponse = chatCompletion.data.split('\n')

    reponse = reponse.filter((line: string) => line.includes('content'))

    reponse = reponse.map(
        (line: string) => line.split('content')[1]?.split('"')[2]
    )

    console.log(
        '\x1b[35;1m%s\x1b[0m',
        name + ': ' + '\x1b[0m' + reponse.join('')
    )
    reponse = reponse.join('')

    if (
        reponse.includes("'") ||
        reponse.includes('\n') ||
        reponse.includes('\\')
    ) {
        reponse = reponse.replace(/'/g, '')
        reponse = reponse.replace(/\n/g, ' ')
        reponse = reponse.replace(/\\/g, '')
    }

    getVoice(reponse)
    return reponse
}

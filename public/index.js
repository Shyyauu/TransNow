const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { Configuration, OpenAIApi} = require('openai')

const config = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(config)

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post('/chat', async (req,res) => {
    const { prompt } = req.body

    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        max_tokens: 50,
        temperature: 0,
        prompt: prompt
    })
    res.send(completion.data.choces[0].text)
})

const port = 8080
app.listen(port, () => {
    console.log('serwer słucha na porcie ', port)
})
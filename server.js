const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
    apiKey: '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'
}));

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [{ role: 'user', content: message }]
        });

        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        res.json({ response: "Error: Unable to fetch response. Check API key." });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

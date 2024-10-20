// api/llm.js
const express = require('express');
const axios = require('axios');
const { Mistral } = require('@mistralai/mistralai');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();


// Initialize API clients with fallback API key
const mistralClient = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

router.post('/chatbot', async (req, res) => {
    const { userMessage, model } = req.body;

    if (!userMessage || !model) {
        return res.status(400).send('Missing required fields: userMessage or model');
    }

    try {
        let botResponse;

        switch (model) {
            case 'gpt-4':
            case 'gpt-4o':
                botResponse = await handleGPTModels(userMessage, model);
                break;
            case 'mistral':
                botResponse = await handleMistralModel(userMessage);
                break;
            default:
                return res.status(400).send("Model not supported");
        }

        res.json({ botResponse });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(500).send("I'm sorry, I'm having trouble responding right now.");
    }
});

async function handleGPTModels(userMessage, model) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const response = await axios.post(apiUrl, {
        model: model,
        messages: [{ role: 'user', content: userMessage }],
        max_tokens: 450
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        }
    });

    return response.data.choices[0].message.content.trim();
}

async function handleMistralModel(userMessage) {
    try {
        // Call Mistral's chat completion API
        const chatResponse = await mistralClient.chat.complete({
            model: 'mistral-large-latest',
            messages: [{ role: 'user', content: userMessage }],
        });

        // Extract and return the bot's response
        return chatResponse.choices[0]?.message?.content || 'No response';
    } catch (error) {
        console.error('Error:', error);
        throw new Error("Error occurred while processing Mistral model response");
    }
}

module.exports = router;


//Folder Structure as of 10/19/2024; 1:44pm
// api
// api\llm.js
// node_modules
// views
// views\index.html
// .env
// .gitignore
// app.js
// package-lock.json
// package.json
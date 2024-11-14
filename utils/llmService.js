// File: services/llmService.js
import axios from "axios";
import { Mistral } from "@mistralai/mistralai";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

//1. OpenAI GPT Models Cleared and Working
export async function handleGPTModels(userMessage, model) {
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await axios.post(
      apiUrl,
      {
        model: model,
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error handling GPT models:", error);
    throw new Error("Failed to generate response from GPT model.");
  }
}


//2. Mistral Model Cleared and Working
export async function handleMistralModel(userMessage) {
  try {
    // Initialize the Mistral client with your API key
    const mistralClient = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

    const chatResponse = await mistralClient.chat.complete({
      model: "mistral-large-latest",
      messages: [{ role: "user", content: userMessage }],
    });

    return chatResponse.choices[0]?.message?.content || "No response";
  } catch (error) {
    console.error("Error handling Mistral model:", error);
    throw new Error("Error occurred while processing Mistral model response");
  }
}

//3. Gemini Model Cleared and Working
export async function handleGeminiModel(userMessage) {
  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GOOGLEAI_API_KEY}`;
    const payload = {
      contents: [
        {
          parts: [
            { text: userMessage }
          ]
        }
      ]
    };

    const response = await axios.post(apiUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const botText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return botText || "No response";
  } catch (error) {
    console.error('Error handling Gemini model:', error);
    throw new Error('Error occurred while processing Gemini model response');
  }
}

// File: utils/llmService.js
import axios from "axios";
import { Mistral } from "@mistralai/mistralai";
import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();
const redisClient = new Redis(process.env.REDISCLOUD_URL);

// Function to handle requests for OpenAI models with caching
export async function handleGPTModels(userMessage, model) {
  // Create a cache key based on model and message
  const cacheKey = `gptCache:${model}:${userMessage}`;
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  try {
    // Check if the response is cached
    const cachedResponse = await redisClient.get(cacheKey);
    if (cachedResponse) {
      console.log("Returning cached response for:", userMessage);
      return JSON.parse(cachedResponse);
    }

    // If not cached, make the API request
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

    const result = response.data.choices[0].message.content.trim();

    // Cache the result with an expiration time (e.g., 1 hour)
    await redisClient.set(cacheKey, JSON.stringify(result), "EX", 3600);

    return result;
  } catch (error) {
    console.error("Error handling GPT models:", error);
    throw new Error("Failed to generate response from GPT model.");
  }
}

// Function to handle requests for the Mistral model
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

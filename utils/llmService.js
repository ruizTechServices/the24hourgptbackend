// File: services/llmService.js
import axios from "axios";
import { Mistral } from "@mistralai/mistralai";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

//1. OpenAI GPT Models
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


//2. Mistral Model
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

// 3. Gemini API (Return Full Response without Stream)
export async function handleGeminiModel(userMessage) {
  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GOOGLEAI_API_KEY}`;

    // Construct the payload for Gemini API as per the required format
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

    // Return the full response as per your requirement
    return response.data;
  } catch (error) {
    console.error('Error handling Gemini model:', error);
    throw new Error('Error occurred while processing Gemini model response');
  }
}


//4. Llama Model
export async function handleLlamaModel(userMessage) {
  try {
    // Call the query function with the appropriate data format
    const data = {
      inputs: userMessage,
      parameters: {
        max_new_tokens: 150
      }
    };

    // Make the query to the Llama API endpoint
    const response = await query(data);

    // Return or process the response as needed
    return response;
  } catch (error) {
    console.error("Error handling Llama model:", error);
    throw new Error("Error occurred while processing Llama model response");
  }
}

// Function to make the API request to Hugging Face
async function query(data) {
  const response = await fetch(
    "https://svsc0tn91zujzyzx.us-east-1.aws.endpoints.huggingface.cloud",
    {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  // Process the response
  const result = await response.json();
  return result;
}

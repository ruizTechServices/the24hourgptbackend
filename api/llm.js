// File: api/llm.js
import express from "express";
import { handleGPTModels, handleMistralModel, handleGeminiModel, initializeGeminiChat } from "../utils/llmService";

const router = express.Router();

router.post("/chatbot", async (req, res) => {
  const { userMessage, model } = req.body;

  if (!userMessage || !model) {
    return res.status(400).send("Missing required fields: userMessage or model");
  }

  try {
    let botResponse;

    switch (model) {
      case "gpt-4":
      case "gpt-4o":
        botResponse = await handleGPTModels(userMessage, model);
        break;
      case "mistral":
        botResponse = await handleMistralModel(userMessage);
        break;
      case "Gemini":
        botResponse = await handleGeminiModel(userMessage);
        break;
      default:
        return res.status(400).send("Model not supported");
    }

    res.json({ botResponse });
  } catch (error) {
    res.status(500).send("I'm sorry, I'm having trouble responding right now.");
  }
});

export default router;

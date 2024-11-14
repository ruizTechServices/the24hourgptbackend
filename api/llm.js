// File: api/llm.js This File is Cleared! 11/13/2024; Luis Ruiz 
// This file is for the LLM API.
//This is exclusively for the llms. Here I would leave all the llms stateless so that they can use and be used by any other service or project.
import express from "express";
import { handleGPTModels, handleMistralModel, handleGeminiModel } from "../utils/llmService.js";


const router = express.Router();

router.post("/chatbot", async (req, res) => {
  const { userMessage, model } = req.body;

  if (!userMessage || !model) {
    return res.status(400).send("Missing required fields: userMessage or model");
  }

  try {
    let botResponse;

    switch (model) {
      case "gpt-4"://cleared and working
      case "gpt-4o"://cleared and working
        botResponse = await handleGPTModels(userMessage, model);
        break;
      case "mistral"://cleared and working
        botResponse = await handleMistralModel(userMessage);
        break;
      case "Gemini"://cleared and working
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

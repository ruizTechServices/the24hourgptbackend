// File: api/embeddings.js
import express from "express";
import { createEmbedding } from "../utils/embeddingsService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { inputText } = req.body;

  if (!inputText) {
    return res.status(400).json({ error: "inputText is required" });
  }

  try {
    const result = await createEmbedding(inputText);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create embedding" });
  }
});

export default router;
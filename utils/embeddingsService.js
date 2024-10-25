// File: utils/embeddingsService.js
import OpenAI from "openai";

const openai = new OpenAI();

export async function createEmbedding(inputText) {
  try {
    // Generate embedding using OpenAI's embedding API
    const embedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: inputText,
    });

    if (embedding.data[0].embedding.length !== 1536) {
      throw new Error("Embedding dimension mismatch. Expected 1536 dimensions.");
    }

    return embedding.data[0].embedding;
  } catch (error) {
    console.error("Error creating embedding:", error);
    throw error;
  }
}
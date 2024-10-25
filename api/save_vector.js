// File: api/save_vector.js
import express from "express";
import initPinecone from "../utils/pinecone.js";

const router = express.Router();
const pinecone = await initPinecone();
const index = pinecone.index("24hourgpt");

async function saveVector(values, namespace, customId = null, metadata = {}) {
    if (!values || !namespace) {
        throw new Error("Vector and namespace are required");
    }

    if (values.length !== 1536) {
        throw new Error("Invalid vector dimensions. Expected 1536 dimensions.");
    }

    try {
        const vectorData = {
            id: customId || Date.now().toString(),
            values: values,
            metadata: {
                ...metadata,
                timestamp: new Date().toISOString(),
            },
        };

        // Correct upsert call for Pinecone
        await index.upsert([
            {
                id: vectorData.id,
                values: vectorData.values,
                metadata: vectorData.metadata,
                namespace: namespace, // Including the namespace here
            }
        ]);

        return {
            success: true,
            vectorId: vectorData.id,
            namespace: namespace,
        };
    } catch (error) {
        console.error("Error saving vector:", error);
        throw new Error(`Failed to save vector: ${error.message}`);
    }
}



// POST route for saving vectors
router.post("/", async (req, res) => {
    const { vector, namespace, customId, metadata } = req.body;

    if (!vector || !namespace) {
        return res.status(400).json({
            error: "Both vector and namespace are required",
            requiredFields: ["vector", "namespace"],
            optionalFields: ["customId", "metadata"],
        });
    }

    try {
        const result = await saveVector(vector, namespace, customId, metadata);
        res.json(result);
    } catch (error) {
        const statusCode = error.message.includes("dimensions") ? 400 : 500;
        res.status(statusCode).json({
            error: error.message,
            timestamp: new Date().toISOString(),
        });
    }
});

export default router;

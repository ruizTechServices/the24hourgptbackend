import express from 'express';
import saveVector from '../utils/saveVector.js';
import { createEmbedding } from '../utils/embeddingsService.js';
import { generateUniqueVectorId } from '../utils/vectorIdGenerator.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { text, namespace, customId, metadata = {} } = req.body;

        if (!text || !namespace) {
            return res.status(400).json({
                error: "Both text and namespace are required",
                requiredFields: ["text", "namespace"],
                optionalFields: ["customId", "metadata"]
            });
        }

        // Generate a unique vector ID if customId is not provided
        const vectorId = customId || `vec_${await generateUniqueVectorId()}`;

        // Create embedding for the text
        const vector = await createEmbedding(text);

        // Enhance metadata with original text
        const enhancedMetadata = {
            ...metadata,
            originalText: text
        };

        // Save vector with generated or provided ID
        const result = await saveVector({
            vector,
            namespace,
            vectorId, // Use generated or custom ID
            metadata: enhancedMetadata
        });

        res.status(200).json(result);
    } catch (error) {
        console.error('Error saving vector:', error);
        res.status(500).json({
            error: 'Failed to save vector',
            details: error.message
        });
    }
});

export default router;


//I want to create a post request that sends out a text, namespace, customId, and metadata, and saves the vector to the Pinecone database.
//the text would be either a userMessage or a botMessage, and the metadata would be the genre and category.

// {
//     "text": "Yo, wattap, my name is Gio! Who are you?!",
//     "namespace": "gio",
//     "metadata": {
//         "genre": "userMessage",
//         "category": "test"
//     },
//     "customId": "test_text_3"
// }

// {
//     "text": "Hello, Gio! I'm OpenAI's language model AI, also known by the name GPT-3. I can answer questions, write essays, create content, or simply chat! How can I assist you today?",
//     "namespace": "gio",
//     "metadata": {
//         "genre": "botMessage",
//         "category": "test"
//     },
//     "customId": "test_text_3"
// }
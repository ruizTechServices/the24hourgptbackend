// api/save_vector.js
import express from 'express';
import saveVector from '../utils/saveVector.js';
import { createEmbedding } from '../utils/embeddingsService.js';

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

        // Use your existing embeddings service
        const vector = await createEmbedding(text);

        // Combine original metadata with text
        const enhancedMetadata = {
            ...metadata,
            originalText: text
        };

        const result = await saveVector({
            vector,
            namespace,
            customId,
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

//  

// {
//     "text": "Yo, wattap, my name is Gio! Who are you?!",
//     "namespace": "gio",
//     "metadata": {
//         "genre": "greeting",
//         "category": "test"
//     },
//     "customId": "test_text_2"
// }
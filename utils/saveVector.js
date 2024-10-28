// utils/saveVector.js
import initPinecone from './pinecone.js';

const pc = await initPinecone();
const index = pc.index("24hourgpt");

export default async function saveVector({ vector, namespace, customId, metadata }) {
    try {
        const vectorId = customId || `vec_${Date.now()}`;  // Generate an ID if not provided

        const result = await index.namespace(namespace).upsert([
            {
                id: vectorId,
                values: vector,
                metadata: metadata || {}
            }
        ]);

        return {
            success: true,
            data: {
                vectorId,
                namespace,
                metadata: metadata || {},
                upsertResponse: result
            }
        };
    } catch (error) {
        throw error;
    }
}
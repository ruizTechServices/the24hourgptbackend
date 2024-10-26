// api/listcollections.js
import initPinecone from './pinecone.js';  // Note the .js extension and correct path

const pc = await initPinecone();  // Need to await the initialization

export default async function listTheCollections() {
    const collections = await pc.listCollections();
    return {
        statusCode: 200,
        body: JSON.stringify(collections),
    };
}
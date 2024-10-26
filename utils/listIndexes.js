import initPinecone from './pinecone.js';

const pc = await initPinecone();
export default async function listTheIndexes() {
    const indexes = await pc.listIndexes();
    return {
        statusCode: 200,
        body: JSON.stringify(indexes),
    };
}
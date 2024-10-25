//utils\pinecone.js
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

async function initPinecone() {
    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });

    return pinecone;
}

export default initPinecone;

import fs from 'fs';
import path from 'path';

// Define path for vector_count.json
const vectorCountFilePath = path.resolve('./data/vector_count.json');

// Ensure the file exists; create if not
if (!fs.existsSync(vectorCountFilePath)) {
    fs.writeFileSync(vectorCountFilePath, JSON.stringify([]));
}

function generateRandom8DigitId() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

export async function generateUniqueVectorId() {
    const vectorIds = JSON.parse(fs.readFileSync(vectorCountFilePath, 'utf-8'));

    let uniqueId;
    do {
        uniqueId = generateRandom8DigitId();
    } while (vectorIds.includes(uniqueId));

    vectorIds.push(uniqueId);
    fs.writeFileSync(vectorCountFilePath, JSON.stringify(vectorIds, null, 2));

    return uniqueId;
}

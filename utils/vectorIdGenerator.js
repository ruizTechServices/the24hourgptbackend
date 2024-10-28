import fs from 'fs';
import path from 'path';

// Define path for vector_count.json
const dataDir = path.resolve('./data');
const vectorCountFilePath = path.join(dataDir, 'vector_count.json');

// Ensure the data directory and file exist; create if not
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

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

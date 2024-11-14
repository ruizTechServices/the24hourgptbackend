// app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import llmRoutes from './api/llm.js';
import embeddingsRoutes from './api/embeddings.js';
import saveVectorRoutes from './api/save_vector.js';
import collectionList from './api/list_collections.js';
import indexList from './api/list_indexes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(path.resolve(), 'public')));

app.use('/llm', llmRoutes);
app.use('/embeddings', embeddingsRoutes);
app.use('/save-vector', saveVectorRoutes);
app.use('/list-collections', collectionList);
app.use('/list-indexes', indexList);

app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'views', 'index.html'));
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
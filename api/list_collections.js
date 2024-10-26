// api/list_collections.js
import express from 'express';
import listTheCollections from '../utils/listcollections.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await listTheCollections();

        const collections = JSON.parse(result.body);

        res.status(result.statusCode).json(collections);
    } catch (error) {
        console.error('Error listing collections:', error);
        res.status(500).json({
            error: 'Failed to list collections',
            details: error.message
        });
    }
});

export default router;
// api/list_indexes.js
import express from 'express';
import listTheIndexes from '../utils/listIndexes.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await listTheIndexes();
        
        // Parse the stringified indexes from the result
        const indexes = JSON.parse(result.body);
        
        res.status(result.statusCode).json(indexes);
    } catch (error) {
        console.error('Error listing indexes:', error);
        res.status(500).json({ 
            error: 'Failed to list indexes',
            details: error.message 
        });
    }
});

export default router;
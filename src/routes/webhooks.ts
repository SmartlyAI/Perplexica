import express from 'express';
import { smartlyEmitter } from '../websocket/messageHandler';
const router = express.Router();

router.post('/:chatId', async (req, res) => {
    try {
        const body = req.body;
        smartlyEmitter.emit('data', body);
    } catch (error) {
        smartlyEmitter.emit('error', error);
    }
    res.status(500).json({ message: 'error from chat ' + req.params.chatId });
});

export default router;

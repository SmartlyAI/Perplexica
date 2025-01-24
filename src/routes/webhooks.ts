import express from 'express';
import { smartlyEmitter } from '../websocket/messageHandler';
const router = express.Router();

const COMPLETE_MESSAGE_STREAMING_VALUE = 'completed';
const SOURCES_MESSAGE_STREAMING_VALUE = 'sources';
const END_MESSAGE_STREAMING_VALUE = 'end';

router.post('/:chatId', async (req, res) => {
    try {
        const body = req.body;
        if(body.status === COMPLETE_MESSAGE_STREAMING_VALUE || body.status === SOURCES_MESSAGE_STREAMING_VALUE) {
            smartlyEmitter.emit('data', body);
        } else if(body.status === END_MESSAGE_STREAMING_VALUE) {
            smartlyEmitter.emit('end', body);
        }
    } catch (error) {
        smartlyEmitter.emit('error', error);
    }
    res.status(500).json({ message: 'error from chat ' + req.params.chatId });
});

export default router;

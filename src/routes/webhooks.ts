import express from 'express';
import { smartlyEmitter } from '../websocket/messageHandler';
const router = express.Router();

const IN_PROGRESS_MESSAGE_STREAMING_VALUE = 'in progress';
const SOURCES_MESSAGE_STREAMING_VALUE = 'sources';
const END_MESSAGE_STREAMING_VALUE = 'completed';

router.post('/:chatId', async (req, res) => {
    try {
        const body = req.body;
        const messageId = req.query.messageId;
        if(body.status === IN_PROGRESS_MESSAGE_STREAMING_VALUE || body.status === SOURCES_MESSAGE_STREAMING_VALUE) {
            smartlyEmitter.emit('data'+messageId, body);
        } else if(body.status === END_MESSAGE_STREAMING_VALUE) {
            smartlyEmitter.emit('end'+messageId, body);
        }
    } catch (error) {
        console.log('error', error);
    }
    res.status(500).json({ message: 'error from chat ' + req.params.chatId });
});

export default router;

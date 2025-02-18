import express from 'express';
import { smartlyEmitter } from '../websocket/messageHandler';
const router = express.Router();

const IN_PROGRESS_MESSAGE_STREAMING_VALUE = 'in progress';
const SOURCES_MESSAGE_STREAMING_VALUE = 'sources found';
const END_MESSAGE_STREAMING_VALUE = 'completed';

router.post('/:chatId', async (req, res) => {
    try {
        const body = req.body;
        const messageId = req.query.messageId;
        if(body.status === IN_PROGRESS_MESSAGE_STREAMING_VALUE || body.status === 'final result') {
            smartlyEmitter.emit('data'+messageId, body);
        } else if(body.status === SOURCES_MESSAGE_STREAMING_VALUE) {
            const parsedData = JSON.parse(body.sentence || '[]');
            if (parsedData.length) {
                const metadataArray = [];
                for (const item of parsedData) {
                    if (item[0]?.metadata) {
                        metadataArray.push({
                            pageContent: item[0].metadata?.source?.name || '',
                            metadata: {
                                title: item[0].metadata?.source?.name || '',
                                url: item[0].metadata?.source?.url || '',
                                image: item[0].metadata?.source?.image || '',
                            }
                        });
                    }
                }
                console.log(JSON.stringify(metadataArray, null, 2));
                smartlyEmitter.emit('data'+messageId, {data: metadataArray, status: SOURCES_MESSAGE_STREAMING_VALUE});
            } 
        } else if(body.status === END_MESSAGE_STREAMING_VALUE) {
            smartlyEmitter.emit('end'+messageId, body);
        }
        res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'error from chat '});
    }
});

export default router;

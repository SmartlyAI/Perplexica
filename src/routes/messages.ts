import express from 'express';
import logger from '../utils/logger';
import db from '../db/index';
import { and, eq } from 'drizzle-orm';
import { chats, messages } from '../db/schema';

const router = express.Router();

router.get('/:id/:token', async (req, res) => {
    try {
        const { id, token } = req.params;

        const chatExists = await db.query.chats.findFirst({
            where: and(eq(chats.id, id), eq(chats.token, token)),
        });

        if (!chatExists) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        const chatMessages = await db.query.messages.findMany({
            where: eq(messages.chatId, req.params.id),
        });

        return res.status(200).json({ chat: chatExists, messages: chatMessages });
    } catch (err) {
        res.status(500).json({ message: 'An error has occurred.' });
        logger.error(`Error in getting chat: ${err.message}`);
    }
});

export default router;

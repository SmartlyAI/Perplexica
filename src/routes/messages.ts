import express from 'express';
import logger from '../utils/logger';
import db from '../db/index';
import { and, eq } from 'drizzle-orm';
import { chats, messages } from '../db/schema';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const chatExists = await db.query.chats.findFirst({
            where: eq(chats.id, id),
        });

        if (chatExists && chatExists.shared === 0) {
            const token = req.query.token as string;
            const isShared = await db.query.chats.findFirst({
                where: and(eq(chats.id, id), eq(chats.token, token)),
            });

            if (!isShared) {
                return res.status(404).json({ message: 'Chat not found' });
            }
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

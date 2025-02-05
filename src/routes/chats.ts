import express from 'express';
import logger from '../utils/logger';
import db from '../db/index';
import { and, eq, inArray } from 'drizzle-orm';
import { chats, messages } from '../db/schema';

const router = express.Router();

router.get('/:token', async (req, res) => {
  try {
    const token = req.params.token;
    let Chats = await db.query.chats.findMany({
      where: and(eq(chats.token, token), eq(chats.archived, 0)),
    });

    Chats = Chats.reverse();

    return res.status(200).json({ chats: Chats });
  } catch (err) {
    res.status(500).json({ message: 'An error has occurred.' });
    logger.error(`Error in getting chats: ${err.message}`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const chatExists = await db.query.chats.findFirst({
      where: eq(chats.id, req.params.id),
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

router.delete(`/:id`, async (req, res) => {
  try {
    const chatExists = await db.query.chats.findFirst({
      where: eq(chats.id, req.params.id),
    });

    if (!chatExists) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    await db.delete(chats).where(eq(chats.id, req.params.id)).execute();
    await db
      .delete(messages)
      .where(eq(messages.chatId, req.params.id))
      .execute();

    return res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'An error has occurred.' });
    logger.error(`Error in deleting chat: ${err.message}`);
  }
});

router.patch('/:id/title', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const chatExists = await db.query.chats.findFirst({
      where: eq(chats.id, req.params.id),
    });

    if (!chatExists) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    await db.update(chats).set({ title }).where(eq(chats.id, req.params.id)).execute();

    return res.status(200).json({ message: 'Chat title updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'An error has occurred.' });
    logger.error(`Error in updating chat title: ${err.message}`);
  }
});

router.patch('/:id/share', async (req, res) => {
  try {
    const { shared } = req.body;

    const chatExists = await db.query.chats.findFirst({
      where: eq(chats.id, req.params.id),
    });

    if (!chatExists) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    await db.update(chats).set({ shared }).where(eq(chats.id, req.params.id)).execute();

    return res.status(200).json({ message: 'Chat shared successfully' });
  } catch (err) {
    res.status(500).json({ message: 'An error has occurred.' });
    logger.error(`Error in sharing chat: ${err.message}`);
  }
});

router.get('/:token/shared', async (req, res) => {
  try {
    const token = req.params.token;
    let Chats = await db.query.chats.findMany({
      where: and(eq(chats.token, token), eq(chats.shared, 1)),
    });

    if (!Chats) {
      return res.status(404).json({ message: 'Shared Chats not found' });
    }

    Chats = Chats.reverse();

    return res.status(200).json({ chats: Chats });
  } catch (err) {
    res.status(500).json({ message: 'An error has occurred.' });
    logger.error(`Error in getting chats: ${err.message}`);
  }
});

router.delete('/deleteAll/:token', async (req, res) => {
  try {
    const chatsToDelete = await db.query.chats.findMany({
      where: eq(chats.token, req.params.token),
    });

    if (!chatsToDelete.length) {
      return res.status(404).json({ message: 'No chats found' });
    }

    const chatIds = chatsToDelete.map((chat) => chat.id);
    await db.delete(messages).where(inArray(messages.chatId, chatIds)).execute();
    await db.delete(chats).where(eq(chats.token, req.params.token)).execute();

    return res.status(200).json({ message: 'Chats and associated messages deleted successfully' });
  } catch (err) {
    logger.error(`Error in deleting chats: ${err.message}`);
    return res.status(500).json({ message: 'An error has occurred.' });
  }
});

router.patch('/:id/archive', async (req, res) => {
  try {
    const { archived } = req.body;

    const chatExists = await db.query.chats.findFirst({
      where: eq(chats.id, req.params.id),
    });

    if (!chatExists) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    await db.update(chats).set({ archived }).where(eq(chats.id, req.params.id)).execute();

    return res.status(200).json({ message: 'Chat archived successfully' });
  } catch (err) {
    res.status(500).json({ message: 'An error has occurred.' });
    logger.error(`Error in archiving chat: ${err.message}`);
  }
});

router.get('/:token/archived', async (req, res) => {
  try {
    const token = req.params.token;
    let Chats = await db.query.chats.findMany({
      where: and(eq(chats.token, token), eq(chats.archived, 1)),
    });

    if (!Chats) {
      return res.status(404).json({ message: 'Archived Chats not found' });
    }

    Chats = Chats.reverse();

    return res.status(200).json({ chats: Chats });
  } catch (err) {
    res.status(500).json({ message: 'An error has occurred.' });
    logger.error(`Error in getting archived chats: ${err.message}`);
  }
});

router.patch('/:token/archiveAll', async (req, res) => {
  try {
    const token = req.params.token;
    const updatedChats = await db
      .update(chats)
      .set({ archived: 1 })
      .where(and(eq(chats.token, token), eq(chats.archived, 0)))
      .returning();

    if (!updatedChats.length) {
      return res.status(404).json({ message: 'No unarchived chats found to archive' });
    }

    return res.status(200).json({ message: 'Unarchived chats archived successfully', chats: updatedChats });
  } catch (err) {
    res.status(500).json({ message: 'An error has occurred.' });
    logger.error(`Error in archiving chats: ${err.message}`);
  }
});


export default router;

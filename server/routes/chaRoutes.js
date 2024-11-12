// routes/chatRoutes.js
import express from 'express';
import { getMessagesByAgentId, sendMessage } from '../controllers/chatController.js';

const router = express.Router();

// Route to fetch all messages for a given agent
router.get('/:agentId', getMessagesByAgentId);

// Route to send a new message
router.post('/', sendMessage);

export default router;

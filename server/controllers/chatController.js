// controllers/chatController.js
import Message from "../models/chatModel.js";

// Controller to get messages by agent ID
export const getMessagesByAgentId = async (req, res) => {
  try {
    const messages = await Message.find({ roomId: req.params.agentId }).sort('timestamp');
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to load messages' });
  }
};

// Controller to save a new message
export const sendMessage = async (req, res) => {
  try {
    const { roomId, sender, text } = req.body;
    const newMessage = new Message({
      roomId,
      sender,
      text,
    });
    await newMessage.save();
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};

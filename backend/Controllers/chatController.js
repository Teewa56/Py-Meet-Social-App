const Chat = require('../Models/chatModel');
const User = require('../Models/userModel');

// Send a new message
exports.sendMessage = async (req, res) => {
    try {
        const { sender, receiver, content } = req.body;
        if (!sender || !receiver || !content) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const chat = new Chat({ sender, receiver, content });
        await chat.save();
        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get messages between two users
exports.getMessagesForChat = async (req, res) => {
    try {
        const { userId1, userId2 } = req.params;
        const messages = await Chat.find({
            $or: [
                { sender: userId1, receiver: userId2 },
                { sender: userId2, receiver: userId1 }
            ]
        }).sort({ timeStamp: 1 })
        .populate('receiver sender', 'username profilePicture');

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get last message per user with details
exports.getLastMessagesWithDetails = async (req, res) => {
    try {
        const chats = await Chat.aggregate([
            { $sort: { timeStamp: -1 } },
            { $group: {
                _id: { sender: '$sender', receiver: '$receiver' },
                lastMessage: { $first: '$content' },
                senderId: { $first: '$sender' },
                receiverId: { $first: '$receiver' },
                timeStamp: { $first: '$timeStamp' }
            }}
        ]);

        const enrichedChats = await Promise.all(chats.map(async chat => {
            const sender = await User.findById(chat.senderId, 'username profilePicture');
            const receiver = await User.findById(chat.receiverId, 'username profilePicture');
            return { ...chat, sender, receiver };
        }));

        res.status(200).json(enrichedChats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const deletedMessage = await Chat.findByIdAndDelete(messageId);
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


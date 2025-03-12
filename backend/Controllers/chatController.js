const Chat = require('../Models/chatModel');
const User = require('../Models/userModel'); // Assuming a User model exists

// Send a new message
exports.sendMessage = async (req, res) => {
    try {
        const chat = new Chat(req.body);
        await chat.save();
        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get messages for a specific chat (e.g., between two users)
exports.getMessagesForChat = async (req, res) => {
    try {
        const { userId1, userId2 } = req.params; // IDs of the two users involved in the chat
        const messages = await Chat.find({
            $or: [
                { sender: userId1, receiver: userId2 },
                { sender: userId2, receiver: userId1 }
            ]
        }).sort({ timeStamp: 1 }) // Sort messages in ascending order
        .populate('receiver sender', 'username profilePicture');

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get the last message for each chat along with sender details
exports.getLastMessagesWithDetails = async (req, res) => {
    try {
        const chats = await Chat.aggregate([
            {
                $sort: { timeStamp: -1 } // Sort messages by latest first
            },
            {
                $group: {
                    _id: {
                        chatPair: {
                            $cond: {
                                if: { $lt: ["$sender", "$receiver"] },
                                then: { sender: "$sender", receiver: "$receiver" },
                                else: { sender: "$receiver", receiver: "$sender" }
                            }
                        }
                    },
                    lastMessage: { $first: "$content" },
                    senderId: { $first: "$sender" },
                    receiverId: { $first: "$receiver" },
                    timeStamp: { $first: "$timeStamp" }
                }
            }
        ]);

        // Populate sender and receiver details (username and profile picture)
        const chatDetails = await Promise.all(
            chats.map(async (chat) => {
                const sender = await User.findById(chat.senderId).select('username profilePicture');
                const receiver = await User.findById(chat.receiverId).select('username profilePicture');

                return {
                    chatId: chat._id.chatPair, // Sender and receiver IDs
                    lastMessage: chat.lastMessage,
                    sender: { username: sender.userName, profilePicture: sender.profilePic },
                    receiver: { username: receiver.userName, profilePicture: receiver.profilePic },
                    timeStamp: chat.timeStamp
                };
            })
        );

        res.status(200).json(chatDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit a message
exports.editMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedChat = await Chat.findByIdAndUpdate(
            id,
            { content: req.body.content, edited: true },
            { new: true }
        ).populate('receiver sender', 'username profilePicture');

        if (!updatedChat) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json(updatedChat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedChat = await Chat.findByIdAndDelete(id);
        if (!deletedChat) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

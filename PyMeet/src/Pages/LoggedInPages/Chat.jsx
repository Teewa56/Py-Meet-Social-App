import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { ChatContext } from "../../Context/chatContext";
import { socket } from "../../Services/socket.io-client";

const Chat = ({ selectedUser }) => {
    const { GetMessages, SendMessage } = useContext(ChatContext);
    const { receiverId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("")
    const receiver = selectedUser || { _id: receiverId, name: `User ${receiverId}` };

    useEffect(() => {
        if (receiverId) {
            const fetchMessages = async () => {
                try {
                    const user = JSON.parse(localStorage.getItem("user"));
                    const data = await GetMessages(user._id, receiverId);
                    setMessages(data);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            };
            fetchMessages();
        }
    }, [receiverId, GetMessages]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === "" || !receiver._id) return;
        const user = JSON.parse(localStorage.getItem("user"));

        const messageData = {
            senderId: user._id,
            receiverId: receiver._id,
            content: newMessage,
        };

        await SendMessage(messageData);
        socket.emit("sendMessage", messageData);
        setMessages((prev) => [...prev, messageData]);
        setNewMessage("");
    };

    useEffect(() => {
        socket.on("receiveMessage", (newMsg) => {
            setMessages((prev) => [...prev, newMsg]);
        });

        return () => socket.off("receiveMessage");
    }, []);

    return (
        <div className="chat-container p-5">
            <h2>Chat with {receiver.name || "Select a user"}</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.senderId === receiver._id ? "received" : "sent"}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <input 
                type="text" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
                placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

// **PropTypes Validation**
Chat.propTypes = {
    selectedUser: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
};

export default Chat;

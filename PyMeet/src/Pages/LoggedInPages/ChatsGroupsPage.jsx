import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../Context/chatContext";
import ChatList from "../../Components/ChatsList";
import NewchatBtn from '../../Components/NewChatBtn';

const ChatsGroupPage = () => {
    const [recentChats, setRecentChats] = useState([]);
    const { GetLastMessages } = useContext(ChatContext);
    const navigate = useNavigate();

    useEffect(() => {
        const loadRecentChats = async () => {
            try {
                const data = await GetLastMessages();
                console.log("Fetched active users:", data);
                setRecentChats(data);
            } catch (error) {
                console.error("Error loading recent chats:", error);
            }
        };
        loadRecentChats();
    }, []);

    const handleSelectUser = (user) => {
        navigate(`/Chat/${user._id}`);
    };

    return (
        <div className="chat-layout p-3">
            <h2 className="text-2xl font-bold">Active Users</h2>
            {recentChats.length === 0 ? <p>No users found</p> : null}
            <ChatList activeUsers={recentChats} onSelectUser={handleSelectUser} />
            <NewchatBtn />
        </div>
    );
};

export default ChatsGroupPage;

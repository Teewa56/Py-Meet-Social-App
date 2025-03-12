import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../Context/ChatContext';
import UsersList from '../../Components/UsersList';
import Chat from './Chat';
import socket from '../../Services/socket.io-client';

const ChatsGroupPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const { GetLastMessage } = useContext(ChatContext);
  
  useEffect(() => {
    // Load initial data
    loadRecentChats();
    
    // Set up socket listeners
    socket.on("updateActiveUsers", (users) => {
      setActiveUsers(users);
    });
    
    socket.on("receiveMessage", (message) => {
      setMessages(prev => [...prev, message]);
    });
    
    return () => {
      socket.off("updateActiveUsers");
      socket.off("receiveMessage");
    };
  }, []);
  
  const loadRecentChats = async () => {
    const data = await GetLastMessage();
    // Process and organize your recent chats here
  };
  
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Load chat history with this user
    loadChatHistory(user.id);
  };
  
  const loadChatHistory = async (userId) => {
    // Implement API call to get messages with selected user
    const currentUserId = JSON.parse(localStorage.getItem('user'))._id;
    // You'll need to implement a getMessages function in your context
    // const chatHistory = await getMessages(currentUserId, userId);
    // setMessages(chatHistory);
  };
  
  return (
    <div className="chat-layout">
      <UsersList 
        activeUsers={activeUsers}
        onSelectUser={handleUserSelect}
        selectedUser={selectedUser}
      />
      <Chat 
        selectedUser={selectedUser}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
};

export default ChatsGroupPage;
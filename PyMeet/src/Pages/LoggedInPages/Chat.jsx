// ChatWindow.jsx - Component to display and send messages
import { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ChatContext } from '../../Context/chatContext';
import { socket, sendMessage } from '../../Services/socket.io-client';

const Chat = ({ selectedUser, messages, setMessages }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const { SendMessage } = useContext(ChatContext);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;
    
    const messageData = {
      senderId: currentUser._id,
      recipientId: selectedUser.id,
      content: newMessage,
      timestamp: new Date()
    };
    
    // Add message to local state immediately for UI responsiveness
    setMessages(prev => [...prev, messageData]);
    
    // Send through socket
    socket.emit("sendMessage", messageData);
    
    // Also save to database
    await SendMessage(messageData);
    
    // Clear input
    setNewMessage('');
  };
  
  if (!selectedUser) {
    return (
      <div className="chat-window empty-state">
        <p>Select a user to start chatting</p>
      </div>
    );
  }
  
  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Chat with {selectedUser.name}</h2>
      </div>
      
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div 
            key={index}
            className={`message ${msg.senderId === currentUser._id ? 'sent' : 'received'}`}
          >
            <div className="message-content">{msg.content}</div>
            <div className="message-time">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="message-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

Chat.propTypes = {
  selectedUser: PropTypes.object,
  messages: PropTypes.array.isRequired,
  setMessages: PropTypes.func.isRequired
};

export default Chat;
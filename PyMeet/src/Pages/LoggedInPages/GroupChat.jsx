import { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GroupContext } from '../context/GroupContext';
import socket from '../../Services/socket.io-client';

const GroupChat = () => {
  const { groupId } = useParams();
  const { SendGroupMessage, loading } = useContext(GroupContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [groupInfo, setGroupInfo] = useState(null);
  const messagesEndRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Fetch group info and messages
    const fetchGroupData = async () => {
      try {
        // Fetch group details from your API
        const groupResponse = await fetch(`/api/groups/${groupId}`);
        const groupData = await groupResponse.json();
        setGroupInfo(groupData);

        // Fetch group messages
        const messagesResponse = await fetch(`/api/groups/${groupId}/messages`);
        const messagesData = await messagesResponse.json();
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchGroupData();

    // Join the group's socket room
    socket.emit('joinGroup', groupId);

    // Listen for new group messages
    socket.on('receiveGroupMessage', (message) => {
      if (message.groupId === groupId) {
        setMessages(prev => [...prev, message]);
      }
    });

    return () => {
      // Leave the group's socket room when component unmounts
      socket.emit('leaveGroup', groupId);
      socket.off('receiveGroupMessage');
    };
  }, [groupId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      content: newMessage,
      timestamp: new Date()
    };

    try {
      // Send message to server (save to database)
      await SendGroupMessage(groupId, currentUser._id, messageData);

      // Send via socket for real-time
      socket.emit('sendGroupMessage', {
        groupId,
        senderId: currentUser._id,
        content: newMessage
      });

      // Clear input
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!groupInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="group-chat">
      <div className="chat-header">
        <h2>{groupInfo.name}</h2>
        <div>{groupInfo.members.length} members</div>
      </div>

      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.senderId === currentUser._id ? 'sent' : 'received'}`}
          >
            <div className="sender-info">
              {message.senderId !== currentUser._id && (
                <span className="sender-name">
                  {groupInfo.members.find(m => m._id === message.senderId)?.name || 'Unknown'}
                </span>
              )}
            </div>
            <div className="message-content">{message.content}</div>
            <div className="message-time">
              {new Date(message.timestamp).toLocaleTimeString()}
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
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
};

export default GroupChat;
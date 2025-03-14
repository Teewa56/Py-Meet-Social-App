import { createContext, useState } from "react";
import { sendMessage, getMessages, getLastMessages, deleteMessage } from "../Services/api";
import PropTypes from "prop-types";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const SendMessage = async (message) => {
    setLoading(true);
    try {
      await sendMessage(message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const GetMessages = async (userId1, userId2) => {
    setLoading(true);
    try {
      const { data } = await getMessages(userId1, userId2);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const GetLastMessages = async () => {
    setLoading(true);
    try {
      const { data } = await getLastMessages();
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const DeleteMessage = async (messageId) => {
    setLoading(true);
    try {
      await deleteMessage(messageId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ SendMessage, GetMessages, GetLastMessages, DeleteMessage, loading, error }}>
      {children}
    </ChatContext.Provider>
  );
};

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ChatContext, ChatProvider };

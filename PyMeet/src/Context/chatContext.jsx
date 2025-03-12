import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import { sendMessage, getLastMessage, editMessage, deleteMessage, getMessages } from "../Services/api";

const ChatContext = createContext();
//store the recent chats to localstorage and use them in the recent page.  
//also update it here to prevent issues.
const ChatProvider = ({ children }) => {

    const [error, setError ] = useState(null);
    const [loading, setLoading] = useState(false);


    const SendMessage = async(message) => {
        setLoading(true);
        try{
            const res = await sendMessage(message);
            const data = await res.json();
            return data;
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };

    const GetLastMessage = async() => {
        setLoading(true);
        try {
            const res = await getLastMessage();
            const data = await res.json();
            return data;
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };

    const EditMessage = async(id, message) => {
        setLoading(true);
        try {
            const res = await editMessage(id, message);
            const data = await res.json();
            return data;
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }; 

    const DeleteMessage = async(id) => {
        setLoading(true);
        try {
            const res = await deleteMessage(id);
            const data = await res.json();
            return data;
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        } 
    }

    // Add this function to your ChatProvider
    const GetMessages = async(userId1, userId2) => {
    setLoading(true);
    try {
      const res = await getMessages(userId1, userId2);
      const data = await res.json();
      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Add GetMessages to your ChatContext.Provider value

    return(
        <ChatContext.Provider value={{loading, error, SendMessage, GetLastMessage, EditMessage, DeleteMessage, GetMessages }} >
            {children}
        </ChatContext.Provider>
    )
};

ChatProvider.propTypes = {
    children : PropTypes.node.isRequired,
}

export { ChatContext, ChatProvider};
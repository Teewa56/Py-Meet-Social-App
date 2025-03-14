import { createContext, useEffect, useState } from "react";
import {
  getNotifications,
  markNotification,
  deleteNotification,
} from "../Services/api"; 
import { socket } from "../Services/socket.io-client"; 
import PropTypes from 'prop-types';

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    if (!userId) return;

    // Fetch notifications from API
    const fetchNotifications = async () => {
      try {
        const { data } = await getNotifications(userId);
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    // Listen for real-time notifications
    socket.on("receiveNotification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, [userId]);

  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      await markNotification(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Delete a notification
  const removeNotification = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, markAsRead, removeNotification, sendNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
    children : PropTypes.node.isRequired
}

export {NotificationContext,  NotificationProvider}

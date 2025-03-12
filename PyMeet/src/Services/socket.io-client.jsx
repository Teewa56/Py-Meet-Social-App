import { io } from "socket.io-client";

const socket = io("http://localhost:5173", {
  withCredentials: true,
});

// Handle connection
socket.on("connect", () => {
  console.log("Connected to server with ID:", socket.id);

  // Notify server that the user is online
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?._id) {
    socket.emit("userOnline", user._id);
  }
});

// Handle disconnection
socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

// Send a direct message
const sendMessage = (recipientId, content) => {
  socket.emit("sendMessage", { recipientId, content });
};

// Send a group message
const sendGroupMessage = (groupId, senderId, content) => {
  socket.emit("sendGroupMessage", { groupId, senderId, content });
};

// Send a notification
const sendNotification = (targetUserId, title, message) => {
  socket.emit("sendNotification", { targetUserId, title, message });
};

export { socket, sendMessage, sendGroupMessage, sendNotification };

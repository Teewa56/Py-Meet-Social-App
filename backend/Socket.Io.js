const { Server } = require("socket.io");

let io;
const activeUsers = new Set(); // Track active users

module.exports = {
  init: (server) => {
    io = new Server(server, {
      cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);
      socket.on("userOnline", (userId) => {
        socket.userId = userId; // Associate userId with the socket
        activeUsers.add(userId);
        io.emit("updateActiveUsers", Array.from(activeUsers)); // Notify all users
      });

      socket.on("disconnect", () => {
        if (socket.userId) {
          activeUsers.delete(socket.userId); // Remove user from active set
          io.emit("updateActiveUsers", Array.from(activeUsers)); // Notify all users
        }
        console.log("User disconnected:", socket.id);
      });

      socket.on("sendMessage", (message) => {
        console.log("Message received:", message);
        io.to(message.recipientId).emit("receiveMessage", message);
      });

      socket.on("sendGroupMessage", (groupMessage) => {
        console.log("Group message received:", groupMessage);
        const { groupId, senderId, content } = groupMessage;
        io.to(groupId).emit("receiveGroupMessage", {
          groupId,
          senderId,
          content,
          timestamp: new Date(),
        });
      });
      socket.on("sendNotification", (notification) => {
        console.log("Notification received:", notification);

        // Emit notification to the target user
        io.to(notification.targetUserId).emit("receiveNotification", notification);
      });
    });

    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.IO not initialized!");
    }
    return io;
  },
};

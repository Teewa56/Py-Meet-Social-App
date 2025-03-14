const { Server } = require('socket.io');
let io;
const activeUsers = new Set();

module.exports = {
    init: (server) => {
        io = new Server(server, {
            cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'], credentials: true }
        });

        io.on('connection', (socket) => {
            console.log('User connected:', socket.id);
            socket.on('userOnline', (userId) => {
                socket.userId = userId;
                activeUsers.add(userId);
                io.emit('updateActiveUsers', [...activeUsers]);
            });

            socket.on('disconnect', () => {
                if (socket.userId) activeUsers.delete(socket.userId);
                io.emit('updateActiveUsers', [...activeUsers]);
                console.log('User disconnected:', socket.id);
            });

            socket.on('sendMessage', (message) => {
                io.emit('receiveMessage', message);
            });
        });

        return io;
    },
    getIO: () => {
        if (!io) throw new Error('Socket.IO not initialized!');
        return io;
    }
};

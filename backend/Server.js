require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const http = require('http'); // Required for creating an HTTP server
const socket = require('./Socket.Io'); // Your custom Socket.IO logic

const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const postRoutes = require('./Routes/postRoutes');
const commentRoutes = require('./Routes/commentRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const groupRoutes = require('./Routes/groupRoutes');
const notificationRoutes = require('./Routes/NotificationRoutes');
const connectDB = require('./DB/dbConfig');

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socket.init(server); // Initialize Socket.IO

// Middleware
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/api', chatRoutes);
app.use('/api', groupRoutes);
app.use('/api', notificationRoutes);

// Database Connection & Server Start
connectDB().then(() => {
    const port = 3000;
    server.listen(port, () => { // Use `server.listen` instead of `app.listen`
        console.log(`SERVER IS RUNNING ON PORT ${port}`);
    });
}).catch((error) => {
    console.error('Failed to connect to the database:', error);
});

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import playerRoutes from './routes/playerRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import externalRoutes from './routes/externalRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { pollLiveMatches } from './pollMatches.js';

const app = express();
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
  console.log('i am in server.js at /');
  res.send('API is running');
});
app.use('/api/players', playerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/external', externalRoutes);

app.use(notFound);
app.use(errorHandler);

// Create HTTP + WebSocket server
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // frontend URL
    methods: ['GET', 'POST']
  }
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);
});

// Start polling for live match updates every 60 seconds
setInterval(() => {
  pollLiveMatches(io);
}, 60000);

// Start the server
server.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});

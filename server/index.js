import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http'; // Import http for Socket.io
import { Server } from 'socket.io'; // Import Socket.io
import dbConnect from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import kycRoutes from './routes/kycRoutes.js';
import chatRoutes from './routes/chaRoutes.js'; // Corrected the route spelling

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
dbConnect();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io with the HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials
  },
});

// Middleware for CORS
app.use(
  cors({
    origin: '*', // Allow all origins
    credentials: true, // Allow credentials if you are using cookies or sessions
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  })
);

app.use(express.json());
app.use(morgan('dev'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/kyc/agent', kycRoutes);
app.use('/api/chat', chatRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Visa Venture');
});

// Socket.io implementation
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for a user joining a specific room using roomId (agentId or any identifier)
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Listen for send_message event
  socket.on('send_message', (data) => {
    console.log('Message received:', data);
    // Emit the message to the specific room
    io.to(data.roomId).emit('receive_message', data);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Preflight request handling for CORS
app.options('*', cors());

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import dbConnect from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import kycRoutes from './routes/kycRoutes.js';
import chatRoutes from './routes/chaRoutes.js';
import visaApplicationRoutes from './routes/visaApplicationRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// DB connect
dbConnect();

// Express CORS middleware
const allowedOrigins = [
  "https://www.visaventures.in",
  "https://visa-venture-kpi5.vercel.app",
  "https://visa-venture.vercel.app",
  "http://localhost:5173",
  "http://localhost:8000"
];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/kyc/agent', kycRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/visa-application', visaApplicationRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Visa Venture');
});

// HTTP server
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"] // force both transports
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('send_message', (data) => {
    io.to(data.roomId).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

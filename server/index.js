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
import visaApplicationRoutes from './routes/visaApplicationRoutes.js'; // Added visa application routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;


dbConnect();


const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: ["https://www.visaventures.in","https://visa-venture-kpi5.vercel.app", "http://localhost:3000"], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  },
}); 


const allowedOrigins = [
  "https://visa-venture.vercel.app",
  "https://www.visaventures.in",
  "http://localhost:5173", // optional for local dev
];
app.use(
  cors({
   origin: function (origin, callback) {
      if (!origin) return callback(null, true); // for Postman or server-to-server calls
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(morgan('dev'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/kyc/agent', kycRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/visa-application', visaApplicationRoutes);  // Added Visa Application routes

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Visa Venture');
});


io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  
  socket.on('send_message', (data) => {
    console.log('Message received:', data);
    
    io.to(data.roomId).emit('receive_message', data);
  });

  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


app.options('*', cors());


server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});





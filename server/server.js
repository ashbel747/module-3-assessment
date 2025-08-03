const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));

// Start server after DB connects
mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

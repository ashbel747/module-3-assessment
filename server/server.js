const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

//db connection
connectDB();


const allowedOrigins = [
  'http://localhost:5173',              // Local dev
  'https://inkspir.netlify.app', // Netlify site URL
];

// Enable CORS for frontend
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

//  Middleware
app.use(express.json());

//  Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));


app.get('/', (req, res) => {
  res.send('API is running ✅');
});


// Start server
mongoose.connection.once('open', () => {
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
});
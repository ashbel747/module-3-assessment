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

// ✅ Enable CORS for frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true,
}));

//  Middleware
app.use(express.json());

// Start server
mongoose.connection.once('open', () => {
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
});

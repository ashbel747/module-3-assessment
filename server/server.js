const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));



//  Middleware
app.use(express.json());

//  Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Start server
mongoose.connection.once('open', () => {
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
});

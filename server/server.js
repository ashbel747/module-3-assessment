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

// Middleware
app.use(express.json());

// In-memory storage for demo
const users = [];
const themePreferences = {};

// Test endpoint for Postman
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Navbar backend is working!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// Get current user (for navbar user info)
app.get('/api/user', (req, res) => {
  // For demo, return a mock user
  res.json({
    user: {
      id: '1',
      username: 'Demo User',
      email: 'demo@example.com'
    }
  });
});

// Save theme preference
app.post('/api/theme', (req, res) => {
  try {
    const { theme, userId } = req.body;
    
    if (!theme) {
      return res.status(400).json({ 
        message: 'Theme is required',
        status: 'error'
      });
    }

    // Save theme preference (in real app, save to database)
    themePreferences[userId || 'default'] = theme;
    
    res.json({
      message: 'Theme preference saved successfully',
      theme: theme,
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error',
      status: 'error'
    });
  }
});

// Get theme preference
app.get('/api/theme', (req, res) => {
  try {
    const userId = req.query.userId || 'default';
    const theme = themePreferences[userId] || 'light';
    
    res.json({
      theme: theme,
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error',
      status: 'error'
    });
  }
});

// Get all users (for demo)
app.get('/api/users', (req, res) => {
  res.json({
    users: users,
    count: users.length,
    status: 'success'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Navbar backend running on port ${PORT}`);
  console.log(`📝 Test with Postman: http://localhost:${PORT}/api/test`);
});

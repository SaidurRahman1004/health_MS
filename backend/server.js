const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully! '))
    .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Test Route
app.get('/', (req, res) => {
    res.json({
        message: '🏥 HealthCheck Pro API is running! ',
        version: '1.0.0'
    });
});

// Import Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/symptoms', require('./routes/symptoms'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/firstaid', require('./routes/firstaid'));
app.use('/api/history', require('./routes/history'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'কিছু ভুল হয়েছে! ', error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
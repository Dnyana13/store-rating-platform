const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));


const { sequelize } = require('./models');

sequelize.sync()
    .then(() => console.log('All models synced'))
    .catch(err => console.log(err));


// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// To Test Dummy DB API
app.get('/test-db', async (req, res) => {
    const users = await require('./models').User.findAll();
    res.json(users);
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const { verifyToken } = require('./middleware/authMiddleware');


// This will create protected route (for testing purposes) that requires a valid JWT token to access. You can test this by sending a request with the token in the Authorization header.
app.get('/protected', verifyToken, (req, res) => {
    res.json({
        message: 'Protected route accessed',
        user: req.user
    });
});


// Admin Routes (Only for Admins)
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// User Routes (Only for Users)
const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);
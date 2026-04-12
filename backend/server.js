const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

// DB
const { sequelize } = require('./models');

sequelize.sync()
    .then(() => console.log('All models synced'))
    .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/test-db', async (req, res) => {
    const users = await require('./models').User.findAll();
    res.json(users);
});

// Auth
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Middleware
const { verifyToken } = require('./middleware/authMiddleware');

// Protected route
app.get('/protected', verifyToken, (req, res) => {
    res.json({
        message: 'Protected route accessed',
        user: req.user
    });
});

app.use(express.json());
app.use(cors());
// Role Routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const ownerRoutes = require('./routes/ownerRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/owner', ownerRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isUser } = require('../middleware/authMiddleware');

// Only for logged-in users with role 'user'
router.use(verifyToken, isUser);

// Get all stores
router.get('/stores', userController.getStores);

// Submit or update rating for a store
router.post('/rate', userController.submitRating);

module.exports = router;
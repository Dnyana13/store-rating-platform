const express = require('express');
const router = express.Router();

const { verifyToken, isOwner } = require('../middleware/authMiddleware');
const { getOwnerDashboard } = require('../controllers/ownerController');

// Owner Dashboard
router.get('/dashboard', verifyToken, isOwner, getOwnerDashboard);

module.exports = router;

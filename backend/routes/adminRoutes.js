const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// all routes protected and admin only
router.use(verifyToken, isAdmin);

// add user 
router.post('/add-user', adminController.addUser);

// Add store
router.post('/add-store', adminController.addStore);

// get all users
router.get('/users', adminController.getUsers);

// get all stores
router.get('/stores', adminController.getStores);

// Dashboard stats
router.get('/dashboard', adminController.dashboard);

module.exports = router;
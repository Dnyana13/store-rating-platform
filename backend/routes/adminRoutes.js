const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // keep this

// Middleware for authentication and role checking
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Apply middleware to all routes in this router
router.use(verifyToken, isAdmin);

// Routes for admin functionalities
router.post('/add-user', adminController.addUser);
router.post('/add-store', adminController.addStore);

router.post('/store', adminController.createStore); // New route for creating store with owner assignment

router.get('/users', adminController.getUsers);
router.get('/stores', adminController.getStores);
router.get('/stats', adminController.getAdminStats);

router.get('/dashboard', adminController.dashboard);

router.delete('/user/:id', adminController.deleteUser);
router.delete('/store/:id', adminController.deleteStore);

module.exports = router;
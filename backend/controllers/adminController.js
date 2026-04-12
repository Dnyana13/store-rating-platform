const bcrypt = require('bcrypt');
const { User, Store, Rating } = require('../models');
const { Op } = require('sequelize');

// To add User (Admin/User/Owner)
exports.addUser = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role
        });

        res.status(201).json({ message: 'User created', user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// To Add Store
exports.addStore = async (req, res) => {
    try {
        const { name, email, address, owner_id } = req.body;

        const store = await Store.create({
            name,
            email,
            address,
            owner_id
        });

        res.status(201).json({ message: 'Store added', store });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// To Get Users (with filters) and sorting
exports.getUsers = async (req, res) => {
    try {
        const {
            name,
            email,
            address,
            role,
            sort = 'ASC',
            page = 1,
            limit = 5
        } = req.query;

        const offset = (page - 1) * limit;

        const users = await User.findAndCountAll({
            where: {
                ...(name && { name: { [Op.like]: `%${name}%` } }),
                ...(email && { email: { [Op.like]: `%${email}%` } }),
                ...(address && { address: { [Op.like]: `%${address}%` } }),
                ...(role && { role })
            },
            order: [['name', sort]],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            totalUsers: users.count,
            totalPages: Math.ceil(users.count / limit),
            currentPage: parseInt(page),
            data: users.rows
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Stores (with average rating) and sorting by rating
exports.getStores = async (req, res) => {
    try {
        const { sort = 'ASC' } = req.query; // this fix added now you can sort stores by name or rating as per your requirement

        const stores = await Store.findAll({
            include: [
                {
                    model: Rating,
                    as: 'Ratings',
                    where: { user_id: req.user.id },
                    required: false,
                    attributes: []
                }
            ],
            attributes: {
                include: [
                    [
                        require('sequelize').fn('AVG', require('sequelize').col('Ratings.rating')),
                        'averageRating'
                    ]
                ]
            },
            group: ['Store.id'],

            // Fixed ordering issue by allowing sorting by average rating or name based on query parameter
            order: [['name', sort]]
        });

        res.json(stores);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// For Dashboard
exports.dashboard = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalStores = await Store.count();
        const totalRatings = await Rating.count();

        res.json({
            totalUsers,
            totalStores,
            totalRatings
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all users (for admin dashboard)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'role']
        });

        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all stores (with average rating) for admin dashboard
exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.findAndCountAll({
            include: [
                {
                    order: [['name', 'ASC']],
                    model: Rating,
                    as: 'Ratings',
                    attributes: ['rating']
                }
            ]
        });

        res.json(stores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete store 
exports.deleteStore = async (req, res) => {
    try {
        await Store.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Store deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Dashboard stats for admin
exports.getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalStores = await Store.count();
        const totalRatings = await Rating.count();

        res.json({
            totalUsers,
            totalStores,
            totalRatings
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Create Store (Admin can create store for any owner)
exports.createStore = async (req, res) => {
    try {
        const { name, email, address, owner_id } = req.body; // Admin can create store for any owner by providing owner_id in the request body

        // Check if owner exists
        const owner = await User.findOne({
            where: { id: owner_id, role: 'OWNER' }
        });

        if (!owner) {
            return res.status(400).json({ message: 'Invalid owner ID' });
        }

        // create store
        const store = await Store.create({
            name,
            email,
            address,
            owner_id
        });

        res.status(201).json({
            message: 'Store created successfully',
            store
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
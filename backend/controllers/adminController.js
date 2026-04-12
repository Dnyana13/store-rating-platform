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
        const stores = await Store.findAll({
            include: [ // Include the Rating model to calculate average rating and get user's rating as mentioned in assignment
                {
                    model: Rating, // Include the Rating model to calculate average rating
                    where: { user_id: req.user.id }, // Get the rating for the logged-in user
                    required: false, // Left join to include stores without ratings from the user
                    attributes: ['rating'] // Only include the rating value for the logged-in user
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

            
            // Add Sorting to Stores by name or by average rating
            order: [['name', sort]],
            // This will sort by average rating if sort is 'DESC', otherwise it will sort by name (Add createdAt sorting as well)
            order: [['createdAt', 'DESC']]

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
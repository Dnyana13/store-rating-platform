const { Store, Rating } = require('../models');
const { Op } = require('sequelize');

// Get Stores with search +  ratings - For Users
exports.getStores = async (req, res) => {
    try { 
        const {
            name,
            address,
            page = 1,
            limit = 5,
            sort = 'ASC'
        } = req.query; // Get Stores with search +  ratings - For Users

        const offset = (page - 1) * limit; // Calculate offset for pagination feature newly added this

        const stores = await Store.findAndCountAll({
            where: {
                ...(name && { name: { [Op.like]: `%${name}%` } }),
                ...(address && { address: { [Op.like]: `%${address}%` } })
            }, // Search by name and address with pagination and sorting
            include: [
                {
                    model: Rating,
                    as: 'Ratings',
                    where: { user_id: req.user.id },
                    required: false,
                    attributes: ['rating']
                }
            ],
            attributes: {
    include: [
        [
            require('sequelize').literal('(SELECT AVG(rating) FROM Ratings WHERE Ratings.store_id = Store.id)'),
            'averageRating'
        ],
        [
            require('sequelize').literal('(SELECT COUNT(*) FROM Ratings WHERE Ratings.store_id = Store.id)'),
            'totalRatings'
        ]
    ]
},
            group: ['Store.id'],
            order: [['name', sort]],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            totalStores: stores.count.length || stores.count,
            currentPage: parseInt(page),
            totalPages: Math.ceil((stores.count.length || stores.count) / limit),
            data: stores.rows
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Submit  or Update Rating for a Store - For Users
exports.submitRating = async (req, res) => {
    try {
        const { store_id, rating } = req.body;
        const user_id = req.user.id;

        // Validation for rating value
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        let existingRating = await Rating.findOne({
            where: { user_id, store_id }
        });

        // If rating exists, update it. Otherwise create a new rating.
        if (existingRating) {
            existingRating.rating = rating;
            await existingRating.save();

            return res.json({ message: 'Rating updated', existingRating });
        }

        const newRating = await Rating.create({
            user_id,
            store_id,
            rating
        });

        res.status(201).json({ message: 'Rating submitted', newRating });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
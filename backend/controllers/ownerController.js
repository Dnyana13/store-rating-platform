const { Store, Rating, User } = require('../models');
const sequelize = require('sequelize');

exports.getOwnerDashboard = async (req, res) => {
    try {
        const ownerId = req.user.id;

        // Get stores owned by this owner and include ratings and user info for those ratings
        const stores = await Store.findAll({
            where: { owner_id: ownerId },
            include: [
                {
                    model: Rating,
                    as: 'Ratings',
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name', 'email']
                        }
                    ]
                }
            ]
        });


        // Format response (VERY IMPORTANT) to match the expected output for the dashboard as mentioned in the assignment
        const formattedData = stores.map(store => {
            let totalRatings = store.Ratings.length;

            let avgRating =
                totalRatings > 0
                    ? (store.Ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings).toFixed(2)
                    : "0.00";

            return {
                storeName: store.name,
                address: store.address,
                totalRatings,
                averageRating: avgRating,
                users: store.Ratings.map(r => ({
                    userName: r.User.name,
                    email: r.User.email,
                    rating: r.rating
                }))
            };
        });

        res.json({
            message: "Owner dashboard data",
            data: formattedData
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
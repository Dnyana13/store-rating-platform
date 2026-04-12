const sequelize = require('../config/db');
const User = require('./User');
const Store = require('./Store');
const Rating = require('./Rating');

// Relationships

// Store Owner
User.hasMany(Store, { foreignKey: 'owner_id' });
Store.belongsTo(User, { foreignKey: 'owner_id' });

// Ratings
User.hasMany(Rating, { foreignKey: 'user_id' });
Store.hasMany(Rating, { foreignKey: 'store_id', as: 'Ratings' });

Rating.belongsTo(User, { foreignKey: 'user_id' });
Rating.belongsTo(Store, { foreignKey: 'store_id' });

module.exports = {
    sequelize,
    User,
    Store,
    Rating
};
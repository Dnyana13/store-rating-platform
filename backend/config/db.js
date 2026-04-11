const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('store_rating_db', 'root', 'Sairam@13', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CartItems = sequelize.define('cartItems', {
    id: {
        type: Sequelize.INTEGER,
        autiIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity : Sequelize.INTEGER
});

module.exports = CartItems;
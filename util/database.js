const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'node-complete',
    'root',
    'Manju012@',
    {
        dialect : 'mysql',
        host : 'localhost'
    }
);

module.exports = sequelize;
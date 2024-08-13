const mySQL = require('mysql2');

const pool = mySQL.createPool({
    host : 'localhost',
    user : 'root',
    database : 'node-complete',
    password : 'Manju012@'
});

module.exports = pool.promise();
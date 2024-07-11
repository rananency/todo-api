const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'SYSTEM',
    database: 'todo_db'
});

module.exports = pool.promise();

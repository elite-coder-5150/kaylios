const mysql = require('mysql2');

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'portoflio_2023',
});

db.connect((err) => {
    if (err) {
        console.error('error connecting to the database', err);
        return;
    }
    console.log('connected to the datbase');
});

module.exports = db;
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'grocery_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySql:', err);
    }
    else {
        console.log('Connected to MySql database:');
    }
});

module.exports = db;

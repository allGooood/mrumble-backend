const { Pool } = require('pg');

const db = new Pool({
    user: 'minkyeong',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
});

db.connect();

module.exports = db;

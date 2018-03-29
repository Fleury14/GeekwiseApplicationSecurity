const pgp = require('pg-promise');

const cn = {
    host: process.env.POSTGRES_HOST || '192.168.99.100', // '192.168.99.100' is the default;
    port: process.env.POSTGRES_PORT || 5432, // 5432 is the default;
    database: process.env.POSTGRES_DB || 'postgres',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || ''
};

console.log(cn);
module.exports = pgp()(cn);
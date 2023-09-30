const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgres://postgres:postgres@127.0.0.1:5432/backend',
    max: 100, // max number of clients in the pool
    idleTimeoutMillis: 30000
});

// pool.on('connect',() => {
//     console.log('Database connection OK');
// });

// pool.on('release',() => {
//     console.log('Database connection RELEASE');
// });

// pool.on('remove',() => {
//     console.log('Database connection REMOVE');
// });

// pool.on('acquire', () => {
//     console.log('Database connection ACQUIRE');
// });

module.exports = {
    query : (text) => pool.query(text),
};
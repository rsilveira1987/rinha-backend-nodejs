// Required Modules
const mariadb = require("mariadb");

//Initialize Pool
const pool = mariadb.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "backend",
    connectionLimit: 50,
    supportBigNumbers: true,
    bigNumberStrings: true
});

module.exports = {
    query : async (text) => {
        const conn  = await pool.getConnection();
        const res = await conn.query(text);
        conn.release();
        return res;
    },
};

const db = require('../config/postgre');

const addUser = async({uid, email, provider, mobile, zipcode, address, username}) => {
    const sql = `INSERT INTO users
                (uid, email, auth_provider, mobile, zipcode, address, user_name)
                    VALUES($1, $2, $3, $4, $5, $6, $7);`;
    const values = [uid, email, provider, mobile, zipcode, address, username];
    const result = await db.query(sql, values);
    return result;
};

const getUser = async(email) => {
    const sql = `SELECT * FROM users WHERE email = $1`;
    const {rows} = await db.query(sql, [email]);

    return rows;
}

module.exports = {
    addUser,
    getUser,
}
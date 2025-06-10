const db = require('../config/postgre');

const getAllCookies = async() => {
    console.log("Model::getAllCookies");

    const result = await db.query('select * from cookies where is_active != false');
    return result.rows;
}

module.exports = {
    getAllCookies,
}
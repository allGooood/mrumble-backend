const db = require('../config/postgre');

const getAllProducts = async() => {
    console.log("Model::getAllProducts");

    const result = await db.query('select * from products where is_active != false');

    // await db.query('SELECT * FROM products', (err, dbRes) => {
    //     if (err) {
    //       console.error(err);
    //       res.status(500).send('Database error');
    //     } else {
    //       res.json(dbRes.rows);
    //     }
    //   });
    return result.rows;
};

const getProductDetail = async(id) => {
    console.log("Model::getProductDetail");

    const sql = 'select * from products where id = $1';
    const result = await db.query(sql, [id]);

    return result.rows;
};

module.exports = {
    getAllProducts,
    getProductDetail,
}
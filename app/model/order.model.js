const db = require('../config/postgre');

const createOrder = async(order) => {
    console.log("Model::createOrder");

    try{
        await db.query("BEGIN");

        const {
            user_id, tax, subtotal, total, pay_method,
            note, contact, state, order_type, items //items: product_id, quantity, total_price, options 
          } = order;
    
        const orderSql = `INSERT INTO orders (user_id, tax, subtotal, total, pay_method, note, contact, state, order_type, created_at)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now())
                            RETURNING id`;
    
        const orderResult = await db.query(orderSql, [user_id, tax, subtotal, total, pay_method,
                                                note, contact, state, order_type]);
                                                
        const orderId = orderResult.rows[0].id;
        const orderItemSql = `INSERT INTO order_items (order_id, product_id, quantity, total_price, options, created_at) 
                                VALUES ($1, $2, $3, $4, $5, now())`;
    
        for(let product of items){
            await db.query(orderItemSql, [orderId, product.id, product.quantity, product.total_price, product.options]);
        }

        await db.query("COMMIT");

        return orderId;
    }catch(err){
        await db.query("ROLLBACK");
        console.log(err);
    }finally{
        
    }

};

module.exports = {
    createOrder,
}
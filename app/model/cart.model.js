const db = require('../config/postgre');

const addToCart = async({user_id, product_id, total_price, quantity, options}) => {
    console.log("Model::addToCart");

    const sql = `INSERT INTO public.carts
                (user_id, product_id, total_price, "options", quantity, created_at)
                    VALUES($1, $2, $3, $4, $5, now())`;
    const values = [user_id, product_id, total_price, options, quantity];
    const result = await db.query(sql, values);
    return result;
};

// const upsertCart = async({user_id, product_id, total_price, quantity}) => {
//     console.log("Model::upsertCart");
//     console.log({user_id, product_id, total_price, quantity});

//     const sql = `INSERT INTO carts
//                 (user_id, product_id, total_price, updated_at, created_at, quantity)
//                     VALUES($1, $2, $3, now(), now(), $4)
//                 on conflict(user_id, product_id, options)
//                 do update
//                 set total_price = carts.total_price + EXCLUDED.total_price,
//                     quantity = carts.quantity + EXCLUDED.quantity,
//                     updated_at = now()`;

//     const values = [user_id, product_id, total_price, quantity];
//     const result = await db.query(sql, values);
//     return result;
// }

// 처음에 upsert문으로 해결하려고 했지만.. hasOption값에 따른 constraint 조건이 달라 더 복잡해 짐 Issue로 일단 db 두 번 갔다오기로 해결
const upsertCart = async({user_id, product_id, total_price, quantity}) => {
    console.log("Model::upsertCart");
    console.log({user_id, product_id, total_price, quantity});

    const selectSql = `select * from carts where user_id = $1 and product_id = $2`
    const selectValues = [user_id, product_id];
    const selectResult = await db.query(selectSql, selectValues);

    let sql;
    let values;
    if(selectResult.rowCount > 0){
        console.log("update");

        // Update : quantity, total_price 더하기
        sql = `update carts set quantity = quantity + $3, 
                                total_price = total_price + $4
                where user_id = $1 
                    and product_id = $2`;
        values = [user_id, product_id, quantity, total_price];
    }else if(selectResult.rowCount ==- 0){
        console.log("insert");

        // Insert
        sql = `INSERT INTO carts
                    (user_id, product_id, total_price, quantity, created_at)
                VALUES($1, $2, $3, $4, now())`;
        values = [user_id, product_id, total_price, quantity];
    }else{
        // 비정상
        console.error("검색 결과가 너무 많아요.. 데이터 입력 시 검증 필요");
    }

    return await db.query(sql, values);
}

const updateCart = async({user_id, product_id, new_total_price, quantity, options}) => {
    console.log("Model::updateCart");

    const sql = `update carts set quantity = $4, 
                                total_price = $3
                where user_id = $1 
                    and product_id = $2
                    and "options" IS NOT DISTINCT FROM $5`;
    values = [user_id, product_id, new_total_price, quantity, options];
    return await db.query(sql, values);

}

const getCartList = async(user_id) => {
    const sql = `select 
                        c.id, c.user_id, c.total_price, c.options, c.created_at, c.updated_at, c.quantity,
		                p.product_name, p.is_active, p.stock, p.price, p.image_url, p.id as product_id, p.sku, p.has_option  
                    from carts c
                    join products p 
                    on p.id = c.product_id
                where user_id = $1
                order by created_at DESC`;
    const result = await db.query(sql, [user_id]);
    return result.rows;
}

module.exports = {
    addToCart,
    upsertCart,
    getCartList,
    updateCart,
}
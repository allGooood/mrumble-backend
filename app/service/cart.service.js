const model = require('../model/cart.model');
const productService = require('../service/product.service');


const addToCart = async(data) => {
    const {product_id} = data;
    
    const productDetail = await productService.fetchProductDetail(product_id);
    console.log(productDetail)
    const {has_option} = productDetail[0];
    
    let result;
    if(has_option){
        result = await model.addToCart(data)
    }else{
        result = await model.upsertCart(data);
    }

    return result;
};

const updateCart = async(data) => {
    return await model.updateCart(data);
}

const getCartList = async(user_id) => {
    const rows = await model.getCartList(user_id);

    const result = rows.map(row => {
        const product = {
            "id": row.product_id,
            "name": row.product_name,
            "is_soldout": row.stock === 0 ? true : false,
            "price": row.price,
            "image_url": row.image_url,
            "options": row.options
        }
        
        return {
            product,
            "total_price": row.total_price,
            "quantity": row.quantity,
            "user_id": row.user_id,
            "id": row.id,
        }
    });

    return result;
}

module.exports = {
    addToCart,
    getCartList,
    updateCart,
}
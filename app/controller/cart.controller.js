const e = require('express');
const service = require('../service/cart.service');
const { use, get } = require('../routes/user.router');

const addToCart = async(req, res, next) => {
    const {user_id, product_id, total_price, quantity, options} = req.body;
    try{
        const cart = await service.addToCart({user_id, product_id, total_price, quantity, options});
        res.json(cart);
    }catch(error){
        console.error(error);
    }
}

const updateCart = async(req, res, next) => {
    const {user_id, product_id, new_total_price, quantity, options} = req.body;
    try{
        const result = await service.updateCart({user_id, product_id, new_total_price, quantity, options});
        res.json({"result": result.rowCount});
    }catch(error){
        console.error(error);
    }
};

const getCartList = async(req, res, next) => {
    try{
        const {user_id} = req.params;
        const cartList = await service.getCartList(user_id);
        res.json(cartList);
    }catch(error){
        console.error(error);
    }
}

module.exports = {
    addToCart,
    getCartList,
    updateCart,
}
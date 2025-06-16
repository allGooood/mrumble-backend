const e = require('express');
const service = require('../service/order.service');
const { use, get } = require('../routes/order.router');

const createOrder = async(req, res, next) => {
    console.log("Controller::createOrder");

    try{
        const order = req.body;
        const orderId = await service.createOrder(order);
        res.json({id: orderId})

    } catch(err){
        console.error(err);
        res.json({id: null});
    }
}

module.exports = {
    createOrder,
}
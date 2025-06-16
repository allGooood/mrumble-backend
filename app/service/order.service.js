const model = require('../model/order.model');

const createOrder = async(order) => {
    console.log("Service::createOrder");

    return await model.createOrder(order);
};

module.exports = {
    createOrder,
}

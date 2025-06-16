const model = require('../model/user.model');

const addUser = async(data) => {
    return await model.addUser(data);
};

const getUser = async(email) => {
    return await model.getUser(email);
}

module.exports = {
    addUser,
    getUser,
}
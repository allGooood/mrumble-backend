const cookieModel = require('../model/cookie.model');

const fetchAllCookies = async() => {
    console.log('Service::fetchAllCookies');

    const rows = await cookieModel.getAllCookies();
    // TODO extra_charge 가격순 역정렬
    return rows;
};

module.exports = {
    fetchAllCookies,
}
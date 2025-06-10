const cookieService = require('../service/cookie.service');

const getCookies = async (rea, res, next) => {
    try{
        console.log('Controller::getCookies')
        const cookies = await cookieService.fetchAllCookies();
        res.json(cookies);
    }catch(err){
        console.err(err);
    }
};

module.exports = {
    getCookies,
}
const productService = require('../service/product.service');

const getProducts = async (req, res, next) => {
    try {
        console.log('Controller::getProducts')
        const products = await productService.fetchAllProducts();
        res.json(products);

    } catch(err){
        console.error(err);
    }
};

const getProductDetail = async (req, res, next) => {
    try {
        console.log('Controller::getProductDetail');

        const {id} = req.params;
        const productDetail = await productService.fetchProductDetail(id);
        res.json(productDetail);

    } catch(err){
        console.error(err);
    }
};

module.exports = {
    getProducts,
    getProductDetail
};
const productModel = require('../model/product.model');

const categoryOrder = [
    "Large Desserts",
    "Mini Desserts",
    "Extras",
    "Gift Cards",
    "Family Desserts"
];

const fetchAllProducts = async () => {
    console.log('Service::fetchAllProducts');

    const rows = await productModel.getAllProducts();
    const grouped = rows.reduce((acc, curr) => {
        const category = curr.category;
        if(!acc[category]){
            acc[category] = [];
        }

        acc[category].push(curr);
        return acc;
    }, {});

    return grouped;
};

const fetchProductDetail = async (id) => {
    console.log('Service::fetchProductDetail')

    const rows = await productModel.getProductDetail(id);
    return rows;
};

module.exports = {
    fetchAllProducts,
    fetchProductDetail
};
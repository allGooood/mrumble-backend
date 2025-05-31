const productModel = require('../model/product.model');

const categoryOrder = [
    "Large Desserts",
    "Mini Desserts",
    "Extras",
    "Gift Cards",
    "Family Desserts"
];

const fetchAllProducts = async () => {
    console.log('Service::fetchAllProducts')

    const rows = await productModel.getAllProducts();
    const grouped = rows.reduce((acc, product) => {
        const category = product.category;
        if(!acc[category]){
            acc[category] = [];
        }

        acc[category].push(product);
        return acc;
    }, {});

    // const sorted = categoryOrder
    //                 .filter(category => grouped[category])
    //                 .map(category => ({
    //                     category,
    //                     items: grouped[category]
    //                 }));

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
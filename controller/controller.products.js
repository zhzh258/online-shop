const Product = require("../model/model.product")

async function get_products(req, res){
    const products = await Product.find_all();
    products.map(function(product){
        product._id = product._id.toString();
        return product;
    })
    res.render("customer/products/products", {products: products})
}


module.exports = {
    get_products: get_products,
}
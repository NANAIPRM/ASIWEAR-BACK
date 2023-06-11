const productRepository = require("../repositories/product-repository");

exports.createProduct = (product) => productRepository.createProduct(product);

exports.getAllProducts = () => productRepository.getAllProducts();

exports.deleteProductsById = (id) => productRepository.deleteProductsById(id);

exports.getProductsById = (id) => productRepository.getProductsById(id);

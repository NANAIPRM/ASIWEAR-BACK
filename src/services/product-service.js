const productRepository = require("../repositories/product-repository");

exports.createProduct = (product) => productRepository.createProduct(product);

exports.createSize = (size) => productRepository.createSize(size);

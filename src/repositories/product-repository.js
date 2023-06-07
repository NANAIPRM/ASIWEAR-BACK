const { Product, Size } = require("../models");

exports.createProduct = (product) => Product.create(product);

exports.createSize = (size) => Size.create(size);

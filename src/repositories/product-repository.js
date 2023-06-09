const { Product, Size } = require("../models");

exports.createProduct = (product) => Product.create(product);

exports.createSize = (size) => Size.create(size);

exports.getAllProducts = async () => {
  return Product.findAll({ include: Size });
};

exports.deleteProductsById = async (id) => {
  return Product.destroy({ where: { id: id } });
};

exports.getProductsById = async (id) => {
  return Product.findOne({ include: Size, where: { id: id } });
};

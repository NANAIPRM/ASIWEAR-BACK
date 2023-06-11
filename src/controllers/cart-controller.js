const { CartItem, Product } = require("../models");
const createError = require("../utils/create-error");

exports.createCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity, size } = req.body;
    const userId = req.user.id;

    const product = await Product.findByPk(productId);
    if (!product) {
      throw createError("Product not found");
    }

    const cartItem = await CartItem.create({
      productId: productId,
      quantity: quantity,
      size: size,
      userId: userId,
    });
    res.status(201).json(cartItem);
  } catch (err) {
    next(err);
  }
};

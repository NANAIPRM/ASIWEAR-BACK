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

    const existingCartItem = await CartItem.findOne({
      where: { productId, userId, size },
    });
    if (existingCartItem) {
      throw createError("Product already exists in the cart");
    }

    const cartItem = await CartItem.create({
      productId,
      quantity,
      size,
      userId,
    });
    res.status(201).json(cartItem);
  } catch (err) {
    next(err);
  }
};

exports.getCartByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cartItems = await CartItem.findAll({
      where: { userId: userId },
      include: [{ model: Product }],
    });

    res.json(cartItems);
  } catch (err) {
    next(err);
  }
};

exports.deleteCartItem = async (req, res, next) => {
  try {
    const { cartitemId } = req.params;
    const userId = req.user.id;

    const cartItem = await CartItem.findOne({
      where: { id: cartitemId, userId: userId },
    });

    if (!cartItem) {
      throw createError("Cart item not found");
    }

    await cartItem.destroy();

    res.json({ message: "Cart item deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { cartitemId } = req.params;
    const { quantity, size } = req.body;
    const userId = req.user.id;

    const cartItem = await CartItem.findOne({
      where: { id: cartitemId, userId: userId },
    });

    if (!cartItem) {
      throw createError("Cart item not found");
    }

    await cartItem.update({ quantity, size });

    res.json({ message: "Cart item updated successfully" });
  } catch (err) {
    next(err);
  }
};

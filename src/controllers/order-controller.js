const { Order, OrderItem, CartItem, Product, User } = require("../models");
const createError = require("../utils/create-error");
const uploadService = require("../services/upload-service");
exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const paymentSlip = (await uploadService.upload(req.file.path)).secure_url;

    const cartItems = await CartItem.findAll({
      where: { userId: userId },
    });

    let totalAmount = 0;

    for (const cartItem of cartItems) {
      const product = await Product.findByPk(cartItem.productId);
      let price = product.price;

      if (product.discountPrice) {
        price = product.price - product.discountPrice;
      }

      totalAmount += price * cartItem.quantity;
    }

    const order = await Order.create({
      userId: userId,
      orderStatus: "PENDING",
      payment: paymentSlip,
      totalAmount: totalAmount,
    });

    for (const cartItem of cartItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        size: cartItem.size,
      });
    }

    await CartItem.destroy({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({ message: "Create order success" });
  } catch (error) {
    next(error);
  }
};

exports.getAllOrder = async (req, res, next) => {
  try {
    const Orders = await Order.findAll({
      include: [
        {
          model: User,
        },
        {
          model: OrderItem,
          include: {
            model: Product,
          },
        },
      ],
    });
    res.json(Orders);
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;

    const updatedOrder = await Order.update(
      { orderStatus: "SUCCESS" },
      { where: { id: orderId } }
    );

    if (updatedOrder[0] !== 1) {
      return res.status(400).json({ message: "Failed to update order status" });
    }

    return res
      .status(200)
      .json({ message: "Order status updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrderByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const order = await Order.findAll({
      where: { userId },
      include: [
        {
          model: User,
        },
        {
          model: OrderItem,
          include: {
            model: Product,
          },
        },
      ],
    });

    res.json(order);
  } catch (err) {
    next(err);
  }
};

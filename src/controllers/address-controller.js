const { Address } = require("../models");
const createError = require("../utils/create-error");

exports.addAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;

    res.status(201).json(address);
  } catch (err) {
    next(err);
  }
};

exports.getAddressByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const address = await Address.find({
      where: {
        userId,
      },
    });

    if (!address) {
      createError("Address not found", 404);
    }

    res.status(200).json(address);
  } catch (err) {
    next(err);
  }
};

exports.getAddressByOrderId = async (req, res, next) => {
  try {
    const { orderId } = req.body;

    const address = await Address.findOne({
      where: {
        orderId,
      },
    });

    if (!address) {
      createError("Address not found", 404);
    }

    res.status(200).json(address);
  } catch (err) {
    next(err);
  }
};

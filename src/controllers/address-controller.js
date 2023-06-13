const { Address } = require("../models");
const createError = require("../utils/create-error");

exports.addAddress = async (req, res, next) => {
  try {
    const { addressLine1, addressLine2, city, province, postalCode, country } =
      req.body;
    const userId = req.user.id;

    const existingAddress = await Address.findOne({
      where: {
        userId,
      },
    });

    if (existingAddress) {
      createError("Address already exists", 400);
    }

    const address = await Address.create({
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      country,
      userId,
    });

    res.status(201).json(address);
  } catch (err) {
    next(err);
  }
};

exports.getAddressByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const address = await Address.findOne({
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

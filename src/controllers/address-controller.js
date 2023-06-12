const { Address } = require("../models");

exports.addAddress = async (req, res, next) => {
  try {
    const { addressLine1, addressLine2, city, province, postalCode, country } =
      req.body;
    console.log(req.body);
    const userId = req.user.id;

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

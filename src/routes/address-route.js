const express = require("express");
const addressController = require("../controllers/address-controller");

const router = express.Router();

router.post("/create", addressController.addAddress);

router.get("/me", addressController.getAddressByUserId);

router.get("/order", addressController.getAddressByOrderId);
module.exports = router;

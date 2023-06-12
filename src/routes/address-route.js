const express = require("express");
const addressController = require("../controllers/address-controller");

const router = express.Router();

router.post("/create", addressController.addAddress);

module.exports = router;

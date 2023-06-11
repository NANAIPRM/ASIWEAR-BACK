const express = require("express");
const cartController = require("../controllers/cart-controller");

const router = express.Router();

router.post("/create/:productId", cartController.createCart);

module.exports = router;

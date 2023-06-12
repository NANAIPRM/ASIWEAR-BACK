const express = require("express");
const cartController = require("../controllers/cart-controller");

const router = express.Router();

router.post("/create/:productId", cartController.createCart);

router.get("/allcart", cartController.getCartByUserId);

router.delete("/delete/:cartitemId", cartController.deleteCartItem);

router.patch("/update/:cartitemId", cartController.updateCartItem);

module.exports = router;

const express = require("express");
const upload = require("../middlewares/upload");
const orderController = require("../controllers/order-controller");
const adminAuthMiddleware = require("../middlewares/admin");
const authenticateMidlleware = require("../middlewares/authenticate");
const router = express.Router();

router.post("/create", upload.single("image"), orderController.createOrder);

router.get("/allOrder", orderController.getAllOrder);

router.patch(
  "/update/:orderId",
  adminAuthMiddleware,
  orderController.updateOrderStatus
);

router.get(
  "/myorder",
  authenticateMidlleware,
  orderController.getAllOrderByUserId
);

router.get("/:orderId", orderController.getOrderByOrderId);

module.exports = router;

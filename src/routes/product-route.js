const express = require("express");
const productController = require("../controllers/product-controller");
const upload = require("../middlewares/upload");
const adminAuthMiddleware = require("../middlewares/admin");
const router = express.Router();

router.post(
  "/addProduct",
  upload.fields([
    { name: "img1", maxCount: 1 },
    { name: "img2", maxCount: 1 },
    { name: "img3", maxCount: 1 },
  ]),
  productController.addProduct
);

router.get(
  "/allProduct",

  productController.getAllProducts
);

router.delete(
  "/:id",
  adminAuthMiddleware,
  productController.deleteProductsById
);
router.patch(
  "/:id",
  adminAuthMiddleware,
  upload.fields([
    { name: "img1", maxCount: 1 },
    { name: "img2", maxCount: 1 },
    { name: "img3", maxCount: 1 },
  ]),
  productController.editProduct
);

router.get("/:id", productController.getProductsById);

module.exports = router;

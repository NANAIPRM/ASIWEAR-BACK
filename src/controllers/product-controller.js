const productService = require("../services/product-service");
const uploadService = require("../services/upload-service");
const createError = require("../utils/create-error");
const { Product, Size } = require("../models");

exports.addProduct = async (req, res, next) => {
  try {
    const { productName, price, discountPrice, description, size, stock } =
      req.body;

    const imgUrl1 = await (
      await uploadService.upload(req.files["img1"][0].path)
    ).secure_url;

    const imgUrl2 = await (
      await uploadService.upload(req.files["img2"][0].path)
    ).secure_url;

    const imgUrl3 = await (
      await uploadService.upload(req.files["img3"][0].path)
    ).secure_url;

    const createdSize = await productService.createSize({
      size,
      stock,
    });

    const createdProduct = await productService.createProduct({
      name: productName,
      price: price,
      discountPrice: discountPrice,
      description: description,
      imgUrl1: imgUrl1,
      imgUrl2: imgUrl2,
      imgUrl3: imgUrl3,
      sizeId: createdSize.id,
    });

    res.status(200).json({ product: createdProduct, size: createdSize });
  } catch (err) {
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.deleteProductsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteProductsById(id);
    if (result === 0) {
      createError("product is not found", 400);
    } else {
      res.json({ message: "product deleted successfully" });
    }
  } catch (err) {
    next(err);
  }
};

exports.getProductsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductsById(id);
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productName, price, discountPrice, description, size, stock } =
      req.body;

    const imgUrl1 = await (
      await uploadService.upload(req.files["img1"][0].path)
    ).secure_url;

    const imgUrl2 = await (
      await uploadService.upload(req.files["img2"][0].path)
    ).secure_url;

    const imgUrl3 = await (
      await uploadService.upload(req.files["img3"][0].path)
    ).secure_url;

    const editProduct = await Product.update(
      {
        include: {
          model: Size,
        },
      },

      {
        name: productName,
        price: price,
        discountPrice: discountPrice,
        description: description,
        imgUrl1: imgUrl1,
        imgUrl2: imgUrl2,
        imgUrl3: imgUrl3,
        size: size,
        stock: stock,
      },

      {
        where: { id: id },
      }
    );

    // const editSize = await Size.update(
    //   {
    //     size: size,
    //     stock: stock,
    //   },
    //   {
    //     where: { id: editProduct.sizeId },
    //   }
    // );

    res.status(200);
  } catch (err) {
    next(err);
  }
};

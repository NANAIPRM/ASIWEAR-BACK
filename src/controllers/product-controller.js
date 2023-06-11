const productService = require("../services/product-service");
const uploadService = require("../services/upload-service");
const createError = require("../utils/create-error");
const { Product } = require("../models");

exports.addProduct = async (req, res, next) => {
  try {
    const {
      productName,
      price,
      discountPrice,
      description,
      sizeS,
      sizeM,
      sizeL,
      gender,
    } = req.body;

    const imgUrl1 = await (
      await uploadService.upload(req.files["img1"][0].path)
    ).secure_url;

    console.log(imgUrl1);
    const imgUrl2 = await (
      await uploadService.upload(req.files["img2"][0].path)
    ).secure_url;

    const imgUrl3 = await (
      await uploadService.upload(req.files["img3"][0].path)
    ).secure_url;

    const createdProduct = await productService.createProduct({
      productName: productName,
      price: price,
      discountPrice: discountPrice,
      description: description,
      img1: imgUrl1,
      img2: imgUrl2,
      img3: imgUrl3,
      sizeS: sizeS,
      sizeM: sizeM,
      sizeL: sizeL,
      gender: gender,
    });

    res.status(200).json({ product: createdProduct });
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
    const {
      productName,
      price,
      discountPrice,
      description,
      sizeS,
      sizeM,
      sizeL,
      gender,
    } = req.body;

    const updateFields = {
      productName: productName,
      price: price,
      discountPrice: discountPrice,
      description: description,
      sizeS: sizeS,
      sizeM: sizeM,
      sizeL: sizeL,
      gender: gender,
    };

    if (req.files && req.files["img1"] && req.files["img1"][0]) {
      const imgUrl1 = await (
        await uploadService.upload(req.files["img1"][0].path)
      ).secure_url;
      updateFields.img1 = imgUrl1;
    }

    if (req.files && req.files["img2"] && req.files["img2"][0]) {
      const imgUrl2 = await (
        await uploadService.upload(req.files["img2"][0].path)
      ).secure_url;
      updateFields.img2 = imgUrl2;
    }

    if (req.files && req.files["img3"] && req.files["img3"][0]) {
      const imgUrl3 = await (
        await uploadService.upload(req.files["img3"][0].path)
      ).secure_url;
      updateFields.img3 = imgUrl3;
    }

    const editProduct = await Product.update(updateFields, {
      where: { id: id },
    });

    res.status(200).json({ editProduct: editProduct });
  } catch (err) {
    next(err);
  }
};

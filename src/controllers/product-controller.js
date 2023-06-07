const productService = require("../services/product-service");

exports.addProduct = async (req, res, next) => {
  try {
    const {
      productName,
      price,
      discountPrice,
      description,
      imgUrl1,
      imgUrl2,
      imgUrl3,
      size,
      stock,
    } = req.body;

    const createdSize = await productService.createSize({
      size,
      stock,
    });

    const createdProduct = await productService.createProduct({
      name: productName,
      price,
      discountPrice,
      description,
      imgUrl1,
      imgUrl2,
      imgUrl3,
      sizeId: createdSize.id,
    });

    res.status(200).json({ product: createdProduct, size: createdSize });
  } catch (err) {
    next(err);
  }
};

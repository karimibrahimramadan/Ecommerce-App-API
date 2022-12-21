const Product = require("../models/Product");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const slugify = require("slugify");
const factoryHandler = require("./factoryController");

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private
const createProduct = catchAsync(async (req, res, next) => {
  let imageArr = [];
  if (req.files) {
    req.files.images
      ? req.files.images.forEach((file) => {
          imageArr.push(
            `${req.protocol}/${req.get("host")}/${req.dest}/${file.filename}`
          );
        })
      : [];
    req.body.images = imageArr;
    req.body.imageCover = req.files.imageCover
      ? `${req.protocol}/${req.get("host")}/${req.dest}/${
          req.files.imageCover[0].filename
        }`
      : "";
  }
  req.body.seller = req.user.id;
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.status(201).json({
    status: "Success",
    message: "Product has been created",
    data: {
      product: savedProduct,
    },
  });
});

// @desc    Update product
// @route   PATCH /api/v1/products/:id
// @access  Private
const updateProduct = catchAsync(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name, { lower: true });
  }
  if (req.file) {
  }
  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    { $set: req.body },
    { new: true }
  );
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  res.status(200).json({
    status: "Success",
    message: "Product has been updated",
    data: {
      product: savedProduct,
    },
  });
});

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Private
const getAllProducts = factoryHandler.getAll(Product);

// @desc    Get product
// @route   GET /api/v1/products/:id
// @access  Private
const getProduct = factoryHandler.getOne(Product);

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private
const deleteProduct = factoryHandler.deleteOne(Product);

module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
};

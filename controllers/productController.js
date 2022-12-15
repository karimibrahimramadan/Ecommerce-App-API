const Product = require("../models/Product");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const slugify = require("slugify");
const APIFeatures = require("../utils/apiFeatures");

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private
const createProduct = catchAsync(async (req, res, next) => {
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
// @route   PATCH /api/v1/products/:productId
// @access  Private
const updateProduct = catchAsync(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name, { lower: true });
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
const getAllProducts = catchAsync(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .sort()
    .filter()
    .limitFields()
    .paginate();
  const products = await apiFeatures.query;
  res.status(200).json({
    status: "Success",
    data: {
      products,
    },
  });
});

// @desc    Get product
// @route   GET /api/v1/products/:productId
// @access  Private
const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      product,
    },
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:productId
// @access  Private
const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  res.status(204).json({
    status: "Success",
    message: "Product has been deleted",
    data: null,
  });
});

module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
};

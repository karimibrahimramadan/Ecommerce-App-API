const Category = require("../models/Category");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private
const createCategory = catchAsync(async (req, res, next) => {
  const newCategory = new Category(req.body);
  const savedCategory = newCategory.save();
  res.status(201).json({
    status: "Success",
    message: "Category has been created",
    data: {
      category: savedCategory,
    },
  });
});

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Private
const getAllCategories = catchAsync(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Category.find(), req.query)
    .search()
    .sort()
    .limitFields()
    .filter()
    .paginate();
  const categories = await apiFeatures.query;
  res.status(200).json({
    status: "Success",
    data: {
      categories,
    },
  });
});

// @desc    Get category
// @route   GET /api/v1/categories/:categoryId
// @access  Private
const getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    return next(new AppError("Category doesn't exit", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      category,
    },
  });
});

// @desc    Update category
// @route   PATCH /api/v1/categories/:categoryId
// @access  Private
const updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.categoryId,
    { $set: req.body },
    { new: true }
  );
  if (!category) {
    return next(new AppError("Category doesn't exit", 404));
  }
  res.status(200).json({
    status: "Success",
    message: "Category has been updated",
    data: {
      category,
    },
  });
});

// @desc    Delete category
// @route   DELETE /api/v1/categories/:categoryId
// @access  Private
const deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.categoryId);
  if (!category) {
    return next(new AppError("Category doesn't exit", 404));
  }
  res.status(204).json({
    status: "Success",
    message: "Category has been deleted",
    data: null,
  });
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};

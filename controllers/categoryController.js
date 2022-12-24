const Category = require("../models/Category");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const slugify = require("slugify");
const factoryHandler = require("./factoryController");

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private
const createCategory = factoryHandler.createOne(Category);

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Private
const getAllCategories = factoryHandler.getAll(Category);

// @desc    Get category
// @route   GET /api/v1/categories/:id
// @access  Private
const getCategory = factoryHandler.getOne(Category);

// @desc    Update category
// @route   PATCH /api/v1/categories/:id
// @access  Private
const updateCategory = factoryHandler.updateOne(Category);

// @desc    Delete category
// @route   DELETE /api/v1/categories/:id
// @access  Private
const deleteCategory = factoryHandler.deleteOne(Category);

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};

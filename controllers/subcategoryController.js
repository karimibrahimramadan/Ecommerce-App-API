const Subcategory = require("../models/Subcategoy");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const slugify = require("slugify");
const factoryHandler = require("./factoryController");

// @desc    Create subcategory
// @route   POST /api/v1/subcategories
// @access  Private
const createSubcategory = factoryHandler.createOne(Subcategory);

// @desc    Get all subcategories
// @route   GET /api/v1/subcategories
// @access  Private
// const getAllSubcategories = catchAsync(async (req, res, next) => {
//   //   const filterObj = req.originalUr
//   const filterObj = req.params.categoryId
//     ? { category: req.params.categoryId }
//     : {};
//   const apiFeatures = new APIFeatures(Subcategory.find(filterObj), req.query)
//     .search()
//     .sort()
//     .limitFields()
//     .filter()
//     .paginate();
//   const subcategories = await apiFeatures.query;
//   res.status(200).json({
//     status: "Success",
//     results: subcategories.length,
//     data: {
//       subcategories,
//     },
//   });
// });
const getAllSubcategories = factoryHandler.getAll(Subcategory, 1);

// @desc    Get subcategory
// @route   GET /api/v1/subcategories/:subcategoryId
// @access  Private
const getSubcategory = factoryHandler.getOne(Subcategory);

// @desc    Update subcategory
// @route   PATCH /api/v1/subcategories/:subcategoryId
// @access  Private
const updateSubcategory = factoryHandler.updateOne(Subcategory);

// @desc    Delete subcategory
// @route   DELETE /api/v1/subcategories/:subcategoryId
// @access  Private
const deleteSubcategory = factoryHandler.deleteOne(Subcategory);

module.exports = {
  createSubcategory,
  getAllSubcategories,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
};

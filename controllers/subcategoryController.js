const Subcategory = require("../models/Subcategoy");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const slugify = require("slugify");

// @desc    Create subcategory
// @route   POST /api/v1/subcategories
// @access  Private
const createSubcategory = catchAsync(async (req, res, next) => {
  const { name, category } = req.body;
  const newSubcategory = new Subcategory({ name, category });
  const savedSubcategory = await newSubcategory.save();
  res.status(201).json({
    status: "Success",
    message: "Subcategory has been created",
    data: {
      subcategory: savedSubcategory,
    },
  });
});

// @desc    Get all subcategories
// @route   GET /api/v1/subcategories
// @access  Private
const getAllSubcategories = catchAsync(async (req, res, next) => {
  //   const filterObj = req.originalUr
  const filterObj = req.params.categoryId
    ? { category: req.params.categoryId }
    : {};
  const apiFeatures = new APIFeatures(Subcategory.find(filterObj), req.query)
    .search()
    .sort()
    .limitFields()
    .filter()
    .paginate();
  const subcategories = await apiFeatures.query;
  res.status(200).json({
    status: "Success",
    results: subcategories.length,
    data: {
      subcategories,
    },
  });
});

// @desc    Get subcategory
// @route   GET /api/v1/subcategories/:subcategoryId
// @access  Private
const getSubcategory = catchAsync(async (req, res, next) => {
  const subcategory = await Subcategory.findById(req.params.subcategoryId);
  if (!subcategory) {
    return next(new AppError("Subcategory doesn't exist", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      subcategory,
    },
  });
});

// @desc    Update subcategory
// @route   PATCH /api/v1/subcategories/:subcategoryId
// @access  Private
const updateSubcategory = catchAsync(async (req, res, next) => {
  const subcategory = await Subcategory.findByIdAndUpdate(
    req.params.subcategoryId,
    {
      $set: {
        name: req.body.name,
        slug: slugify(req.body.name, { lower: true }),
      },
    },
    { new: true }
  );
  if (!subcategory) {
    return next(new AppError("Subcategory doesn't exist", 404));
  }
  res.status(200).json({
    status: "Success",
    message: "Subcategory has been updated",
    data: {
      subcategory,
    },
  });
});

// @desc    Delete subcategory
// @route   DELETE /api/v1/subcategories/:subcategoryId
// @access  Private
const deleteSubcategory = catchAsync(async (req, res, next) => {
  const subcategory = await Subcategory.findByIdAndDelete(
    req.params.subcategoryId
  );
  if (!subcategory) {
    return next(new AppError("Subcategory doesn't exist", 404));
  }
  res.status(204).json({
    status: "Success",
    message: "Subcategory has been deleted",
    data: null,
  });
});

module.exports = {
  createSubcategory,
  getAllSubcategories,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
};

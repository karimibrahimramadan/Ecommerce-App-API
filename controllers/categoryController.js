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
const updateCategory = catchAsync(async (req, res, next) => {
  let image;
  if (req.file) {
    image = `${req.dest}/${req.file.filename}`;
  }
  const category = await Category.findByIdAndUpdate(
    req.params.categoryId,
    {
      $set: {
        name: req.body.name,
        slug: slugify(req.body.name, { lower: true }),
        image,
      },
    },
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

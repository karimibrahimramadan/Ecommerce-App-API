const Brand = require("../models/Brand");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const slugify = require("slugify");

// @desc    Add new brand
// @route   POST /api/v1/brands
// @access  Private
const addBrand = catchAsync(async (req, res, next) => {
  const newBrand = new Brand(req.body);
  const savedBrand = await newBrand.save();
  res.status(201).json({
    status: "Success",
    data: {
      brand: savedBrand,
    },
  });
});

// @desc    Get brand
// @route   GET /api/v1/brands/:brandId
// @access  Private
const getBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findById(req.params.brandId);
  if (!brand) {
    return next(new AppError("Brand not found", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      brand,
    },
  });
});

// @desc    Get all brands
// @route   GET /api/v1/brands
// @access  Private
const getAllBrands = catchAsync(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Brand.find(), req.query)
    .search()
    .sort()
    .limitFields()
    .filter()
    .paginate();
  const brands = await apiFeatures.query;
  res.status(200).json({
    status: "Success",
    results: brands.length,
    data: {
      brands,
    },
  });
});

// @desc    Update brand
// @route   PATCH /api/v1/brands/:brandId
// @access  Private
const updateBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findByIdAndUpdate(
    req.params.brandId,
    {
      $set: {
        name: req.body.name,
        slug: slugify(req.body.name, { lower: true }),
      },
    },
    { new: true }
  );
  if (!brand) {
    return next(new AppError("Brand not found", 404));
  }
  res.status(200).json({
    status: "Success",
    message: "Brand has been updated",
    data: {
      brand,
    },
  });
});

const deleteBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findByIdAndDelete(req.params.brandId);
  if (!brand) {
    return next(new AppError("Brand not found", 404));
  }
  res.status(204).json({
    status: "Success",
    message: "Brand has been deleted",
    data: null,
  });
});

module.exports = {
  addBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};

const Brand = require("../models/Brand");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const slugify = require("slugify");
const factoryHandler = require("./factoryController");

// @desc    Add new brand
// @route   POST /api/v1/brands
// @access  Private
const addBrand = factoryHandler.createOne(Brand);

// @desc    Get brand
// @route   GET /api/v1/brands/:id
// @access  Private
const getBrand = factoryHandler.getOne(Brand);

// @desc    Get all brands
// @route   GET /api/v1/brands
// @access  Private
const getAllBrands = factoryHandler.getAll(Brand);

// @desc    Update brand
// @route   PATCH /api/v1/brands/:id
// @access  Private
// const updateBrand = catchAsync(async (req, res, next) => {
//   let image;
//   if (req.file) {
//     image = `${req.dest}/${req.file.filename}`;
//   }
//   const brand = await Brand.findByIdAndUpdate(
//     req.params.brandId,
//     {
//       $set: {
//         name: req.body.name,
//         slug: slugify(req.body.name, { lower: true }),
//       },
//     },
//     { new: true }
//   );
//   if (!brand) {
//     return next(new AppError("Brand not found", 404));
//   }
//   res.status(200).json({
//     status: "Success",
//     message: "Brand has been updated",
//     data: {
//       brand,
//     },
//   });
// });
const updateBrand = factoryHandler.updateOne(Brand);

// @desc    Delete brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
const deleteBrand = factoryHandler.deleteOne(Brand);

module.exports = {
  addBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};

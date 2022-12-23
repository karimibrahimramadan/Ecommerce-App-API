const Review = require("../models/Review");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factoryHandler = require("./factoryController");

// @desc    Create new review
// @route   POST /api/v1/reviews
// @access  Private
const createReview = catchAsync(async (req, res, next) => {
  const { review, rating, product } = req.body;
  const isReview = await Review.findOne({ user: req.user.id, product });
  if (isReview) {
    return next(new AppError("You can't add more than one review", 400));
  }
  req.body.user = req.user.id;
  const newReview = new Review(req.body);
  const savedReview = await newReview.save();
  res.status(201).json({
    status: "Success",
    message: "Document has been created",
    data: {
      doc: savedReview,
    },
  });
});

// @desc    Get all reviews
// @route   GET /api/v1/reviews
// @access  Private
const getAllReviews = factoryHandler.getAll(Review);

// @desc    Get review
// @route   GET /api/v1/reviews/:id
// @access  Private
const getReview = factoryHandler.getOne(Review);

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
const deleteReview = factoryHandler.deleteOne(Review);

// @desc    Update review
// @route   PATCH /api/v1/reviews/:id
// @access  Private
const updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError("Review not found", 404));
  }
  console.log(req.user.role);

  if (
    req.user._id.toString() !== review.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new AppError("You can only update your own reviews", 401));
  }
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    message: "Document has been updated",
    data: {
      doc: updatedReview,
    },
  });
});

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  deleteReview,
  updateReview,
};

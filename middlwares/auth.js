const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.access_token) {
    token = req.cookies.access_token;
  } else if (req.headers.authorization) {
    token = req.headers.authorization;
  }
  if (!token) {
    return next(new AppError("You are not logged in!", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!token) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  const user = await User.findById(decoded.id);
  // console.log(decoded);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again", 401)
    );
  }
  req.user = user;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Unauthorized", 403));
    } else {
      next();
    }
  };
};

module.exports = {
  protect,
  restrictTo,
};

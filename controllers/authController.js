const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const crypto = require("crypto");

// @desc    Register new user
// @route   POST /api/v1/users/signup
// @access  Public
const signup = catchAsync(async (req, res, next) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  const token = savedUser.getJWTEmailToken();
  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/confirm-email/:${token}`;
  const message = `<p>Use this email to confirm your email</p><br><a href='${url}'>Verify Email</a>`;
  sendEmail(savedUser.email, message, "Verify Email");
  res.status(201).json({
    status: "Success",
    message: "User has been created",
    data: {
      user: savedUser,
    },
  });
});

// @desc    Confrim email
// @route   GET /api/v1/users/confirm-email/:token
// @access  Private
const confirmEmail = catchAsync(async (req, res, next) => {
  const token = req.params;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new (AppError("User not found", 404))());
  }
  if (user.confirmEmail) {
    return next(new (AppError("Email is already verified", 400))());
  }
  const updatedUser = await User.findByIdAndUpdate(
    decoded.id,
    { $set: { confirmEmail: true } },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    message: "Email verified",
  });
});

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  const match = await user.comparePassword(password);
  if (!match) {
    return next(new AppError("Either email or password is incorrect", 401));
  }
  if (!user.confirmEmail) {
    return next(new AppError("Verifiy you email first", 400));
  }
  if (!user.active) {
    await User.findOneAndUpdate(
      { email },
      { $set: { active: true } },
      { new: true }
    );
  }
  const token = user.getJWTToken();
  res.cookie("access_token", token, { httpOnly: true }).status(200).json({
    status: "Success",
    message: "Logged in successfully",
    data: {
      user,
      token,
    },
  });
});

// @desc    Forgot password
// @route   PATCH /api/v1/users/forgotpassword
// @access  Public
const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  const token = user.createPasswordResetToken();
  await user.save();
  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetpassword/${token}`;
  const message = `<p>Use this link to reset your password</p><br><a href='${url}'>Reset Password</a>`;
  sendEmail(user.email, message, "Reset Password");
  res.status(200).json({
    status: "Success",
    message: "Email has been sent",
    token,
  });
});

// @desc    Reset password
// @route   PATCH /api/v1/users/resetpassword/:token
// @access  Private
const resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpire: { $gt: Date.now() },
  }).select("+password");
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 401));
  }
  const { password } = req.body;
  const match = await user.comparePassword(password);
  if (match) {
    return next(new AppError("Use new password", 400));
  }
  const hashedPassword = await user.hashPassword(password);
  const updatedUser = await User.findOneAndUpdate(
    {
      passwordResetToken: hashedToken,
      passwordResetExpire: { $gt: Date.now() },
    },
    {
      $set: {
        password: hashedPassword,
        passwordChangedAt: Date.now(),
        passwordResetExpire: undefined,
        passwordResetToken: undefined,
      },
    },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    message: "Password has been reset",
  });
});

// @desc    Update password
// @route   PATCH /api/v1/users/me/updatepassword
// @access  Private
const updatePassword = catchAsync(async (req, res, next) => {
  const { password, newPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  const match = await user.comparePassword(password);
  if (!match) {
    return next(new AppError("Incorrect password", 401));
  }
  const isMatch = await user.comparePassword(newPassword);
  if (isMatch) {
    return next(new AppError("Use new password", 400));
  }
  const hashedPassword = await user.hashPassword(newPassword);
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { password: hashedPassword, passwordChangedAt: Date.now() } },
    { new: true }
  );
  const token = updatedUser.getJWTToken();
  res.cookie("access_token", token, { httpOnly: true }).status(200).json({
    status: "Success",
    message: "Password has been updated",
    token,
  });
});

module.exports = {
  signup,
  confirmEmail,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
};

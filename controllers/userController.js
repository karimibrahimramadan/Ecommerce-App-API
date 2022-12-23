const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const factoryHandler = require("./factoryController");

// @desc    Get user's profile
// @route   GET /api/v1/users/me/profile
// @access  Private
const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
});

// @desc    Upload profile picture
// @route   PATCH /api/v1/users/me/profilepic
// @access  Private
const uploadProfilePic = catchAsync(async (req, res, next) => {
  const imageUrl = `${req.protocol}/${req.get("host")}/${req.dest}/${
    req.file.filename
  }`;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { profileImage: imageUrl } },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    message: "Profile picture has been uploaded",
    data: {
      user,
    },
  });
});

// @desc    Delete user's profile
// @route   DELETE /api/v1/users/me/delete
// @access  Private
const deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { active: false } },
    { new: true }
  );
  res.status(204).json({
    status: "Success",
    message: "Profile has been deleted",
    data: null,
  });
});

// @desc    Get all users
// @route   GET /api/v1/users/find
// @access  Private
const getAllUsers = factoryHandler.getAll(User);

// @desc    Get user
// @route   GET /api/v1/users/find/:id
// @access  Private
const getUser = factoryHandler.getOne(User);

// @desc    Update user
// @route   PATCH /api/v1/users/update/:id
// @access  Private
const updateUser = factoryHandler.updateOne(User);

// @desc    Delete user
// @route   DELETE /api/v1/users/delete/:id
// @access  Private
const deleteUser = factoryHandler.updateOne(User);

module.exports = {
  getMe,
  uploadProfilePic,
  deleteMe,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};

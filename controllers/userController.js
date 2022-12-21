const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

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

module.exports = {
  getMe,
  uploadProfilePic,
  deleteMe,
};

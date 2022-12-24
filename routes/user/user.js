const router = require("express").Router();
const authController = require("../../controllers/authController");
const userController = require("../../controllers/userController");
const { protect, restrictTo } = require("../../middlwares/auth");
const multerErrHandler = require("../../middlwares/multerErrorHandler");
const validation = require("../../middlwares/validation");
const { upload, fileValidation } = require("../../utils/multer");
const validators = require("./userValidation");

router.post(
  "/signup",
  validation(validators.signupValidation),
  authController.signup
);

router.get("/confirm-email/:token", authController.confirmEmail);

router.post(
  "/login",
  validation(validators.loginValidation),
  authController.login
);

router.patch(
  "/forgotpassword",
  validation(validators.forgotpasswordValidation),
  authController.forgotPassword
);

router.patch(
  "/resetpassword",
  validation(validators.resetpasswordValidation),
  authController.resetPassword
);

router.use(protect);

router.patch(
  "/me/updatepassword",
  validation(validators.updatepasswordValidation),
  authController.updatePassword
);

router.get("/me/profile", userController.getMe);

router.patch(
  "/me/profilepic",
  upload("users/profile", fileValidation.image).single("image"),
  userController.uploadProfilePic
);

router.patch(
  "/wishlist",
  validation(validators.addToWishlist),
  userController.addToWishlist
);

router.delete(
  "/wishlist",
  validation(validators.removeFromWishlist),
  userController.removeFromWishlist
);

router.patch(
  "/address",
  validation(validators.addAddress),
  userController.addAddress
);

router.delete(
  "/address",
  validation(validators.removeAddress),
  userController.removeAddress
);

router.use(restrictTo("admin"));

router.get("/find", userController.getAllUsers);

router.get("/find/:id", validation(validators.getUser), userController.getUser);

router.patch(
  "/update/:id",
  validation(validators.updateUser),
  userController.updateUser
);

router.delete(
  "/delete/:id",
  validation(validators.deleteUser),
  userController.deleteUser
);

module.exports = router;

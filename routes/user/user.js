const router = require("express").Router();
const authController = require("../../controllers/authController");
const userController = require("../../controllers/userController");
const { protect } = require("../../middlwares/auth");
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
  // multerErrHandler,
  userController.uploadProfilePic
);

module.exports = router;

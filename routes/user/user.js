const router = require("express").Router();
const authController = require("../../controllers/authController");
const { protect } = require("../../middlwares/auth");
const validation = require("../../middlwares/validation");
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

router.patch(
  "/me/updatepassword",
  protect,
  validation(validators.updatepasswordValidation),
  authController.updatePassword
);

module.exports = router;

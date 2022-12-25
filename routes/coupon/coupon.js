const router = require("express").Router();
const couponController = require("../../controllers/couponController");
const { protect, restrictTo } = require("../../middlwares/auth");
const validation = require("../../middlwares/validation");
const validators = require("./couponValidation");

router.use(protect);

router.use(restrictTo("admin", "seller"));

router.post(
  "/",
  validation(validators.createCouponValidation),
  couponController.createCoupon
);

router.patch(
  "/:id",
  validation(validators.upateCouponValidation),
  couponController.updateCoupon
);

router.delete(
  "/:id",
  validation(validators.deleteCouponValidation),
  couponController.deleteCoupon
);

router.get(
  "/:id",
  validation(validators.getCouponValidation),
  couponController.getCoupon
);

router.get("/", couponController.getAllCoupons);

module.exports = router;

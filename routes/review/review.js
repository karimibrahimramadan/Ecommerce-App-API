const router = require("express").Router({ mergeParams: true });
const reviewController = require("../../controllers/reviewController");
const { protect, restrictTo } = require("../../middlwares/auth");
const validation = require("../../middlwares/validation");
const validators = require("./reviewValidation");

router.use(protect);

router.post(
  "/",
  validation(validators.createReviewValidation),
  reviewController.createReview
);

router.get("/", reviewController.getAllReviews);

router.get(
  "/:id",
  validation(validators.getReviewValidation),
  reviewController.getReview
);

router.use(restrictTo("admin", "user"));

router.delete(
  "/:id",
  validation(validators.deleteReviewValidation),
  reviewController.deleteReview
);

router.patch(
  "/:id",
  validation(validators.updateReviewValidation),
  reviewController.updateReview
);

module.exports = router;

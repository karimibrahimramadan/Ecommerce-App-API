const router = require("express").Router();
const brandController = require("../../controllers/brandController");
const { protect, restrictTo } = require("../../middlwares/auth");
const validation = require("../../middlwares/validation");
const validators = require("./brandValidation");

router.use(protect);

router.use(restrictTo("admin"));

router.post(
  "/",
  validation(validators.addBrandValidation),
  brandController.addBrand
);

router.get("/", brandController.getAllBrands);

router.get(
  "/:brandId",
  validation(validators.getBrandValidation),
  brandController.getBrand
);

router.patch(
  "/:brandId",
  validation(validators.updateBrandValidation),
  brandController.updateBrand
);

router.delete(
  "/:brandId",
  validation(validators.deleteBrandValidation),
  brandController.deleteBrand
);

module.exports = router;

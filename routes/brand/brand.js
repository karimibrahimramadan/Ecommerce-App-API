const router = require("express").Router();
const brandController = require("../../controllers/brandController");
const { protect, restrictTo } = require("../../middlwares/auth");
const multerErrHandler = require("../../middlwares/multerErrorHandler");
const validation = require("../../middlwares/validation");
const { upload, fileValidation } = require("../../utils/multer");
const validators = require("./brandValidation");

router.use(protect);

router.use(restrictTo("admin"));

router.post(
  "/",
  upload("brand", fileValidation.image).single("image"),
  // multerErrHandler,
  validation(validators.addBrandValidation),
  brandController.addBrand
);

router.get("/", brandController.getAllBrands);

router.get(
  "/:id",
  validation(validators.getBrandValidation),
  brandController.getBrand
);

router.patch(
  "/:id",
  upload("brand", fileValidation.image).single("image"),
  // multerErrHandler,
  validation(validators.updateBrandValidation),
  brandController.updateBrand
);

router.delete(
  "/:id",
  validation(validators.deleteBrandValidation),
  brandController.deleteBrand
);

module.exports = router;

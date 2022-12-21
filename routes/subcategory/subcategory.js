const router = require("express").Router({ mergeParams: true });
const subcategoryController = require("../../controllers/subcategoryController");
const multerErrHandler = require("../../middlwares/multerErrorHandler");
const validation = require("../../middlwares/validation");
const { upload, fileValidation } = require("../../utils/multer");
const validators = require("./subcategoryValidation");

router.post(
  "/",
  upload("subcategory", fileValidation.image).single("image"),
  // multerErrHandler,
  validation(validators.createSubcategoryValidation),
  subcategoryController.createSubcategory
);

router.get(
  "/",
  validation(validators.getAllSubcategoriesValidation),
  subcategoryController.getAllSubcategories
);

router.get(
  "/:id",
  validation(validators.getSubcategoryValidation),
  subcategoryController.getSubcategory
);

router.patch(
  "/:id",
  upload("subcategory", fileValidation.image).single("image"),
  // multerErrHandler,
  validation(validators.updateSubcategoryValidation),
  subcategoryController.updateSubcategory
);

router.delete(
  "/:id",
  validation(validators.deleteSubcategoryValidation),
  subcategoryController.deleteSubcategory
);

module.exports = router;

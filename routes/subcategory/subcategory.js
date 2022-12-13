const router = require("express").Router({ mergeParams: true });
const subcategoryController = require("../../controllers/subcategoryController");
const validation = require("../../middlwares/validation");
const validators = require("./subcategoryValidation");

router.post(
  "/",
  validation(validators.createSubcategoryValidation),
  subcategoryController.createSubcategory
);

router.get(
  "/",
  validation(validators.getAllSubcategoriesValidation),
  subcategoryController.getAllSubcategories
);

router.get(
  "/:subcategoryId",
  validation(validators.getSubcategoryValidation),
  subcategoryController.getSubcategory
);

router.patch(
  "/:subcategoryId",
  validation(validators.updateSubcategoryValidation),
  subcategoryController.updateSubcategory
);

router.delete(
  "/:subcategoryId",
  validation(validators.deleteSubcategoryValidation),
  subcategoryController.deleteSubcategory
);

module.exports = router;

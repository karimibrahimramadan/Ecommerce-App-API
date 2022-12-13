const router = require("express").Router();
const categoryController = require("../../controllers/categoryController");
const subcategoryRouter = require("../subcategory/subcategory");
const validation = require("../../middlwares/validation");
const validators = require("./categoryValidation");
const { protect } = require("../../middlwares/auth");

router.use(protect);

router.use("/:categoryId/subcategories", subcategoryRouter);

router.post(
  "/",
  validation(validators.createCategoryValidation),
  categoryController.createCategory
);

router.get("/", categoryController.getAllCategories);

router.get(
  "/:categoryId",
  validation(validators.getCategoryValidation),
  categoryController.getCategory
);

router.patch(
  "/:categoryId",
  validation(validators.updateCategoryValidation),
  categoryController.updateCategory
);

router.delete(
  "/:categoryId",
  validation(validators.deleteCategoryValidation),
  categoryController.deleteCategory
);

module.exports = router;

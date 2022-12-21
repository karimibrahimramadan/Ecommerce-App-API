const router = require("express").Router();
const categoryController = require("../../controllers/categoryController");
const subcategoryRouter = require("../subcategory/subcategory");
const validation = require("../../middlwares/validation");
const validators = require("./categoryValidation");
const { protect, restrictTo } = require("../../middlwares/auth");
const { upload, fileValidation } = require("../../utils/multer");
const multerErrHandler = require("../../middlwares/multerErrorHandler");

router.use(protect);

router.use("/:categoryId/subcategories", subcategoryRouter);

router.get("/", categoryController.getAllCategories);

router.get(
  "/:id",
  validation(validators.getCategoryValidation),
  categoryController.getCategory
);

router.use(restrictTo("admin", "seller"));

router.post(
  "/",
  upload("category", fileValidation.image).single("image"),
  // multerErrHandler,
  validation(validators.createCategoryValidation),
  categoryController.createCategory
);

router.patch(
  "/:id",
  upload("category", fileValidation.image).single("image"),
  // multerErrHandler,
  validation(validators.updateCategoryValidation),
  categoryController.updateCategory
);

router.delete(
  "/:id",
  validation(validators.deleteCategoryValidation),
  categoryController.deleteCategory
);

module.exports = router;

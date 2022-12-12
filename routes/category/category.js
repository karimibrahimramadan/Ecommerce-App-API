const router = require("express").Router();
const categoryController = require("../../controllers/categoryController");
const subcategoryRouter = require("../subcategory/subcategory");

router.use("/:categoryId/subcategories", subcategoryRouter);

router.post("/", categoryController.createCategory);

router.get("/", categoryController.getAllCategories);

router.get("/:categoryId", categoryController.getCategory);

router.patch("/:categoryId", categoryController.updateCategory);

router.delete("/:categoryId", categoryController.deleteCategory);

module.exports = router;

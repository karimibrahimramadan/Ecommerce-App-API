const router = require("express").Router();
const categoryController = require("../../controllers/categoryController");

router.post("/", categoryController.createCategory);

router.get("/", categoryController.getAllCategories);

router.get("/:categoryId", categoryController.getCategory);

router.patch("/:categoryId", categoryController.updateCategory);

router.delete("/:categoryId", categoryController.deleteCategory);

module.exports = router;

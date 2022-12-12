const router = require("express").Router({ mergeParams: true });
const subcategoryController = require("../../controllers/subcategoryController");

router.post("/", subcategoryController.createSubcategory);

router.get("/", subcategoryController.getAllSubcategories);

router.get("/:subcategoryId", subcategoryController.getSubcategory);

router.patch("/:subcategoryId", subcategoryController.updateSubcategory);

router.delete("/:subcategoryId", subcategoryController.deleteSubcategory);

module.exports = router;

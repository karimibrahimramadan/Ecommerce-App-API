const router = require("express").Router();
const productController = require("../../controllers/productController");
const { protect, restrictTo } = require("../../middlwares/auth");
const validation = require("../../middlwares/validation");
const validators = require("./productValidation");

router.use(protect);

router.post(
  "/",
  restrictTo("seller"),
  validation(validators.createProductValidation),
  productController.createProduct
);

router.get("/", productController.getAllProducts);

router.get(
  "/:productId",
  validation(validators.getProductValidation),
  productController.getProduct
);

router.patch(
  "/:productId",
  restrictTo(["admin", "seller"]),
  validation(validators.updateProductValidation),
  productController.updateProduct
);

router.delete(
  "/:productId",
  restrictTo(["admin", "seller"]),
  validation(validators.deleteProductValidation),
  productController.deleteProduct
);

module.exports = router;

const router = require("express").Router();
const productController = require("../../controllers/productController");
const { protect, restrictTo } = require("../../middlwares/auth");
const multerErrHandler = require("../../middlwares/multerErrorHandler");
const validation = require("../../middlwares/validation");
const { upload, fileValidation } = require("../../utils/multer");
const validators = require("./productValidation");
const reviewRouter = require("../review/review");

router.use("/:productId/reviews", reviewRouter);

router.use(protect);

router.post(
  "/",
  restrictTo("seller"),
  upload("product", fileValidation.image).fields([
    { name: "imageCover", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  // multerErrHandler,
  validation(validators.createProductValidation),
  productController.createProduct
);

router.get("/", productController.getAllProducts);

router.get(
  "/:id",
  validation(validators.getProductValidation),
  productController.getProduct
);

router.patch(
  "/:id",
  restrictTo("admin", "seller"),
  upload("product", fileValidation.image).fields([
    { name: "imageCover", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  // multerErrHandler,
  validation(validators.updateProductValidation),
  productController.updateProduct
);

router.delete(
  "/:id",
  restrictTo("admin", "seller"),
  validation(validators.deleteProductValidation),
  productController.deleteProduct
);

module.exports = router;

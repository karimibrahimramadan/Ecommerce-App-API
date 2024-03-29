const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routesController = require("./routes/routesController");
const errorHandler = require("./controllers/errorController");
require("colors");
const path = require("path");

const app = express();

// middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// routes
app.use("/api/v1/brands", routesController.brandRouter);
app.use("/api/v1/categories", routesController.categoryRouter);
app.use("/api/v1/coupons", routesController.couponRouter);
app.use("/api/v1/products", routesController.productRouter);
app.use("/api/v1/reviews", routesController.reviewRouter);
app.use("/api/v1/subcategories", routesController.subcategoryRouter);
app.use("/api/v1/users", routesController.userRouter);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Fail",
    message: `${req.originalUrl} Not Found`,
  });
});

// error handler
app.use(errorHandler);

module.exports = app;

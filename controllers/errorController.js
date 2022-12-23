const AppError = require("../utils/appError");

const handleDuplicateFieldsDB = function (err) {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value`;
  return new AppError(message, err.statusCode);
};

const handleUnexpectedFields = function (err) {
  const message = `Number of fields exceeded the max count`;
  return new AppError(message, err.statusCode);
};

const handleInvalidFileFormat = function (err) {
  const message = "File format is not supported";
  return new AppError(message, 415);
};

const handleTokenExpiredError = function (err) {
  const message = "Token has expired. Please login again!";
  return new AppError(message, 400);
};

const sendErrorDev = function (err, res) {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = function (err, res) {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: "Error",
      message: "Something went wrong!",
    });
  }
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  if (process.env.NODE_ENV === "development") {
    console.log(err.name);
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.code === "LIMIT_UNEXPECTED_FILE")
      error = handleUnexpectedFields(err);
    if (err.message === "Invalid file format")
      error = handleInvalidFileFormat(err);
    if (err.name === "TokenExpiredError") error = handleTokenExpiredError(err);
    sendErrorProd(error, res);
  }
};

module.exports = errorHandler;

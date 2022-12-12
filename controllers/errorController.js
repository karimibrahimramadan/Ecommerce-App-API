const AppError = require("../utils/appError");

const handleDuplicateFieldsDB = function (err) {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value`;
  // console.log(err);
  return new AppError(message, err.statusCode);
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
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    sendErrorProd(error, res);
  }
};

module.exports = errorHandler;

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
    return res.status(500).json({
      status: "Error",
      message: "Something went wrong!",
    });
  } else {
  }
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // let error = { ...err };
    sendErrorProd(err, res);
  }
};

module.exports = errorHandler;

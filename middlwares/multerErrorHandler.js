const AppError = require("../utils/appError");

const multerErrHandler = (err, req, res, next) => {
  if (err) {
    return next(new AppError(err.message, 400));
  }
  next();
};

module.exports = multerErrHandler;

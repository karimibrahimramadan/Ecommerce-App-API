const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

const deleteOne = (Model, id) => {
  return async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new AppError(`${Model} not found`, 404));
    }
    res.status(204).json({
      status: "Success",
      message: `${Model} has been deleted`,
      data: null,
    });
  };
};

const getOne = (Model, id) => {
  return async (req, res, next) => {
    const doc = await Model.findById(id);
    if (!doc) {
      return next(new AppError(`${Model} not found`, 404));
    }
    res.status(200).json({
      status: "Success",

      data: {
        doc,
      },
    });
  };
};

const getAll = (Model) => {
  return async (req, res, next) => {
    const apiFeatures = new APIFeatures(Model.find(), req.query)
      .filter()
      .limitFields()
      .paginate()
      .sort()
      .search();
    const docs = await apiFeatures.query;
    res.status(200).json({
      status: "Success",

      data: {
        docs,
      },
    });
  };
};

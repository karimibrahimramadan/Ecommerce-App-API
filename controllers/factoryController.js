const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError(`${Model} not found`, 404));
    }
    res.status(204).json({
      status: "Success",
      message: `Document has been deleted`,
      data: null,
    });
  });
};

const getOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError(`${Model} not found`, 404));
    }
    res.status(200).json({
      status: "Success",
      data: {
        doc,
      },
    });
  });
};

const getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const filterObj = req.params.categoryId
      ? {
          category: req.params.categoryId,
        }
      : {};
    const apiFeatures = new APIFeatures(Model.find(filterObj), req.query)
      .filter()
      .limitFields()
      .paginate()
      .sort()
      .search();
    const docs = await apiFeatures.query;
    res.status(200).json({
      status: "Success",
      results: docs.length,
      data: {
        docs,
      },
    });
  });
};

const createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    req.body.image = req.file
      ? `${req.protocol}/${req.get("host")}/${req.dest}/${req.file.filename}`
      : "";
    const newDoc = new Model(req.body);
    const savedDoc = await newDoc.save();
    res.status(201).json({
      status: "Success",
      message: `Document has been created`,
      data: {
        doc: savedDoc,
      },
    });
  });
};

// const updateOne = (Model, id) => {
//   return catchAsync(async (req, res, next) => {
//     const doc = await Model.findByIdAndUpdate(id)
//   })
// }

module.exports = {
  createOne,
  deleteOne,
  getAll,
  getOne,
};

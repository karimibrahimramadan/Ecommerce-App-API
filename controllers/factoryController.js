const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const slugify = require("slugify");

const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("Document not found", 404));
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
      return next(new AppError("Document not found", 404));
    }
    res.status(200).json({
      status: "Success",
      data: {
        doc,
      },
    });
  });
};

const getAll = (Model, num) => {
  return catchAsync(async (req, res, next) => {
    let filterObj;
    switch (num) {
      case 1:
        filterObj = req.params.categoryId
          ? {
              category: req.params.categoryId,
            }
          : {};
        break;
      case 2:
        filterObj = req.params.productId
          ? { product: req.params.productId }
          : {};
        break;
    }
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

const updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const id = req.params.id;
    if (req.body.name) {
      req.body.slug = slugify(req.body.name, { lower: true });
    }
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.dest}/${
        req.file.filename
      }`;
    }
    const doc = await Model.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!doc) {
      return next(new AppError("Document not found", 404));
    }
    res.status(200).json({
      status: "Success",
      message: "Document has been updated",
      data: {
        doc,
      },
    });
  });
};

module.exports = {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
};

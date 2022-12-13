const Joi = require("joi");

const createSubcategoryValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3).required(),
    }),
};

const getSubcategoryValidation = {
  params: Joi.object()
    .required()
    .keys({
      subcategoryId: Joi.string().hex().length(24).required(),
    }),
};

const getAllSubcategoriesValidation = {
  params: Joi.object()
    .required()
    .keys({
      categoryId: Joi.string().hex().length(24),
    })
    .options({ allowUnknown: true }),
};

const updateSubcategoryValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3),
    }),
  params: Joi.object()
    .required()
    .keys({
      subcategoryId: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const deleteSubcategoryValidation = {
  params: Joi.object()
    .required()
    .keys({
      subcategoryId: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

module.exports = {
  createSubcategoryValidation,
  updateSubcategoryValidation,
  getAllSubcategoriesValidation,
  getSubcategoryValidation,
  deleteSubcategoryValidation,
};

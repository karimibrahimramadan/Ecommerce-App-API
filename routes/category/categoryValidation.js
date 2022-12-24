const Joi = require("joi");

const createCategoryValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3).required(),
    }),
};

const updateCategoryValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3),
    }),
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const getCategoryValidation = {
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const deleteCategoryValidation = {
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

module.exports = {
  createCategoryValidation,
  updateCategoryValidation,
  getCategoryValidation,
  deleteCategoryValidation,
};

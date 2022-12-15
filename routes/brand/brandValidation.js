const Joi = require("joi");

const addBrandValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3).required(),
    }),
};

const updateBrandValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3),
    }),
  params: Joi.object()
    .required()
    .keys({
      brandId: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const deleteBrandValidation = {
  params: Joi.object()
    .required()
    .keys({
      brandId: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const getBrandValidation = {
  params: Joi.object()
    .required()
    .keys({
      brandId: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

module.exports = {
  addBrandValidation,
  updateBrandValidation,
  getBrandValidation,
  deleteBrandValidation,
};

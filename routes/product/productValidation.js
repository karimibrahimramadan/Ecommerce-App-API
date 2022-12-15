const Joi = require("joi");

const createProductValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3).required(),
      description: Joi.string().required(),
      quantity: Joi.number().positive().required(),
      color: Joi.array().items(Joi.string()),
      price: Joi.number().positive().required(),
      discountPrice: Joi.number().positive(),
      sold: Joi.number().positive(),
      category: Joi.string().hex().length(24),
      subcategory: Joi.string().hex().length(24),
      brand: Joi.string().hex().length(24),
      ratingAverage: Joi.number().min(1).max(5),
      ratingCount: Joi.number().positive(),
      seller: Joi.string().hex().length(24),
    }),
};

const updateProductValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3),
      description: Joi.string(),
      quantity: Joi.number().positive(),
      color: Joi.array().items(Joi.string()),
      price: Joi.number().positive(),
      discountPrice: Joi.number().positive(),
      sold: Joi.number().positive(),
      category: Joi.string().hex().length(24),
      subcategory: Joi.string().hex().length(24),
      brand: Joi.string().hex().length(24),
      ratingAverage: Joi.number().min(1).max(5),
      ratingCount: Joi.number().positive(),
    }),
  params: Joi.object()
    .required()
    .keys({
      productId: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const getProductValidation = {
  params: Joi.object()
    .required()
    .keys({
      productId: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const deleteProductValidation = {
  params: Joi.object()
    .required()
    .keys({
      productId: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

module.exports = {
  createProductValidation,
  updateProductValidation,
  getProductValidation,
  deleteProductValidation,
};

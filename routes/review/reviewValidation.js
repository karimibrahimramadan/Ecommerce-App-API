const Joi = require("joi");

const createReviewValidation = {
  body: Joi.object()
    .required()
    .keys({
      review: Joi.string().min(5).required(),
      product: Joi.string().hex().length(24).required(),
      rating: Joi.number().min(1).max(5).required(),
    }),
};

const updateReviewValidation = {
  body: Joi.object()
    .required()
    .keys({
      review: Joi.string().min(5),
      rating: Joi.number().min(1).max(5),
    }),
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const getReviewValidation = {
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const deleteReviewValidation = {
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const getAllReviewsValidation = {
  params: Joi.object()
    .required()
    .keys({
      productId: Joi.string().hex().length(24),
    })
    .options({ allowUnknown: true }),
};

module.exports = {
  createReviewValidation,
  updateReviewValidation,
  deleteReviewValidation,
  getReviewValidation,
  getAllReviewsValidation,
};

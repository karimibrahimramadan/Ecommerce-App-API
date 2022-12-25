const Joi = require("joi");

const createCouponValidation = {
  body: Joi.object()
    .required()
    .keys({
      code: Joi.string().min(3).required(),
      expire: Joi.date().required(),
      discount: Joi.number().positive().required(),
    }),
};

const upateCouponValidation = {
  body: Joi.object()
    .required()
    .keys({
      code: Joi.string().min(3),
      expire: Joi.date(),
      discount: Joi.number().positive(),
    }),
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const deleteCouponValidation = {
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const getCouponValidation = {
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

module.exports = {
  createCouponValidation,
  upateCouponValidation,
  deleteCouponValidation,
  getCouponValidation,
};

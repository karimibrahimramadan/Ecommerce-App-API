const Joi = require("joi");

const signupValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required(),
      email: Joi.string().lowercase().email().required(),
      password: Joi.string().pattern(new RegExp()).required(),
      confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    }),
};

const loginValidation = {
  body: Joi.object().required().keys({
    email: Joi.string().lowercase().email().required(),
    password: Joi.string().required(),
  }),
};

const forgotpasswordValidation = {
  body: Joi.object().required().keys({
    email: Joi.string().email().required(),
  }),
};

const resetpasswordValidation = {
  body: Joi.object()
    .required()
    .keys({
      password: Joi.string().pattern(new RegExp()).required(),
      confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    }),
};

const updatepasswordValidation = {
  body: Joi.object()
    .required()
    .keys({
      password: Joi.string().required(),
      newPassword: Joi.string().pattern(new RegExp()).required(),
      confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
    }),
};

module.exports = {
  signupValidation,
  loginValidation,
  forgotpasswordValidation,
  resetpasswordValidation,
  updatepasswordValidation,
};

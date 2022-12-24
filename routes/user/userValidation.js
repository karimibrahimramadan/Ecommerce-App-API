const Joi = require("joi");

const signupValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3).required(),
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

const getUser = {
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const deleteUser = {
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const updateUser = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3),
      email: Joi.string().email(),
      role: Joi.string().valid("admin", "seller", "user"),
      phone: Joi.string(),
      active: Joi.boolean().default(false),
    }),
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().length(24).required(),
    })
    .options({ allowUnknown: true }),
};

const addToWishlist = {
  body: Joi.object()
    .required()
    .keys({
      product: Joi.string().hex().length(24).required(),
    }),
};

const removeFromWishlist = {
  body: Joi.object()
    .required()
    .keys({
      product: Joi.string().hex().length(24),
    }),
};

const addAddress = {
  body: Joi.object()
    .required()
    .keys({
      address: Joi.object().keys({
        name: Joi.string().required(),
        street: Joi.string().required(),
        city: Joi.string().required(),
        postalCode: Joi.string().required(),
      }),
    }),
};

const removeAddress = {
  body: Joi.object().keys({
    address: Joi.string().hex().length(24),
  }),
};

module.exports = {
  signupValidation,
  loginValidation,
  forgotpasswordValidation,
  resetpasswordValidation,
  updatepasswordValidation,
  getUser,
  updateUser,
  deleteUser,
  addToWishlist,
  removeFromWishlist,
  addAddress,
  removeAddress,
};

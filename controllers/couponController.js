const catchAsync = require("../utils/catchAsync");
const factoryHandler = require("./factoryController");
const Coupon = require("../models/Coupon");

const createCoupon = factoryHandler.createOne(Coupon);

const updateCoupon = factoryHandler.updateOne(Coupon);

const deleteCoupon = factoryHandler.deleteOne(Coupon);

const getCoupon = factoryHandler.getOne(Coupon);

const getAllCoupons = factoryHandler.getAll(Coupon);

module.exports = {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
};

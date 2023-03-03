const mongoose = require("mongoose");
const uuid = require("uuid");
const adminUserModal = require("../models/adminUserModel");

const validateUserId = async function (userId) {
  const adminUser = await adminUserModal.find({ id: userId });
  return adminUser ? true : false;
};
const house = new mongoose.Schema({
  id: {
    type: String,
    default: uuid.v4(),
  },
  userId: {
    type: String,
    validator: [validateUserId, "User Id is invalid"],
  },
  bedroom: {
    type: Number,
    required: true,
  },
  bathroom: {
    type: Number,
    required: true,
  },
  carpetArea: {
    type: Number,
    required: true,
  },
  featureStrings: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  leaseAgreement: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  images: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  amenities: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.Mixed,
  },
  address: {
    type: String,
    required: true,
  },
  occupied: {
    type: Number,
    default: 0,
  },
  created_on: {
    type: Date,
    default: Date(),
  },
  startDate: {
    type: Date,
    required: true,
  },
  deleted: {
    type: Number,
    default: 0,
  },
  faqs: {
    type: String,
  },
});

house.pre(/^find/, function () {
  this.where({ deleted: { $ne: 1 } });
});

const houseModel = mongoose.model("house", house, "house");
module.exports = houseModel;

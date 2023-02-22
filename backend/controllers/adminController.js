const helpers = require("../helpers");
const constants = require("../constants");
const adminUserModal = require("../models/adminUserModel");
const houseModal = require("../models/houseModel");
const s3Helper = require("../s3Helper");

const adminController = {};
adminController.register = (req, res) => {
  helpers.registerUser(req, res, adminUserModal);
};

adminController.login = (req, res) => {
  helpers.logInUser(req, res, adminUserModal);
};

adminController.addHouse = async (req, res) => {
  let body = req.body;
  let leaseAgreementFile;
  let image;
  const house = new houseModal({
    userId: req.user.id,
  });
  let error = [];
  if (!body.features) {
    error.push("Features are missing");
  } else {
    house.featureStrings = [];
    body.features.forEach((element) => {
      house.featureStrings.push(element);
    });
  }
  if (!body.cost) {
    error.push("Cost is required");
  } else {
    house.cost = Number(body.cost);
  }
  if (!body.address) {
    error.push("Address is required");
  } else {
    house.address = body.address;
  }
  if (!body.bedroom) {
    error.push("Bedroom is required");
  } else {
    house.bedroom = body.bedroom;
  }
  if (!body.bathroom) {
    error.push("bathroom is required");
  } else {
    house.bathroom = body.bathroom;
  }
  if (!body.carpetArea) {
    error.push("CarpetArea is required");
  } else {
    house.carpetArea = body.carpetArea;
  }
  if (!body.ammenities) {
    error.push("Ammenities is required");
  } else {
    house.ammenities = body.ammenities;
  }
  if (!body.leaseAgreement) {
    error.push("Lease aggrement is required");
  }
  if (!body.images) {
    error.push("Please upload atlease one image");
  }
  if (!body.location) {
    house.location = body.location;
  }
  if (error.length != 0) {
    return res.status(400).json({ status: 0, error: error });
  } else {
    house.images = [];
    image = await s3Helper.uploadImages(body.images);
    if (image.status != 0) {
      house.images = image.s3Details;
    } else {
      error.push(image.error);
    }
    leaseAgreementFile = await s3Helper.uploadFile(
      body.leaseAgreement,
      "application/pdf"
    );
    if (leaseAgreementFile.status) {
      house.leaseAgreement = leaseAgreementFile.s3Details;
    } else {
      error.push("Lease Agreement cannot be uploaded");
    }
  }
  if (error.length != 0) {
    return res.status(400).json({ status: 0, error: error });
  }
  try {
    await house.save();
  } catch (error) {
    res
      .status(400)
      .json({ status: 0, error: helpers.getErrorValidationMsg(error.errors) });
    return;
  }
  res.status(201).send(house);
  return;
};

module.exports = adminController;

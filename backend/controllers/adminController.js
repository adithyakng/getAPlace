const helpers = require("../helpers");
const constants = require("../constants");
const adminUserModal = require("../models/adminUserModel");
const raiseRequestModal = require("../models/requestsModel");
const houseModal = require("../models/houseModel");
const s3Helper = require("../s3Helper");
const { raiseRequest } = require("./commonController");

const adminController = {};
adminController.register = (req, res) => {
  helpers.registerUser(req, res, adminUserModal);
};

adminController.login = (req, res) => {
  helpers.logInUser(req, res, adminUserModal);
};

adminController.addHouse = async (req, res) => {
  helpers.addOrEditHouse(req, res);
};

adminController.editHouse = async (req, res) => {
  let houseId = req.body.id;
  let house = await houseModal.findOne({ id: houseId, userId: req.user.id });
  if (!house) {
    res.status(401).json({ status: 1, error: "Invalid ID" });
    return;
  }
  helpers.addOrEditHouse(req, res, house);
};

adminController.deleteHouse = async (req, res) => {
  let houseId = req.query.id;
  let house = await houseModal.findOne({ id: houseId, userId: req.user.id });
  if (!house) {
    res.status(401).json({ status: 1, error: "Invalid ID" });
    return;
  }
  helpers.deleteHouse(req, res, house);
};

adminController.actOnRequest = async (req, res) => {
  let requestId = req.body.requestId;
  if(!requestId){
    res.status(401).json({ status: 1, error: "Invalid request ID" });
    return;
  }
  let request = await raiseRequestModal.findOne({id:requestId});
  request.status = 1;
  request.save();
  res.status(200).json({status:1, message:"Request resolved successfully"});
}
module.exports = adminController;

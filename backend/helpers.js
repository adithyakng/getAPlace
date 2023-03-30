const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let moment = require("moment");
const uuid = require("uuid");

const { adminUser, normalUser } = require("./constants");
const userModal = require("./models/userModel");
const adminUserModal = require("./models/adminUserModel");
const s3Helper = require("./s3Helper");
const houseModal = require("./models/houseModel");

require("dotenv").config();

let present_tokens = [];
function getErrorValidationMsg(error) {
  let errors = [];
  if (!Array.isArray(error)) {
    errors.push(error);
    return errors;
  }
  for (const [key, value] of Object.entries(error)) {
    errors.push(value["message"]);
  }
  return errors;
}

function generateAccessToken(user) {
  const token = jwt.sign(
    user.toJSON(),
    process.env.GETAPLACE_JWT_ACCESS_TOKEN,
    { expiresIn: "10000000m" }
  );
  present_tokens.push(token);
  return token;
}

function validateToken(req, res, next) {
  const header = req.headers["authorization"];
  if (header == null) {
    res
      .status(400)
      .json({ status: 0, error: "authorization header is missing" });
    return;
  }
  const token = header.split(" ")[1];
  if (token == null) {
    // Include present_tokens check
    res.status(400).json({ status: 0, error: "Token not present" });
    return;
  }
  try {
    const user = jwt.verify(token, process.env.GETAPLACE_JWT_ACCESS_TOKEN);
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ status: 0, error: "Invalid Token" });
  }
}

async function registerUser(req, res, userTypeModal) {
  let body = req.body;
  if (!body.name || !body.email || !body.password) {
    res.status(400).json({
      status: 0,
      error: "Name Email and Password and Phone Number are required fields",
    });
    return;
  }

  const user = await userTypeModal.find({
    $or: [{ email: body.email }, { phoneNumber: body.phoneNumber }],
  });

  if (user.length != 0) {
    res
      .status(400)
      .json({ status: 0, error: "Email ID/ Phone Number already Registered" });
    return;
  }

  let newUser = new userTypeModal({
    id: uuid.v4(),
    name: body.name,
    email: body.email,
    password: await bcrypt.hash(body.password.toString(), 15),
    countryCode: body.countryCode,
    phoneNumber: body.phoneNumber,
  });
  try {
    await newUser.save();
  } catch (error) {
    res
      .status(400)
      .json({ status: 0, error: getErrorValidationMsg(error.errors) });
    return;
  }
  res.status(201).json({
    status: 1,
    message: "User Registered Successfully",
  });
}

async function logInUser(req, res, userTypeModal) {
  let body = req.body;
  if (!body.email || !body.password) {
    res
      .status(400)
      .json({ status: 0, error: "Both Email and Password are required" });
    return;
  }
  const user = await userTypeModal.findOne({ email: body.email });
  if (!user) {
    res
      .status(401)
      .json({ status: 1, error: "Email not registered with us. Pl register" });
    return;
  }
  const password = await bcrypt.hash(body.password, 15);
  if (!(await bcrypt.compare(body.password, user.password))) {
    res.status(401).json({ status: 0, error: "Incorrect Password" });
    return;
  }
  const access_token = generateAccessToken(user);
  res.status(200).json({
    status: 1,
    message: "Login SuccessFull",
    access_token: access_token,
  });
}

async function addOrEditHouse(req, res, houseObject = false) {
  let body = req.body;
  let leaseAgreementFile;
  let image;
  var house = houseObject
    ? houseObject
    : new houseModal({
        userId: req.user.id,
      });
  let error = [];
  if (!body.features) {
    error.push("Features are missing");
  } else {
    house.features = [];
    body.features.forEach((element) => {
      house.features.push(element);
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
  if (!body.amenities) {
    error.push("Amenities is required");
  } else {
    house.amenities = body.amenities;
  }
  if (body.faqs) {
    house.faqs = body.faqs;
  }
  if (!body.leaseAgreement) {
    error.push("Lease aggrement is required");
  }
  if (!body.startDate || !moment(body.startDate, "DD/MM/YYYY", true)) {
    error.push("Please enter a valid date in DD/MM/YYYY format");
  } else {
    house.startDate = new Date(body.startDate);
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
      body.leaseAgreement[0],
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
      .json({ status: 0, error: getErrorValidationMsg(error.errors) });
    return;
  }
  res.status(201).send(house);
  return;
}

async function deleteHouse(req, res, house) {
  house.deleted = 1;
  try {
    await house.save();
  } catch (error) {
    res
      .status(400)
      .json({ status: 0, error: getErrorValidationMsg(error.errors) });
    return;
  }
  res.status(201).json({ status: 1, message: "House Deleted" });
  return;
}

module.exports = {
  getErrorValidationMsg,
  generateAccessToken,
  validateToken,
  registerUser,
  logInUser,
  addOrEditHouse,
  deleteHouse,
};

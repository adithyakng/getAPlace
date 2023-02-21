const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { adminUser, normalUser } = require("./constants");
const userModal = require("./models/userModel");
const adminUserModal = require("./models/adminUserModel");
const s3Helper = require("./s3Helper");

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

  const newUser = new userTypeModal({
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
      .json({ status: 0, error: helpers.getErrorValidationMsg(error.errors) });
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

module.exports = {
  getErrorValidationMsg,
  generateAccessToken,
  validateToken,
  registerUser,
  logInUser,
};

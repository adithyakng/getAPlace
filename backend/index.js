require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const healthRoute = require("./routes/healthRoute");
const loginRoute = require("./routes/loginRoute");
const userModel = require("./models/userModel");
const adminRoute = require("./routes/adminRoute");

const app = express();

app.use(bodyParser.json({ limit: "200mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: true,
    parameterLimit: 500000,
  })
);
app.use("/health", healthRoute);
app.use("/login", loginRoute);
app.use("/admin", adminRoute);

app.listen(process.env.GETAPLACE_NODE_PORT, async () => {
  // Connection to MongoDb
  try {
    await mongoose.connect(process.env.GETAPLACE_NODE_MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection With MongoDB established");
  } catch (error) {
    console.log(error);
  }
  // Connection to MongoDb
  console.log(`Server Started at port ${process.env.GETAPLACE_NODE_PORT}`);
});

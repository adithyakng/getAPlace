require("dotenv");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const healthRoute = require("./routes/healthRoute");
const loginRoute = require("./routes/loginRoute");
const adminRoute = require("./routes/adminRoute");

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: "1000mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "1000mb",
    extended: true,
    parameterLimit: 500000,
  })
);
app.use("/api/health", healthRoute);
app.use("/api/login", loginRoute);
app.use("/api/admin", adminRoute);

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

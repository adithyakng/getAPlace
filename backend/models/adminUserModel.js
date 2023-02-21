const mongoose = require("mongoose");
const uuid = require("uuid");

let validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const adminUserSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid.v4(),
    unique: true
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email:{
    type: String,
    required: true,
    unique: [true,"Email ID is already Registerd. Pl login"],
    validator:[validateEmail,"Email ID is invalid."]
  },
  password: {
    type: String,
    required: true,
    minlength: [60,"Password must have alteast 8 characters"]
  },
  countryCode:{
    type: String,
    required: true
  },
  phoneNumber:{
    type: Number,
    required: true,
  },
  created_on:{
    type: Date,
    default: Date()
  },
  isAdmin:{
    type: Number,
    default: 1
  }
});

const adminUser = mongoose.model("adminUser",adminUserSchema,"AdminUsers");

module.exports = adminUser;
const loginController = {}
const bcrypt = require('bcrypt')
const userModal = require("../models/userModel");
const helpers = require('../helpers');
const houseModal = require('../models/houseModel');

loginController.index = (req,res) => {
    helpers.registerUser(req,res,userModal);
}

loginController.login = async (req,res) => {
    helpers.logInUser(req,res,userModal);
}

loginController.test = (req,res) => { // User for testing purpose only
    res.send("Hi");
}

module.exports = loginController;
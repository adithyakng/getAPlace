const express = require('express');
const adminController = require('../controllers/adminController');
const commonController = require('../controllers/commonController');
const {validateToken} = require('../helpers')
const routes = express()
routes.post("/register",adminController.register);
routes.post("/login",adminController.login);
routes.post("/addHouse",validateToken,adminController.addHouse);
routes.post("/listHouses",validateToken,commonController.listHouses)
module.exports = routes;
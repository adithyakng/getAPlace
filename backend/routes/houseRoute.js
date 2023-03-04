const express = require('express');
const houseController = require('../controllers/houseController');
const {validateToken} = require('../helpers')
const routes = express()
routes.get("/getFaq",validateToken, houseController.getFaq);
module.exports = routes;
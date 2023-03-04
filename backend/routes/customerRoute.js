const express = require('express');
const commonController = require('../controllers/commonController');
const {validateToken} = require('../helpers')
const routes = express()
routes.post("/listHouses",validateToken,commonController.listHouses);
module.exports = routes;
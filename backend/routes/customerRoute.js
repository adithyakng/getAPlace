const express = require('express');
const commonController = require('../controllers/commonController');
const {validateToken} = require('../helpers')
const routes = express()
routes.post("/listHouses",validateToken,commonController.listHouses);
routes.post("/submitLease",validateToken,commonController.submitLease);
routes.post("/sortHouses",validateToken,commonController.sortHouses);
routes.post("/sortOptions",validateToken,commonController.getSortOptions);
module.exports = routes;
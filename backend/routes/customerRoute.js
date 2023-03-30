const express = require('express');
const commonController = require('../controllers/commonController');
const {validateToken} = require('../helpers')
const routes = express()
routes.post("/listHouses",validateToken,commonController.listHouses);
routes.post("/submitLease",validateToken,commonController.submitLease);
routes.post("/sortHouses",validateToken,commonController.sortHouses);
routes.post("/sortOptions",validateToken,commonController.getSortOptions);
routes.get("/getAllLeases",validateToken,commonController.getAllLeases);
routes.post("/raiseRequest",validateToken,commonController.raiseRequest);
routes.get("/getAllRequests",validateToken,commonController.showAllRequests);
routes.post("/chatGpt",validateToken,commonController.chatGpt);
module.exports = routes;
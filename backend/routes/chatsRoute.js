const express = require('express');
const {validateToken} = require("../helpers");
const chatsController = require("../controllers/chatsController");
const routes = express()
routes.get("/",validateToken,chatsController.getMessages);
routes.post("/",validateToken, chatsController.postMessage);
module.exports = routes;
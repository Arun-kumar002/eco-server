const express = require("express");
const routes = express.Router();
const { registerController } = require("../controllers/authcontroller");

routes.post("/register", registerController);

module.exports = routes;

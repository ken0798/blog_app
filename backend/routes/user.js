const express = require("express");
const { createUser, logUser } = require("../controllers/user");
const routes = express.Router();

routes.route("/create").post(createUser);
routes.route("/auth").post(logUser);
module.exports = routes;

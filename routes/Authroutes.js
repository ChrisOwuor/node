const express = require("express");
const Authcontrollers = require("../controllers/Authcontrollers");
const appRouter = express.Router();

appRouter.post("/signup", Authcontrollers.signup);
appRouter.post("/login", Authcontrollers.login);
module.exports = appRouter;

const express = require("express");
const Authcontrollers = require("../controllers/Authcontrollers");
const appRouter = express.Router();

appRouter.post("/signup", Authcontrollers.signup_post);
appRouter.get("/signup", Authcontrollers.signup_get);
appRouter.get("/login", Authcontrollers.login_get);
appRouter.post("/login", Authcontrollers.login_post);
appRouter.get("/logout", Authcontrollers.logout_get);

module.exports = appRouter;

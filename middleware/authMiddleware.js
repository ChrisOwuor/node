const jwt = require("jsonwebtoken");
const user = require("../models/User");
const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "mojo secret", async (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      }

      next();
    });
  } else {
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "mojo secret", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.redirect("/login");
      }
      const user_instance = await user.findById(decodedToken.id);
      res.locals.user = user_instance;
      next();
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { authMiddleware, checkUser };

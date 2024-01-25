const jwt = require("jsonwebtoken");

const user = require("../models/User");
// Handle errors
const HandleErrors = (err, code) => {
  const errors = {};
  if (code === 11000) {
    errors.email = "email already exists";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties.message;
    });
  }
  return errors;
};

// create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  const token = jwt.sign({ id }, "mojo secret", {
    expiresIn: maxAge,
  });
  return token;
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const new_user = await user.create({ email, password });
    const token = createToken(new_user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
    res.status(201).json({ user: new_user._id });
  } catch (error) {
    const errors = HandleErrors(error, error.code);
    res.status(500).json({ errors });
  }
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  res.send("user login");
};

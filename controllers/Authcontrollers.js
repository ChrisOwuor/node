const user = require("../models/User");
// Handle errors
const HandleErrors = (err, code) => {
  const errors = {};
  if (code === 11000) {
    errors.error = "email already exists";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties.message;
    });
  }
  return errors;
};
module.exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const new_user = await user.create({ email, password });
    res.status(201).json(new_user);
  } catch (error) {
    const errors = HandleErrors(error, error.code);
    res.status(404).json(errors);
  }
};

module.exports.login = () => {
  console.log("home");
};

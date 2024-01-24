const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    validate: [isEmail, "enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "enter a password"],
    minlength: [5, "password length must be more than five characters long"],
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;

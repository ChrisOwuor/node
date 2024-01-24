const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const user = mongoose.model("user", userSchema);
module.exports = user;

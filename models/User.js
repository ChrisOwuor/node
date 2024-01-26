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
// mongoose pre hooks
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// mongoose static method
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("wrong password");
  }
  throw Error("user with this email does not exist");
};
const user = mongoose.model("user", userSchema);
module.exports = user;

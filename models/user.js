import mongoose from "mongoose";
const bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var user = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  since: {
    type: Date,
    default: Date.now,
  },
});

user.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrectPassword");
  }
  throw Error("incorrectEmail");
};

mongoose.models = {};

var User = mongoose.model("User", user);

export default User;

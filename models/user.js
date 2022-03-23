const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
  profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "Profile",
  },
  since: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.login = async function (email, password) {
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

// mongoose.models = {};
// var User = mongoose.model("User", user);
// export default User;

module.exports = mongoose.models.User || mongoose.model("User", userSchema);

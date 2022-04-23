const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  // profile_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Profile",
  //   // required: true,
  // },
  profile_pic: {
    type: String,
  },
  profile_name: {
    type: String,
    required: true,
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

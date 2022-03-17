const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "Profile",
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Project",
  },
  content: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", comment);
module.exports = Comment;

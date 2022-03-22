const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
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

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

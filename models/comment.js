const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

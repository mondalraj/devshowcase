const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  github_link: {
    type: String,
  },
  live_link: {
    type: String,
  },
  profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
});

module.exports =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

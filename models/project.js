const mongoose = require("mongoose");

const project = new mongoose.Schema({
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

const Project = mongoose.model("Project", project);
module.exports = Project;

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
    },
    work_description: {
      type: String,
    },
    university_name: {
      type: String,
      // required: true,
    },
    course_name: {
      type: String,
      // required: true,
    },
    skills: [
      {
        type: String,
        required: true,
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    website: { type: String },

    linked_in: {
      type: String,
    },
    instagram: {
      type: String,
    },
    github: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

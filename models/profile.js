const mongoose = require("mongoose");

const profile = new mongoose.Schema(
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
            type: Date,
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
            required: true,
        },
        course_name: {
            type: String,
            required: true,
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
                required: true,
                ref: "Project",
            },
        ],
    },
    { timestamps: true }
);

const Profile = mongoose.model("Profile", profile);
module.exports = Profile;

const mongoose = require("mongoose");

const project = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        images: [
            {
                type: String,
            },
        ],
        tags: [
            {
                type: String,
            },
        ],
        github_link: {
            type: String,
        },
        live_link: {
            type: String,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
);

const Project = mongoose.model("Project", project);
module.exports = Project;

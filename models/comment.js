const mongoose = require("mongoose");

const comment = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        content: {
            type: String,
            required: true,
        },
    }
);

const Comment = mongoose.model("Comment", comment);
module.exports = Comment;

const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blog", // reference to the Blog model
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user", // was "red" instead of "ref"
    },
});

const Comment = model("comment", commentSchema);

module.exports = Comment;

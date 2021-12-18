const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentSchema = new Schema({
    comment_id: String,
    author: String,
    post: String,
    content: String
})

module.exports = mongoose.model("comments", commentSchema);
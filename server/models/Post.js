const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema({
    post_id: String,
    author: String,
    content: String
})

module.exports = mongoose.model("posts", postSchema);
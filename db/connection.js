var mongoose  = require("mongoose");

var PostSchema = new mongoose.Schema({
    description: String,
    author: String,
    likes: Number,
    createdDate: Date
});

var ThreadSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: Array,
    author: String,
    likes: Number,
    views: Number,
    createdDate: Date,
    posts: [PostSchema]
});




var PostModel = mongoose.model("Post", PostSchema);
var ThreadModel = mongoose.model("Thread", ThreadSchema);

module.exports = {
    PostModel: PostModel,
    ThreadModel: ThreadModel
}

mongoose.connect("mongodb://localhost/blogSite");

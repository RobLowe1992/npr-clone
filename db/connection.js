var mongoose  = require("mongoose");


var ArticleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    img_url: String,
    img_author: String,
    audio: String
  }
)



var ArticleModel = mongoose.model("Article", ArticleSchema);


module.exports = {
  ArticleModel: ArticleModel
}

mongoose.connect("mongodb://localhost/nprClone");

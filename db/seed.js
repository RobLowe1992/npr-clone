var Schema = require("../db/connection.js");

var ArticleModel = Schema.ArticleModel

ArticleModel.remove({});
Donation


var art1 = new ArticleModel({title: "Title", description: "Body", img_url: "Url", img_author: "Author", audio: "Audio" });

art1.save(function(err){
    if (err){
      console.log(err);
    }else {
      console.log("An article was saved!");
      process.exit();
    }
});

var express = require("express");
var parser = require("body-parser");
var mongoose = require("./db/connection");
var app = express();

const Article = mongoose.ArticleModel;

app.set('port', process.env.PORT || 8080)
app.use(parser.json({extended: true}));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res){
  res.render("index");
});

app.get("/api/articles", function(req,res){
    Article.find({}).then((articles)=>{
        res.json(articles);
    });
});
app.get("/api/music", function(req,res){
    Music.find({}).then((musics)=>{
        res.json(musics);
});
});
app.get("/api/articles/:title", function(req,res){
    Article.findOne({title: req.params.title}).then((article)=>{
        res.json(article);
    });
});
app.get("/api/music/:title", function(req,res){
    Music.findOne({title: req.params.title}).then((music)=>{
        res.json(music);
});
});
app.post("/api/articles", function(req,res){
    Article.create(req.body).then((article)=>{
        res.json(article);
    });
});
app.post("/api/music", function(req,res){
    Music.create(req.body).then((music)=>{
        res.json(music);
    });
});
app.delete("/api/articles/:title", function(req,res){
    Article.findOneAndRemove({title: req.params.title}).then(()=>{
        res.json({success: true});
    });
});
app.delete("/api/music/:title", function(req,res){
    Article.findOneAndRemove({title: req.params.title}).then(()=>{
        res.json({success: true});
});
});
app.put("/api/articles/:title", function(req,res){
    Article.findOneAndUpdate({title: req.params.title}, req.body, {new: true}).then((article)=>{
        res.json(article);
    });
});
app.put("/api/music/:title", function(req,res){
    Article.findOneAndUpdate({title: req.params.title}, req.body, {new: true}).then((music)=>{
        res.json(music);
    });
});
app.listen(8080, ()=> {
    console.log(['Listening on port 8080'])
})

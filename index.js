var express = require("express");
var parser = require("body-parser");
var mongoose = require("./db/connection");
const app = express();

const Article = mongoose.ArticleModel;
app.set('port', process.env.PORT || 8080)
app.use(parser.json({extended: true}));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/", function(req, res){
  res.render("index");
});

app.get('/api/articles', function(req,res){
    Article.find({}).then((articles)=>{
        res.json(articles);
    });
});
app.get('/api/articles/:title', function(req,res){
    Article.findOne({title: req.params.title}).then((article)=>{
        res.json(article);
    });
});
app.post('/api/articles', function(req,res){
    Article.create(req.body).then((article)=>{
        res.json(article);
    });
});
app.delete('/api/articless/:title', function(req,res){
    Article.findOneAndRemove({title: req.params.title}).then(()=>{
        res.json({success: true});
    });
});
app.put('/api/articless/:title', function(req,res){
    Article.findOneAndUpdate({title: req.params.title}, req.body, {new: true}).then((article)=>{
        res.json(article);
    });
});
app.listen(8080, ()=> {
    console.log(['Listening on port 8080'])
})

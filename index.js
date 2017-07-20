var express = require("express");
var parser = require("body-parser");
var mongoose = require("./db/connection");
var app = express();

const Post = mongoose.PostModel;
const Thread = mongoose.ThreadModel;

app.set('port', process.env.PORT || 8080)
app.use(parser.json({extended: true}));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res){
  res.render("index");
});

app.get("/api/threads", function(req,res){
    Thread.find({}).then((threads)=>{
        res.json(threads);
    });
});
app.get("/api/threads/:id", function(req,res){
    Thread.findOne({_id: req.params.id}).then((thread)=>{
        res.json(thread);
    });
});
app.get("/api/threads/:thread_id/posts", function(req,res){
    Thread.findOne({_id: req.params.thread_id}).then((thread)=> {
        res.json(thread.posts);
    });
});
app.get("/api/threads/:thread_id/posts/:id", function(req,res){
    Thread.findOne({_id: req.params.thread_id}).then((thread)=> {
        for(let i = 0; i < thread.posts.length; i++){
            if(thread.posts[i]._id == req.params.id){
                res.json(thread.posts[i])
            }
        }
    });
});
app.post("/api/threads", function(req,res){
    Thread.create(req.body).then((thread)=>{
        res.json(thread);
    });
});
app.post("/api/post", function(req,res){
    Post.create(req.body).then((post)=>{
        res.json(post);
    });
});
app.delete("/api/threads/:title", function(req,res){
    Thread.findOneAndRemove({title: req.params.title}).then(()=>{
        res.json({success: true});
    });
});
app.delete("/api/post/:title", function(req,res){
    Thread.findOneAndRemove({title: req.params.title}).then(()=>{
        res.json({success: true});
});
});
app.put("/api/threads/:title", function(req,res){
    Thread.findOneAndUpdate({title: req.params.title}, req.body, {new: true}).then((thread)=>{
        res.json(thread);
    });
});
app.put("/api/post/:title", function(req,res){
    Thread.findOneAndUpdate({title: req.params.title}, req.body, {new: true}).then((post)=>{
        res.json(post);
    });
});
app.listen(8080, ()=> {
    console.log(['Listening on port 8080'])
})

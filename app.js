//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//First task: connectin mongoose
const mongoose = require('mongoose');
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Second task: connecting mongoose via localhost:hyper
mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});
//Third task: creating model in detail
const postSchema = {
    title: String,
    content: String
};
//Forth task: creating model via link "Post"
const Post = mongoose.model("Post", postSchema);

//Seventh task delete it in order to unlimit texts
//let posts = [];

app.get("/", function(req, res){
  //Eighth task: showing all created in "compose" posts in home page
    Post.find({}, function(err, posts){
     res.render("home", {
         startingContent: homeStartingContent,
         posts:posts
     });
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
    //Fifth task: get possibility(request) to post my writing creations
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });
//Sixth task: save highlighted script (Ninth task, delete it)
//  post.save();
//  res.redirect("/");
    
    
    //Ninth task: if I get error, I will be directed to home page
    post.save(function(err){
   if (!err){
     res.redirect("/");
   }
    });
});
//10.In home ejs I need to change anchor tag to this parameter<a href="/posts/<%=post._id%>">Read More</a>

//11. Change app get posts from postName to postId in order to link over ids.
app.get("/posts/:postId", function(req, res){
    //12.Delete previous request parameters and set new name object and params from postName to postId to read more information via id
  const requestedPostId = req.params.postId;
    //13. For getting found the post with the matching id in the posts collection, I need to use this function
Post.findOne({_id: requestedPostId}, function(err, post){ 
    //14. After that, I must concrete a function in getting ids using requestedPostId. This provides me a concrete information about topic in post.ejs page
   res.render("post", {
     title: post.title,
     content: post.content
   });
 });
});
    

 


 

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

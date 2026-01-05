const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const {v4:uuidv4} = require("uuid");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id : uuidv4(),
        username : "apnacollege",
        content : "i love coding"
    },
    {
        id : uuidv4(),
        username : "apnacollege2",
        content : "web developer"
    },
    {
        id : uuidv4(),
        username : "Sujal Sanjay Redekar",
        content : "Software Developer Engineer"
    }
];
app.listen(port,() => {
    console.log(`Server is listening on port number ${port}`);
});
//view posts
app.get("/posts",(req,res) =>{
    res.render("index.ejs",{posts});
});
//create new post
app.get("/posts/new",(req,res) => {
    res.render("new.ejs");
});

app.post("/posts",(req,res) => {
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({username,content,id});
    res.redirect("/posts");
});
//view post
app.get("/posts/:id",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
});
//update post
app.patch("/posts/:id",(req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});
//edit route
app.get("/posts/:id/edit",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});
app.delete("/posts/:id",(req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});
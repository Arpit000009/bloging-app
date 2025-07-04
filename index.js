const express = require("express");
const path = require("path");
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const Blog = require('./models/blog')


const userRouter = require('./routes/user');
const blogRoute = require('./routes/blog');

const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/blogify').then((e) =>console.log("mongodb Connected"))

app.set('view engine',"ejs")
app.set('views',path.resolve("./views"))

app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve('./public')))

app.get("/",async(req,res)=>{
    const allBlogs = await Blog.find({}).populate('createdBy')
    res.render("home",{
        user:req.user,
        blogs: allBlogs,
    });
});

app.use('/user',userRouter)
app.use('/blog',blogRoute)

app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`));
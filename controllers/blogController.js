// json sirf object data ko res krne ke liye baki send ka use hoga

const Blog = require('../models/blogModel');
const asyncHandler = require('express-async-handler');


const getBlog = asyncHandler(async (req,res)=>{
    // res.json({
    //     msg : "All blog !"
    // });

    const blogs = await Blog.find();  // find function jo hm use denge wo find krke layga data me se

    if(!blogs)
    {
        res.status(404)
        throw new Error('No Blog Found !')     // error show hone pr ye ayga
    }

    res.json(blogs).status(200)
});

const getSingleBlog = asyncHandler(async (req,res)=>{
    // res.json({
    //     msg : "single blog api !"
    // });

    const blog = await Blog.findById(req.params.id);   // req.params.id esliye kyuki udhar hmne id de rahkhi he
    if(!blog){
        res.status(404)
        throw new Error('Blog Not Found')
    }

    res.json(blog).status(200);
});

const addBlog = asyncHandler(async (req,res)=>{
    // res.send("Blog Created !");

    const { title,description,author,isPublished } = req.body;

    if(!title || !description || !isPublished || !author)
    {
        res.status(401)
        throw new Error('Please Fill All Details !')
    }

    console.log(req.file);

    // khud se condition laga skte he

    // if(!req.file.mimetype.includes("pdf"))
    // {
    //     throw new Error("Only PDF is Allowed");
    // }

    if(req.file.size < 3000)
    {
        throw new Error("File Size Too Large");
    }

    const blog = await Blog.create({
        title,
        description,
        author,
        isPublished,
        coverImage : req.file.path,
    })
    res.json(blog).status(201);

});

const removeBlog = asyncHandler(async (req,res)=>{
    // res.send("Blog Deleted !");
    await Blog.findByIdAndDelete(req.params.id);
    res.json({success : true});
});

const updateBlog = asyncHandler(async (req,res)=>{
    // res.send("Blog Updated !");
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
    });

    if(!updatedBlog){
        res.status(400);
        throw new Error("Blog Cannot Be Updated");
    }
    res.json(updatedBlog).status(200);
});

module.exports = {getBlog,getSingleBlog,addBlog,removeBlog,updateBlog};
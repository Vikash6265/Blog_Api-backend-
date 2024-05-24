const express = require('express');
const connectDB = require('./config/db_config');
require('dotenv').config();

const multer = require('multer');

const app = express();

const PORT = process.env.PORT || 5000;

// DB connection
connectDB();

// Body-Parser

app.use(express.json());
app.use(express.urlencoded({extended : true}))

// Default Route

app.get('/',(res,req) =>{
    res.json({msg:"welcome to blog api !"})
});

// // Single File Uploaded Code

// multer ka kam upload krne ka he
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename : (req,file,cb)=>{
        cb(null,'file'+ Date.now() + "-" +file.originalname)
    }
})

const uploads = multer({storage});

app.post('/uploads', uploads.single('file') , (req,res)=>{
    res.send("File Uploaded!");
})

// Blog route

app.use('/api/blog',require("./routes/blogRoutes"));

app.listen(PORT,()=>{
    console.log(`server is running at PORT : ${PORT}`);
});
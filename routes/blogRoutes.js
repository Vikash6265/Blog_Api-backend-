const express = require('express');
const { getBlog, getSingleBlog, addBlog, removeBlog, updateBlog } = require('../controllers/blogController');
const multer = require('multer');

const router = express.Router();

// Single File Uploaded Code

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'uploads')
    },
    filename : (req,file,cb)=>{
        cb(null,'file'+ Date.now() + "-" +file.originalname)
    }
})

const uploads = multer({storage});



// READ
router.get("/", getBlog);

// READ SINGLE
router.get("/:id", getSingleBlog);


// ADD , CREATE
router.post("/", uploads.single("file"),addBlog);


// REMOVE
router.delete("/:id", removeBlog);


// UPDATE
router.put("/:id", updateBlog);

module.exports = router;
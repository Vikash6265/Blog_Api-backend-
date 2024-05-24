const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    isPublished : {
        type : Boolean,
        required : true,
        default : false,
    },
    coverImage : {
        type : String,
        required : true,
    }
},
{
    timestamps : true
}
);

module.exports = mongoose.model("Blog",blogSchema);
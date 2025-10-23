const mongoose=require("mongoose")
const { type } = require("os")

const commentsSchema=mongoose.Schema({
    comment:{
        type:String
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts"
    }

})

const comments=mongoose.model("comments",commentsSchema)

const postSchema=mongoose.Schema({
    postname:{
        type:String
    },
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"comments"}]
})

const posts=mongoose.model("posts",postSchema)
module.exports={posts,comments}
const express = require("express");
const { postCreate, getAll } = require("../../controllers/posts/posts.controller");



const postRouter=express.Router()
postRouter.post("/create",postCreate)
postRouter.get("/getAll",getAll)

module.exports=postRouter
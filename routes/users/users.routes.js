const express=require("express")
const { userCreate, getAll } = require("../../controllers/users/users.controller")


const userRouter=express.Router()

userRouter.post("/create",userCreate)
userRouter.get('/getAll',getAll)

module.exports=userRouter
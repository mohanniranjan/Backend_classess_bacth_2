const mongoose=require("mongoose")
const { type } = require("os")

const empSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },image:{
        type:String,
    }

    
})
const employees=mongoose.model("employees",empSchema)

module.exports=employees

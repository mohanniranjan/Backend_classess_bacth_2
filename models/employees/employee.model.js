const mongoose=require("mongoose")

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
    }

    
})
const employees=mongoose.model("employees",empSchema)

module.exports=employees

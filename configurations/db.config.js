

const mongoose=require("mongoose")

const dbConfig=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected successfully")

    }catch(error){
        console.log("databse not conected :",error)

    }
}

module.exports=dbConfig
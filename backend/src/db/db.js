const mongoose=require("mongoose");


function connectDB(){
  mongoose.connect(process.env.MONGODB_URL)
  .then(()=>{
    console.log("database connected")
  }).catch((err)=>{
    console.log("Error connected to mongodb",err)
  })
}

module.exports=connectDB;
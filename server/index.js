const mongoose=require("mongoose");
require("dotenv").config();
const app=require('./app');


mongoose.connect(process.env.mongoDB).then(()=>{
    console.log("database connected");
    app.listen(3000,()=>{
        console.log("server is running on port 3000");
    })
    
    })
    .catch((err)=>{
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
})
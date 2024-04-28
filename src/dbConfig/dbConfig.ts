import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log("MongoDb connected!");
            
        })
        connection.on('close',(err)=>{
            console.log("MongoDb connection error.Please make sure db is up and runnig "+ err);
            process.exit()
            
        })
    }catch(error){
        console.log("Something went wromg while connecting to DB.");
        console.log(error);
    }
}